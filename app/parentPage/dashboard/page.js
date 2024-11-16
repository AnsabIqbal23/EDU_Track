'use client';

import { Bell, Calendar, User, GraduationCap, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ParentSidebar from "@/components/parent/sidebar";

const ParentDashboard = () => {
    const parent = {
        name: "Jane Doe",
        phone: "(123) 456-7890",
        ssn: "XXX-XX-1234",
        email: "jane.doe@example.com",
        address: "1234 Elm St, Any-town, USA",
        children: [
            {
                id: 1,
                name: "John Doe",
                academicPerformance: { gpa: 3.8, credits: { completed: 90, total: 120 } },
                attendance: { overall: 94, attended: 47, totalClasses: 50, lastAbsence: "Sep 28, 2023" },
                upcoming: [
                    { title: "Math Midterm", date: "Oct 15, 2023 - 10:00 AM" },
                    { title: "History Project", date: "Oct 20, 2023 - 11:59 PM" },
                ],
                recentGrades: [
                    { subject: "Math", assignment: "Quiz 3", grade: "A-" },
                    { subject: "English", assignment: "Essay 2", grade: "B+" },
                ],
            },
            {
                id: 3,
                name: "Jackson Doe",
                academicPerformance: { gpa: 3.8, credits: { completed: 90, total: 120 } },
                attendance: { overall: 94, attended: 47, totalClasses: 50, lastAbsence: "Sep 28, 2023" },
                upcoming: [
                    { title: "Math Midterm", date: "Oct 15, 2023 - 10:00 AM" },
                    { title: "History Project", date: "Oct 20, 2023 - 11:59 PM" },
                ],
                recentGrades: [
                    { subject: "Math", assignment: "Quiz 3", grade: "A-" },
                    { subject: "English", assignment: "Essay 2", grade: "B+" },
                ],
            },
            {
                id: 2,
                name: "Emily Doe",
                academicPerformance: { gpa: 3.9, credits: { completed: 70, total: 100 } },
                attendance: { overall: 96, attended: 48, totalClasses: 50, lastAbsence: "Oct 1, 2023" },
                upcoming: [
                    { title: "Science Fair", date: "Oct 25, 2023 - 8:00 AM" },
                    { title: "Art Submission", date: "Oct 22, 2023 - 5:00 PM" },
                ],
                recentGrades: [
                    { subject: "Science", assignment: "Lab Report", grade: "A" },
                    { subject: "Art", assignment: "Portfolio", grade: "A+" },
                ],
            },
        ],
    };

    return (
        <div className="h-screen w-full bg-black text-white grid grid-cols-[auto_1fr]">
            <ParentSidebar />
            <main className="container mx-auto p-6 h-full overflow-y-auto">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Welcome, {parent.name}</h1>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                        <Button variant="ghost" className="bg-blue-700 text-white px-3 py-1 rounded-md">
                            {parent.children.length} Children
                        </Button>
                    </div>
                </header>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Parent Info Card */}
                    <Card className="bg-[#1C2C4A] border-blue-500 col-span-1 md:col-span-2 lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="text-white">Parent Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-sm font-medium text-gray-200">Name: {parent.name}</p>
                                <p className="text-sm font-medium text-gray-200">Phone: {parent.phone}</p>
                                <p className="text-sm font-medium text-gray-200">SSN: {parent.ssn}</p>
                                <p className="text-sm font-medium text-gray-200">Email: {parent.email}</p>
                                <p className="text-sm font-medium text-gray-200">Address: {parent.address}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Child Info Cards */}
                    {parent.children.map((child) => (
                        <Card key={child.id} className="bg-[#1C2C4A] border-blue-500">
                            <CardHeader>
                                <CardTitle className="text-white">{child.name} Dashboard</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Academic Performance */}
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-200">GPA</p>
                                            <p className="text-sm text-gray-300">{child.academicPerformance.gpa} / 4.0</p>
                                        </div>
                                        <Progress value={(child.academicPerformance.gpa / 4) * 100} className="mt-2 bg-blue-600" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-200">Credits Completed</p>
                                            <p className="text-sm text-gray-300">{child.academicPerformance.credits.completed} / {child.academicPerformance.credits.total}</p>
                                        </div>
                                        <Progress value={(child.academicPerformance.credits.completed / child.academicPerformance.credits.total) * 100} className="mt-2 bg-blue-600" />
                                    </div>

                                    {/* Upcoming Events */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-200">Upcoming</p>
                                        {child.upcoming.map((event, index) => (
                                            <div key={index} className="flex items-center mt-1">
                                                <Calendar className="mr-2 h-4 w-4 text-blue-300" />
                                                <p className="text-sm text-gray-300">{event.title} - {event.date}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Grades */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-200">Recent Grades</p>
                                        {child.recentGrades.map((grade, index) => (
                                            <div key={index} className="flex items-center justify-between mt-1">
                                                <p className="text-sm text-gray-200">{grade.subject} - {grade.assignment}</p>
                                                <Badge variant="secondary" className="bg-blue-500 text-white">{grade.grade}</Badge>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Attendance */}
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-200">Attendance</p>
                                            <p className="text-sm text-gray-300">{child.attendance.overall}%</p>
                                        </div>
                                        <Progress value={child.attendance.overall} className="mt-2 bg-blue-600" />
                                        <p className="text-xs text-gray-300">Classes attended: {child.attendance.attended}/{child.attendance.totalClasses}</p>
                                        <p className="text-xs text-gray-300">Last absence: {child.attendance.lastAbsence}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ParentDashboard;
