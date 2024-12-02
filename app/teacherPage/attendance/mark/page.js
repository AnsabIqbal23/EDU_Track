'use client';

import { useState } from "react";
import TeacherSidebar from "@/components/teacher/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const initialStudents = [
    { id: 1, name: "Alice Brown", attendanceStatus: "Not Marked", lateCount: 0 },
    { id: 2, name: "Bob Smith", attendanceStatus: "Not Marked", lateCount: 0 },
    { id: 3, name: "Charlie Johnson", attendanceStatus: "Not Marked", lateCount: 0 }
];

const TeacherAttendance = () => {
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [students, setStudents] = useState(initialStudents);
    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const currentDate = new Date().toLocaleDateString();

    const handleAttendance = (studentId, action) => {
        setStudents(prevStudents => {
            let newPresentCount = presentCount;
            let newAbsentCount = absentCount;

            const updatedStudents = prevStudents.map(student => {
                if (student.id === studentId) {
                    if (action === "Present" && student.attendanceStatus !== "Present") {
                        student.attendanceStatus = "Present";
                        newPresentCount += 1;
                        if (student.attendanceStatus === "Absent") newAbsentCount -= 1;
                    } else if (action === "Absent" && student.attendanceStatus !== "Absent") {
                        student.attendanceStatus = "Absent";
                        newAbsentCount += 1;
                        if (student.attendanceStatus === "Present") newPresentCount -= 1;
                    } else if (action === "Late") {
                        student.lateCount += 1;
                        if (student.lateCount === 3) {
                            student.attendanceStatus = "Absent";
                            student.lateCount = 0;
                            newAbsentCount += 1;
                        } else {
                            student.attendanceStatus = "Late";
                        }
                    }
                }
                return student;
            });

            setPresentCount(newPresentCount);
            setAbsentCount(newAbsentCount);
            return updatedStudents;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="grid grid-cols-[auto_1fr]">
                <TeacherSidebar />
                <main className="p-8">
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white">Attendance - {currentDate}</h1>
                    </header>

                    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-8 p-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Select onValueChange={setSelectedClass}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-700 shadow-lg rounded-md">
                                    <SelectItem value="Math 101">Math 101</SelectItem>
                                    <SelectItem value="Science 202">Science 202</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select onValueChange={setSelectedSection}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Section" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-700 shadow-lg rounded-md">
                                    <SelectItem value="A">A</SelectItem>
                                    <SelectItem value="B">B</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex justify-between mt-8 text-white">
                            <p>Total Students: {students.length}</p>
                            <p>Present: {presentCount} | Absent: {absentCount}</p>
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
                                    <p className="text-gray-400 text-sm">({student.attendanceStatus})</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => handleAttendance(student.id, "Present")} className="bg-green-600 hover:bg-green-700">Present</Button>
                                    <Button onClick={() => handleAttendance(student.id, "Absent")} className="bg-red-600 hover:bg-red-700">Absent</Button>
                                    <Button onClick={() => handleAttendance(student.id, "Late")} className="bg-yellow-600 hover:bg-yellow-700">Late</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default TeacherAttendance;
