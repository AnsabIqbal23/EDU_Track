'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ParentSidebar from "@/components/parent/sidebar"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

// Mock data for children and their courses
const childrenData = {
    "Alice": [
        { id: 'CS101', name: 'Introduction to Computer Science', teacher: 'Dr. Smith', credits: 3 },
        { id: 'MATH201', name: 'Linear Algebra', teacher: 'Dr. Jones', credits: 4 },
    ],
    "Bob": [
        { id: 'PHYS301', name: 'Quantum Mechanics', teacher: 'Dr. Brown', credits: 4 },
        { id: 'ENG102', name: 'Academic Writing', teacher: 'Prof. Johnson', credits: 3 },
    ],
}

export default function ParentCoursesView() {
    const [selectedChild, setSelectedChild] = useState("Alice")
    const courses = childrenData[selectedChild] || []

    return (
        <div className="min-h-screen bg-[#121212] text-white grid grid-cols-[auto_1fr]">
            {/* Sidebar */}
            <div className="bg-[#1C2C4A] h-screen sticky top-0">
                <ParentSidebar />
            </div>
            <main className="container mx-auto p-6 h-full">
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-gray-100">View Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <Select value={selectedChild} onValueChange={setSelectedChild}>
                                <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white">
                                    <SelectValue placeholder="Select a child" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(childrenData).map((child) => (
                                        <SelectItem key={child} value={child} className="text-gray-200">
                                            {child}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-100">Courses for {selectedChild}</h3>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            {courses.map((course) => (
                                <Card key={course.id} className="bg-gray-700 border-gray-600">
                                    <CardContent className="p-4">
                                        <h4 className="font-semibold text-gray-100">{course.name}</h4>
                                        <div className="flex justify-between items-center mt-2">
                                            <Badge variant="secondary">{course.id}</Badge>
                                            <span className="text-sm text-gray-400">{course.credits} credits</span>
                                        </div>
                                        <div className="text-sm text-gray-300 mt-1">Instructor: {course.teacher}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
