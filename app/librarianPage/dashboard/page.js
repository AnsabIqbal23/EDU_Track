'use client';

import { useEffect, useState } from 'react';
import { Book, UserCheck, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import LibrarianSidebar from "@/components/librarian/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LibrarianDashboard = () => {
    const [librarianInfo, setLibrarianInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLibrarianInfo = async () => {
            try {
                const userData = sessionStorage.getItem('userData');

                if (!userData) {
                    setError("No userData found in session storage");
                    return;
                }

                const parsedData = JSON.parse(userData);
                const token = parsedData.accessToken;

                if (!token) {
                    setError("No token found in userData");
                    return;
                }

                const response = await fetch("http://localhost:8081/api/auth/getlibrarianinfo", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setLibrarianInfo(data);
                } else {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch librarian info: ${errorText}`);
                }
            } catch (error) {
                console.error("Error fetching librarian info:", error);
                setError("Failed to fetch librarian information. Please try again later.");
            }
        };

        fetchLibrarianInfo();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!librarianInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="grid grid-cols-[auto_1fr]">
                <LibrarianSidebar />
                <main className="p-8">
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">Welcome back, {librarianInfo.username}!</h1>
                            <p className="text-gray-400"> Here is what’s happening in your library today.</p>
                        </div>
                    </header>

                    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-8">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-6">
                                <Avatar className="h-24 w-24 border-2 border-purple-500">
                                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt={librarianInfo.username} />
                                    <AvatarFallback className="text-2xl bg-purple-600">
                                        {librarianInfo.username[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-1">{librarianInfo.username}</h2>
                                            <p className="text-purple-400">Librarian</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-8">
                                        {[
                                            { label: 'Email', value: librarianInfo.email, icon: '@' },
                                            { label: 'Employee ID', value: librarianInfo.employeeId, icon: '🆔' },
                                            { label: 'Library Section', value: librarianInfo.librarySection, icon: '📚' },
                                        ].map((item, index) => (
                                            <div key={index} className="space-y-1">
                                                <p className="text-sm text-gray-400 flex items-center gap-2">
                                                    <span>{item.icon}</span>
                                                    {item.label}
                                                </p>
                                                <p className="text-gray-100">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Total Books",
                                value: "5,320",
                                icon: Book,
                                color: "bg-purple-600",
                                increase: "+1% from last month"
                            },
                            {
                                title: "Books Issued Today",
                                value: "120",
                                icon: UserCheck,
                                color: "bg-green-600",
                                increase: "+8% from yesterday"
                            },
                            {
                                title: "Overdue Books",
                                value: "45",
                                icon: AlertCircle,
                                color: "bg-red-600",
                                increase: "15 overdue this week"
                            }
                        ].map((item, index) => (
                            <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-white font-medium">{item.title}</CardTitle>
                                    <item.icon className={`h-5 w-5 ${item.color} rounded p-1 text-white`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-2xl font-bold text-white">{item.value}</p>
                                        <p className="text-sm text-gray-400">{item.increase}</p>
                                        <Progress value={75} className={`h-1 ${item.color}`} />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default LibrarianDashboard;
