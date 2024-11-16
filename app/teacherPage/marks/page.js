'use client';

import { useState } from "react";
import TeacherSidebar from "@/components/teacher/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const initialStudents = [
    { id: 1, name: "Alice Brown", marks: "" },
    { id: 2, name: "Bob Smith", marks: "" },
    { id: 3, name: "Charlie Johnson", marks: "" }
];

const TeacherMarks = () => {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [evaluationType, setEvaluationType] = useState("");
    const [students, setStudents] = useState(initialStudents);

    const handleMarksChange = (studentId, marks) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === studentId ? { ...student, marks } : student
            )
        );
    };

    const submitMarks = () => {
        const marksData = {
            course: selectedCourse,
            section: selectedSection,
            evaluationType,
            students: students.map(({ id, marks }) => ({ id, marks })),
        };

        // Example: Replace with actual backend submission logic
        console.log("Submitting marks to backend:", marksData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="grid grid-cols-[auto_1fr]">
                <TeacherSidebar />
                <main className="p-8">
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white">Marks Entry</h1>
                    </header>

                    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-8 p-6">
                        <div className="grid grid-cols-3 gap-4">
                            <Select onValueChange={setSelectedCourse}>
                                <SelectTrigger className="bg-gray-700/75 text-white">
                                    <SelectValue placeholder="Select Course" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-900/80 text-white">
                                    <SelectItem value="Math 101">Math 101</SelectItem>
                                    <SelectItem value="Science 202">Science 202</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={setSelectedSection}>
                                <SelectTrigger className="bg-gray-700/75 text-white">
                                    <SelectValue placeholder="Select Section" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-900/80 text-white">
                                    <SelectItem value="A">A</SelectItem>
                                    <SelectItem value="B">B</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={setEvaluationType}>
                                <SelectTrigger className="bg-gray-700/75 text-white">
                                    <SelectValue placeholder="Evaluation Type" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-900/80 text-white">
                                    <SelectItem value="Assignment">Assignment</SelectItem>
                                    <SelectItem value="Quiz">Quiz</SelectItem>
                                    <SelectItem value="Midterm">Midterm</SelectItem>
                                    <SelectItem value="Final">Final</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </Card>

                    <div className="space-y-4">
                        {students.map(student => (
                            <Card key={student.id} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-10 w-10 bg-blue-500">
                                        <AvatarFallback>{student.name.split(" ").map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-white font-medium">{student.name}</p>
                                </div>
                                <Input
                                    type="number"
                                    placeholder="Enter marks"
                                    value={student.marks}
                                    onChange={e => handleMarksChange(student.id, e.target.value)}
                                    className="w-24 bg-gray-700 text-white border-gray-600"
                                />
                            </Card>
                        ))}
                    </div>

                    <Button
                        onClick={submitMarks}
                        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Confirm and Submit Marks
                    </Button>
                </main>
            </div>
        </div>
    );
};

export default TeacherMarks;
