'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Upload, FileUp, RefreshCcw } from 'lucide-react';
import * as ExcelJS from 'exceljs';
import ParentSidebar from "@/components/parent/sidebar";

// Sample data for multiple children with different timetable information
const childrenData = {
    child1: {
        name: "Ali Yahya Amer",
        timetable: null, // Placeholder for timetable data for child1
    },
    child2: {
        name: "Fatima Amer",
        timetable: null, // Placeholder for timetable data for child2
    }
};

// Function to process the Excel file
const processExcelFile = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const arrayBuffer = e.target.result;
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(arrayBuffer);

            const worksheet = workbook.worksheets[0];
            const formattedData = {};

            worksheet.eachRow((row, rowIndex) => {
                if (rowIndex === 1) return;

                const day = row.getCell(1).value?.toUpperCase();
                if (!day) return;

                const classData = {
                    code: row.getCell(2).value,
                    name: row.getCell(3).value,
                    instructor: row.getCell(4).value,
                    startTime: row.getCell(5).value,
                    endTime: row.getCell(6).value,
                };

                if (!formattedData[day]) formattedData[day] = [];
                formattedData[day].push(classData);
            });

            resolve(formattedData);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
};

export default function Timetable() {
    const [activeDay, setActiveDay] = useState('MONDAY');
    const [selectedChild, setSelectedChild] = useState('child1');
    const [timetableData, setTimetableData] = useState(childrenData[selectedChild].timetable);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState(null);

    // Load saved timetable for the selected child from local storage if it exists
    useEffect(() => {
        const savedTimetable = localStorage.getItem(`timetableData_${selectedChild}`);
        if (savedTimetable) {
            const parsedData = JSON.parse(savedTimetable);
            childrenData[selectedChild].timetable = parsedData;
            setTimetableData(parsedData);
            setUploadedFileName('Previously uploaded file');
        }
    }, [selectedChild]);

    // Handle file upload for the selected child
    const handleFileUpload = async (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsUploading(true);
            try {
                const data = await processExcelFile(file);
                childrenData[selectedChild].timetable = data;
                setTimetableData(data);
                setUploadedFileName(file.name);
                localStorage.setItem(`timetableData_${selectedChild}`, JSON.stringify(data));
            } catch (error) {
                console.error('Error processing file:', error);
                alert('Error processing file. Please try again.');
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white grid grid-cols-[auto_1fr]">
            {/* Sidebar */}
            <div className="bg-[#1C2C4A] h-screen sticky top-0">
                <ParentSidebar/>
            </div>

            <div className="p-6 bg-black w-full">
                {/* Child Selection Dropdown */}
                <div className="mb-6">
                    <Label className="text-white">Select Child</Label>
                    <Select onValueChange={(value) => setSelectedChild(value)} defaultValue={selectedChild}>
                        <SelectTrigger className="w-full bg-gray-800 text-white">
                            <SelectValue placeholder="Select a child" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 text-white">
                            {Object.keys(childrenData).map((childKey) => (
                                <SelectItem key={childKey} value={childKey}>
                                    {childrenData[childKey].name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Timetable Display */}
                {timetableData ? (
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white text-center text-2xl">Timetable</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="flex justify-between mb-4">
                                <h2 className="text-lg text-white">Uploaded File: {uploadedFileName}</h2>
                                <Label htmlFor="update-upload"
                                       className="cursor-pointer bg-purple-600 hover:bg-purple-700 inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md">
                                    <RefreshCcw className="-ml-1 mr-2 h-5 w-5"/>
                                    Update Timetable
                                </Label>
                                <Input
                                    id="update-upload"
                                    name="update-upload"
                                    type="file"
                                    className="sr-only"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileUpload}
                                    disabled={isUploading}
                                />
                            </div>
                            <Tabs defaultValue={activeDay} onValueChange={setActiveDay} className="w-full">
                                <TabsList className="grid w-full grid-cols-3 bg-gray-800 mb-4">
                                    {Object.keys(timetableData).map((day) => (
                                        <TabsTrigger
                                            key={day}
                                            value={day}
                                            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-400 py-2"
                                        >
                                            {day}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                {Object.entries(timetableData).map(([day, schedule]) => (
                                    <TabsContent key={day} value={day} className="mt-0">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-bold text-white bg-gray-700 p-2 rounded">
                                                {day}
                                            </h3>
                                            {schedule.map((class_, index) => (
                                                <div key={index}
                                                     className="flex items-center mb-2 last:mb-0 bg-gray-800 rounded-lg overflow-hidden">
                                                    <div className="flex-grow p-3">
                                                        <div className="font-bold text-white">{class_.code}</div>
                                                        <div className="text-gray-300">{class_.name}</div>
                                                        <div className="text-sm text-gray-400">{class_.instructor}</div>
                                                    </div>
                                                    <div className="flex items-center bg-gray-900 p-3 text-white space-x-2">
                                                        <div className="text-lg font-semibold">{class_.startTime}</div>
                                                        <div className="text-sm text-gray-400">To</div>
                                                        <div className="text-lg font-semibold">{class_.endTime}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="bg-gray-900 border-gray-800 p-6 mx-auto my-20">
                        <CardContent className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400"/>
                            <h3 className="mt-2 text-sm font-semibold text-gray-100">Upload your timetable</h3>
                            <p className="mt-1 text-sm text-gray-400">Upload an Excel file (.xlsx) with your timetable
                                information</p>
                            <div className="mt-6">
                                <Label htmlFor="file-upload"
                                       className="cursor-pointer bg-purple-600 hover:bg-purple-700 inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md">
                                    <FileUp className="-ml-1 mr-2 h-5 w-5"/>
                                    Upload file
                                </Label>
                                <Input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileUpload}
                                    disabled={isUploading}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
