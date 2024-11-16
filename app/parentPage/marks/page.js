'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ParentSidebar from "@/components/parent/sidebar";

// Mock data - replace with actual data fetching logic
const childrenData = {
    'John Doe': {
        courses: [
            {
                id: "COMP101",
                name: "Introduction to Programming",
                marks: {
                    quiz: 85,
                    midterm: 78,
                    assignment: 92,
                    final: 88
                }
            },
            {
                id: "MATH201",
                name: "Linear Algebra",
                marks: {
                    quiz: 92,
                    midterm: 85,
                    assignment: 88,
                    final: 90
                }
            }
        ]
    },
    'Emily Doe': {
        courses: [
            {
                id: "PHYS301",
                name: "Quantum Mechanics",
                marks: {
                    quiz: 75,
                    midterm: 82,
                    assignment: 79,
                    final: 85
                }
            },
            {
                id: "BIO101",
                name: "Biology",
                marks: {
                    quiz: 88,
                    midterm: 80,
                    assignment: 85,
                    final: 90
                }
            }
        ]
    }
};

const ParentMarks = () => {
    const [selectedChild, setSelectedChild] = useState('John Doe');
    const [selectedCourse, setSelectedCourse] = useState(childrenData[selectedChild].courses[0].id);

    return (
        <div className="min-h-screen bg-[#121212] text-white grid grid-cols-[auto_1fr]">
            {/* Sidebar */}
            <div className="bg-[#1C2C4A] h-screen sticky top-0">
                <ParentSidebar />
            </div>

            {/* Main Content */}
            <div className="flex flex-col w-full overflow-y-auto">
                <nav className="bg-[#1C2C4A] text-white p-4 flex justify-between items-center">
                    <h2 className="text-lg">Marks - {selectedChild}</h2>
                </nav>

                <main className="p-6 space-y-6">
                    {/* Child Select */}
                    <Card className="bg-[#1C2C4A] border-blue-500">
                        <CardHeader>
                            <CardTitle className="text-white">Select Child</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Select onValueChange={(child) => {
                                setSelectedChild(child);
                                setSelectedCourse(childrenData[child].courses[0].id);  // Reset course to the first one
                            }} defaultValue={selectedChild}>
                                <SelectTrigger className="w-full text-white bg-[#1E2A3A] border-blue-500">
                                    <SelectValue placeholder={selectedChild} />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1E2A3A]">
                                    {Object.keys(childrenData).map((child) => (
                                        <SelectItem key={child} value={child}>{child}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    {/* Course Select */}
                    <Card className="bg-[#1C2C4A] border-blue-500">
                        <CardHeader>
                            <CardTitle className="text-white">Select Course</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Select onValueChange={setSelectedCourse} defaultValue={selectedCourse}>
                                <SelectTrigger className="w-full text-white bg-[#1E2A3A] border-blue-500">
                                    <SelectValue placeholder="Select a course" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1E2A3A]">
                                    {childrenData[selectedChild].courses.map((course) => (
                                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    {/* Marks Table */}
                    {childrenData[selectedChild].courses.map((course) => (
                        course.id === selectedCourse && (
                            <Card key={course.id} className="bg-[#1E2C4A] border-blue-500">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-white">{course.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        {Object.entries(course.marks).map(([type, mark]) => (
                                            <AccordionItem key={type} value={type} className="border-blue-500">
                                                <AccordionTrigger className="text-white hover:text-gray-300">
                                                    {type.charAt(0).toUpperCase() + type.slice(1)} Marks
                                                </AccordionTrigger>
                                                <AccordionContent className="text-gray-300">
                                                    Your {type} mark is: {mark}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </CardContent>
                            </Card>
                        )
                    ))}
                </main>
            </div>
        </div>
    );
}

export default ParentMarks;
