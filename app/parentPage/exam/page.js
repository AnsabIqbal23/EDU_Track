'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import ParentSidebar from "@/components/parent/sidebar";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

// Example fetch function (replace with your API endpoint)
const fetchExamData = async (childName) => {
    // Simulate fetching data based on the selected child
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = {
                'Alice': {
                    'Upcoming': [
                        { course: 'DB BCS-5J', date: '2023-12-15', time: '09:00 AM', duration: '3 hours', venue: 'Hall A' },
                        { course: 'DAA BCS-5J', date: '2023-12-18', time: '02:00 PM', duration: '2.5 hours', venue: 'Hall B' },
                    ],
                    'Past': [
                        { course: 'GT BCS-5J', date: '2023-12-01', time: '11:00 AM', duration: '2 hours', venue: 'Hall D' },
                    ],
                },
                'Bob': {
                    'Upcoming': [
                        { course: 'PDC BCS-5J', date: '2023-12-20', time: '10:00 AM', duration: '3 hours', venue: 'Hall C' },
                    ],
                    'Past': [
                        { course: 'SDA BCS-5J', date: '2023-12-05', time: '03:00 PM', duration: '2.5 hours', venue: 'Hall A' },
                    ],
                },
            };
            resolve(data[childName] || { Upcoming: [], Past: [] });
        }, 1000); // Simulate network delay
    });
};

export default function ExamSchedule() {
    const [activeTab, setActiveTab] = useState('Upcoming');
    const [selectedChild, setSelectedChild] = useState('Alice');
    const [examData, setExamData] = useState({ Upcoming: [], Past: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getExamData = async () => {
            setLoading(true);
            try {
                const data = await fetchExamData(selectedChild);
                setExamData(data);
            } catch (err) {
                setError('Failed to load exam data.');
            } finally {
                setLoading(false);
            }
        };

        getExamData();
    }, [selectedChild]);

    return (
        <div className="min-h-screen bg-[#121212] text-white grid grid-cols-[auto_1fr]">
            {/* Sidebar */}
            <div className="bg-[#1C2C4A] h-screen sticky top-0">
                <ParentSidebar/>
            </div>
            <div className="p-6 bg-black">
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-white">Exam Schedule</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Child selection dropdown */}
                        <div className="mb-4">
                            <Select value={selectedChild} onValueChange={setSelectedChild}>
                                <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white">
                                    <SelectValue placeholder="Select a child" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Alice">Alice</SelectItem>
                                    <SelectItem value="Bob">Bob</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {loading ? (
                            <p className="text-center text-gray-400">Loading exams...</p>
                        ) : error ? (
                            <p className="text-center text-red-500">{error}</p>
                        ) : (
                            <Tabs defaultValue="Upcoming" onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 bg-gray-800 mb-4">
                                    {Object.keys(examData).map((tab) => (
                                        <TabsTrigger
                                            key={tab}
                                            value={tab}
                                            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-400 py-2">
                                            {tab}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                {Object.entries(examData).map(([tab, exams]) => (
                                    <TabsContent key={tab} value={tab} className="mt-0">
                                        {exams.length ? (
                                            <div className="space-y-4">
                                                {exams.map((exam, index) => (
                                                    <div key={index}
                                                         className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
                                                        {/* Left part - Course and Date */}
                                                        <div className="flex-grow">
                                                            <div className="font-bold text-white text-lg">{exam.course}</div>
                                                            <div className="text-gray-300">{exam.date}</div>
                                                        </div>

                                                        {/* Right part - Time, Duration, and Venue */}
                                                        <div className="flex flex-col text-right space-y-2">
                                                            <div className="flex items-center justify-end">
                                                                <Clock className="mr-2 h-4 w-4 text-gray-400"/>
                                                                <span>{exam.time}</span>
                                                            </div>
                                                            <div className="flex items-center justify-end">
                                                                <CalendarDays className="mr-2 h-4 w-4 text-gray-400"/>
                                                                <span>{exam.duration}</span>
                                                            </div>
                                                            <div className="flex items-center justify-end">
                                                                <MapPin className="mr-2 h-4 w-4 text-gray-400"/>
                                                                <span>{exam.venue}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-center text-gray-400">No exams for {tab}.</p>
                                        )}
                                    </TabsContent>
                                ))}
                            </Tabs>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
