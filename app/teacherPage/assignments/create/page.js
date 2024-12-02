'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import TeacherSidebar from '@/components/teacher/sidebar';
import {
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
} from "@/components/ui/toast";

export default function TeacherGradingPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.target);
        const data = {
            assignmentId: formData.get('assignmentId'),
            marks: formData.get('marks'),
            feedback: formData.get('feedback'),
        };

        const getToken = () => {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            return userData?.accessToken || '';
        };

        try {
            const token = getToken();
            const response = await fetch(
                `http://localhost:8081/api/assignments/grade?assignmentId=${data.assignmentId}&marks=${data.marks}&feedback=${data.feedback}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                setToast({ show: true, message: "Assignment graded and student notified.", type: 'success' });
            } else {
                setToast({ show: true, message: "Failed to grade assignment. Please try again.", type: 'error' });
            }
        } catch (error) {
            setToast({ show: true, message: "An error occurred. Please try again.", type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <ToastProvider>
            <div className="min-h-screen bg-[#1a1f2e]">
                <div className="grid grid-cols-[auto_1fr]">
                    <TeacherSidebar />
                    <main className="p-8">
                        <div className="max-w-6xl mx-auto space-y-8">
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold">Grade Student's Assignments</h1>
                            </div>

                            <Card className="bg-[#1E2530] border-0 p-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="assignmentId" className="text-gray-400">Assignment ID</Label>
                                        <Input
                                            id="assignmentId"
                                            name="assignmentId"
                                            placeholder="Enter Assignment ID"
                                            required
                                            className="bg-[#1B2028] border-gray-700 text-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="marks" className="text-gray-400">Marks</Label>
                                        <Input
                                            id="marks"
                                            name="marks"
                                            type="number"
                                            placeholder="Enter marks (0-100)"
                                            min="0"
                                            max="100"
                                            required
                                            className="bg-[#1B2028] border-gray-700 text-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="feedback" className="text-gray-400">Feedback</Label>
                                        <Textarea
                                            id="feedback"
                                            name="feedback"
                                            placeholder="Enter feedback for the student"
                                            required
                                            className="bg-[#1B2028] border-gray-700 text-white min-h-[100px]"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Grade'}
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    </main>
                </div>

                {toast.show && (
                    <Toast
                        variant={toast.type === 'error' ? 'destructive' : 'default'}
                        className={`${
                            toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                        }`}
                        onOpenChange={(open) => !open && setToast({ ...toast, show: false })}
                    >
                        <ToastTitle>{toast.type === 'error' ? 'Error' : 'Success'}</ToastTitle>
                        <ToastDescription>{toast.message}</ToastDescription>
                        <ToastClose />
                    </Toast>
                )}
                <ToastViewport />
            </div>
        </ToastProvider>
    );
}
