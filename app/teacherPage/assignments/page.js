'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, FileUp, Upload } from 'lucide-react';
import TeacherSidebar from "@/components/teacher/sidebar";

export default function Assignments() {
    const [assignmentFile, setAssignmentFile] = useState(null);
    const [deadline, setDeadline] = useState('');
    const [submissions, setSubmissions] = useState({
        // Mock data format; replace with backend data fetch
        "Course 1": {
            "Section A": [
                { studentName: "John Doe", file: "assignment1.pdf" },
                { studentName: "Jane Doe", file: "assignment2.pdf" },
            ],
            "Section B": [
                { studentName: "Alice Smith", file: "assignment3.pdf" },
            ]
        },
        "Course 2": {
            "Section C": [
                { studentName: "Bob Johnson", file: "assignment4.pdf" }
            ]
        }
    });

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setAssignmentFile(file);
        }
    };

    const handleAssignmentSubmit = () => {
        if (assignmentFile && deadline) {
            // Implement backend call here to save the assignment details
            console.log("Assignment uploaded:", assignmentFile.name);
            console.log("Deadline set for:", deadline);
            alert("Assignment uploaded successfully.");
            setAssignmentFile(null);
            setDeadline('');
        } else {
            alert("Please upload a file and set a deadline.");
        }
    };

    return (
        <div className="h-screen w-full bg-[#121212] text-gray-200 grid grid-cols-[auto_1fr]">
            <TeacherSidebar />
            <div className="p-6 bg-gray-950">
                <Card className="bg-gray-800/75 border-gray-700 shadow-lg rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-white text-center text-2xl">Assignments</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        {/* Assignment Upload Section */}
                        <div className="mb-6">
                            <h2 className="text-lg text-gray-300 font-semibold">Upload Assignment</h2>
                            <div className="flex items-center space-x-4 mt-2">
                                <Label htmlFor="file-upload" className="cursor-pointer bg-purple-600 hover:bg-purple-700 inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md">
                                    <FileUp className="-ml-1 mr-2 h-5 w-5" />
                                    Choose File
                                </Label>
                                <Input
                                    id="file-upload"
                                    type="file"
                                    className="sr-only"
                                    accept=".pdf"
                                    onChange={handleFileUpload}
                                />
                                <span className="text-gray-400">{assignmentFile ? assignmentFile.name : "No file chosen"}</span>
                            </div>
                            <div className="flex items-center space-x-4 mt-4">
                                <Label htmlFor="deadline" className="text-gray-300 font-medium">Set Deadline:</Label>
                                <Input
                                    id="deadline"
                                    type="datetime-local"
                                    className="bg-gray-700 text-white border border-gray-600 rounded-md"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleAssignmentSubmit}
                                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md"
                            >
                                Submit Assignment
                            </button>
                        </div>

                        {/* Submissions Section */}
                        <div className="mt-8">
                            <h2 className="text-lg text-gray-300 font-semibold">Student Submissions</h2>
                            {Object.entries(submissions).map(([course, sections]) => (
                                <div key={course} className="mt-4 bg-gray-800 rounded-lg shadow p-4">
                                    <h3 className="text-lg font-bold text-gray-200">{course}</h3>
                                    {Object.entries(sections).map(([section, students]) => (
                                        <div key={section} className="mt-4 bg-gray-700 rounded-lg shadow p-3">
                                            <h4 className="text-md font-semibold text-gray-300">{section}</h4>
                                            <ul className="mt-2 space-y-2">
                                                {students.map((submission, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center justify-between bg-gray-800 p-2 rounded-md"
                                                    >
                                                        <span className="text-gray-200">{submission.studentName}</span>
                                                        <a
                                                            href={`/path/to/submissions/${submission.file}`} // Replace with the correct file path
                                                            download
                                                            className="text-purple-400 hover:underline"
                                                        >
                                                            Download
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
