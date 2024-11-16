'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminSidebar from "@/components/admin/sidebar"; // Import your Sidebar component

const fetchFeeSubmissions = async () => {
    // Mocked data for demonstration, replace with an actual API call in production
    return [
        { id: '1', studentEmail: 'student1@example.com', imageUrl: 'https://example.com/fee1.png', status: 'pending' },
        { id: '2', studentEmail: 'student2@example.com', imageUrl: 'https://example.com/fee2.png', status: 'pending' },
        { id: '3', studentEmail: 'student3@example.com', imageUrl: 'https://example.com/fee3.png', status: 'approved' },
    ];
};

export default function FeesApprovalComponent() {
    const [submissions, setSubmissions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const loadSubmissions = async () => {
            const data = await fetchFeeSubmissions();
            setSubmissions(data);
        };
        loadSubmissions();
    }, []);

    const handleApprove = async (id) => {
        setSubmissions(submissions.map(sub =>
            sub.id === id ? { ...sub, status: 'approved' } : sub
        ));
    };

    const handleReject = async (id) => {
        setSubmissions(submissions.map(sub =>
            sub.id === id ? { ...sub, status: 'rejected' } : sub
        ));
    };

    const currentSubmission = submissions[currentIndex];
    const goToPrevious = () => setCurrentIndex(prev => (prev > 0 ? prev - 1 : submissions.length - 1));
    const goToNext = () => setCurrentIndex(prev => (prev < submissions.length - 1 ? prev + 1 : 0));

    // Calculate statistics
    const stats = {
        total: submissions.length,
        pending: submissions.filter(sub => sub.status === 'pending').length,
        approved: submissions.filter(sub => sub.status === 'approved').length,
        rejected: submissions.filter(sub => sub.status === 'rejected').length,
    };

    if (submissions.length === 0) {
        return (
            <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                    <p className="text-center text-gray-400">No pending fee submissions</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 grid grid-cols-[auto_1fr]">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="p-8">
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Total Submissions', value: stats.total, color: 'bg-blue-600' },
                        { label: 'Pending', value: stats.pending, color: 'bg-yellow-600' },
                        { label: 'Approved', value: stats.approved, color: 'bg-green-600' },
                        { label: 'Rejected', value: stats.rejected, color: 'bg-red-600' },
                    ].map((stat, index) => (
                        <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-400">{stat.label}</p>
                                    <Badge className={`${stat.color} text-white`}>{stat.value}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center text-gray-100">Fee Submission Approval</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Button variant="outline" onClick={goToPrevious} aria-label="Previous submission">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-gray-400">
                                {currentIndex + 1} of {submissions.length}
                            </span>
                            <Button variant="outline" onClick={goToNext} aria-label="Next submission">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="aspect-w-16 aspect-h-9 bg-gray-700 rounded-lg overflow-hidden">
                            <img
                                src={currentSubmission.imageUrl}
                                alt={`Fee submission from ${currentSubmission.studentEmail}`}
                                className="object-contain w-full h-full"
                            />
                        </div>
                        <div className="text-center">
                            <p className="text-gray-200">Student Email: {currentSubmission.studentEmail}</p>
                            <p className="text-gray-400">Status: {currentSubmission.status}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center space-x-4">
                        <Button
                            onClick={() => handleApprove(currentSubmission.id)}
                            disabled={currentSubmission.status !== 'pending'}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <Check className="mr-2 h-4 w-4" /> Approve
                        </Button>
                        <Button
                            onClick={() => handleReject(currentSubmission.id)}
                            disabled={currentSubmission.status !== 'pending'}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            <X className="mr-2 h-4 w-4" /> Reject
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
