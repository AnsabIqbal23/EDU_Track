'use client';

import { useState } from 'react';
import { UserPlus, Mail, Tag, Clock, Calendar, GraduationCap, BookOpen } from "lucide-react";
import AdminSidebar from "@/components/admin/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function StaffUpdateForm({ initialData }) {
    const [staffData, setStaffData] = useState(initialData || {
        username: '',
        email: '',
        department: '',
        officeHours: '',
        qualification: '',
        specialization: '',
        dateOfHire: '',
        role: 'teacher', // Default role
        librarySection: '',
        shiftHours: '',
    });

    const [message, setMessage] = useState(""); // State for the success message

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStaffData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name) => (value) => {
        setStaffData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting staff data:', staffData);

        // Here you would typically send the data to your backend
        // Simulating successful submission
        setMessage("Staff information updated successfully!");

        // Clear message after a few seconds
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="grid grid-cols-[auto_1fr]">
                <AdminSidebar />
                <main className="p-8">
                    <div className="max-w-2xl mx-auto">
                        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white">Update Staff Information</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Modify details for teachers and librarians
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                {message && (
                                    <div className="mb-4 text-green-500 text-center">
                                        {message}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Role Selection */}
                                    <div className="flex flex-col space-y-2">
                                        <Label className="text-gray-200">Role</Label>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="teacher"
                                                    name="role"
                                                    value="teacher"
                                                    checked={staffData.role === 'teacher'}
                                                    onChange={handleInputChange}
                                                    className="mr-2"
                                                />
                                                <Label htmlFor="teacher" className="text-gray-200">Teacher</Label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="librarian"
                                                    name="role"
                                                    value="librarian"
                                                    checked={staffData.role === 'librarian'}
                                                    onChange={handleInputChange}
                                                    className="mr-2"
                                                />
                                                <Label htmlFor="librarian" className="text-gray-200">Librarian</Label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="username" className="text-gray-200 flex items-center gap-2">
                                            <UserPlus className="h-4 w-4 text-gray-400" />
                                            Username
                                        </Label>
                                        <Input
                                            id="username"
                                            name="username"
                                            value={staffData.username}
                                            onChange={handleInputChange}
                                            className="bg-gray-700/50 text-gray-100 border-gray-600"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-gray-200 flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={staffData.email}
                                            onChange={handleInputChange}
                                            className="bg-gray-700/50 text-gray-100 border-gray-600"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department" className="text-gray-200 flex items-center gap-2">
                                            <Tag className="h-4 w-4 text-gray-400" />
                                            Department
                                        </Label>
                                        <Input
                                            id="department"
                                            name="department"
                                            value={staffData.department}
                                            onChange={handleInputChange}
                                            className="bg-gray-700/50 text-gray-100 border-gray-600"
                                        />
                                    </div>
                                    {staffData.role === 'teacher' ? (
                                        <>
                                            <div className="space-y-2">
                                                <Label htmlFor="officeHours" className="text-gray-200 flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                    Office Hours
                                                </Label>
                                                <Input
                                                    id="officeHours"
                                                    name="officeHours"
                                                    value={staffData.officeHours}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-700/50 text-gray-100 border-gray-600"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="qualification" className="text-gray-200 flex items-center gap-2">
                                                    <GraduationCap className="h-4 w-4 text-gray-400" />
                                                    Qualification
                                                </Label>
                                                <Select
                                                    value={staffData.qualification}
                                                    onValueChange={handleSelectChange('qualification')}
                                                >
                                                    <SelectTrigger className="bg-gray-700/50 text-gray-100 border-gray-600">
                                                        <SelectValue placeholder="Select qualification" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-800 border-gray-700">
                                                        <SelectItem value="graduate">Graduate</SelectItem>
                                                        <SelectItem value="post-graduate">Post Graduate</SelectItem>
                                                        <SelectItem value="phd">PhD</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="specialization" className="text-gray-200 flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-gray-400" />
                                                    Specialization
                                                </Label>
                                                <Input
                                                    id="specialization"
                                                    name="specialization"
                                                    value={staffData.specialization}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-700/50 text-gray-100 border-gray-600"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="space-y-2">
                                                <Label htmlFor="librarySection" className="text-gray-200 flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-gray-400" />
                                                    Library Section
                                                </Label>
                                                <Input
                                                    id="librarySection"
                                                    name="librarySection"
                                                    value={staffData.librarySection}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-700/50 text-gray-100 border-gray-600"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="shiftHours" className="text-gray-200 flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                    Shift Hours
                                                </Label>
                                                <Input
                                                    id="shiftHours"
                                                    name="shiftHours"
                                                    value={staffData.shiftHours}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-700/50 text-gray-100 border-gray-600"
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div className="space-y-2">
                                        <Label htmlFor="dateOfHire" className="text-gray-200 flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            Date of Hire
                                        </Label>
                                        <Input
                                            id="dateOfHire"
                                            name="dateOfHire"
                                            type="date"
                                            value={staffData.dateOfHire}
                                            onChange={handleInputChange}
                                            className="bg-gray-700/50 text-gray-100 border-gray-600"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Update Staff</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
