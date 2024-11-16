'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Printer } from 'lucide-react'
import Sidebar from "@/components/parent/sidebar" // Import your Sidebar component

// Mock data for children and their fee challans
const childrenData = [
    {
        id: 1,
        name: "Ali Yahya Amer",
        rollNumber: "22K-4417",
        semester: "Fall 2023",
        dueDate: "2023-12-31",
        items: [
            { description: "Tuition Fee", amount: 50000 },
            { description: "Library Fee", amount: 2000 },
            { description: "Computer Lab Fee", amount: 3000 },
            { description: "Examination Fee", amount: 5000 },
        ]
    },
    {
        id: 2,
        name: "Sarah Ali",
        rollNumber: "22K-4423",
        semester: "Fall 2023",
        dueDate: "2023-12-31",
        items: [
            { description: "Tuition Fee", amount: 52000 },
            { description: "Library Fee", amount: 2000 },
            { description: "Computer Lab Fee", amount: 3000 },
            { description: "Examination Fee", amount: 5000 },
        ]
    }
];

export default function Fees() {
    const [selectedChildId, setSelectedChildId] = useState(childrenData[0].id);

    const selectedChild = childrenData.find(child => child.id === selectedChildId);
    const totalAmount = selectedChild.items.reduce((sum, item) => sum + item.amount, 0);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="h-screen bg-[#121212] text-gray-200 grid grid-cols-[auto_1fr]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div className="p-6 bg-black w-full">
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Dropdown for selecting a child */}
                    <Select value={selectedChildId} onValueChange={setSelectedChildId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a child" />
                        </SelectTrigger>
                        <SelectContent>
                            {childrenData.map(child => (
                                <SelectItem key={child.id} value={child.id}>
                                    {child.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Fee Challan Card */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center text-gray-100">Fee Challan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Student Info */}
                            <div className="grid grid-cols-2 gap-4 text-gray-200">
                                <div><span className="font-semibold">Student Name:</span> {selectedChild.name}</div>
                                <div><span className="font-semibold">Roll Number:</span> {selectedChild.rollNumber}</div>
                                <div><span className="font-semibold">Semester:</span> {selectedChild.semester}</div>
                                <div><span className="font-semibold">Due Date:</span> {selectedChild.dueDate}</div>
                            </div>

                            {/* Fee Table */}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-gray-300">Description</TableHead>
                                        <TableHead className="text-right text-gray-300">Amount (PKR)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {selectedChild.items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium text-gray-200">{item.description}</TableCell>
                                            <TableCell className="text-right text-gray-200">{item.amount.toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell className="font-semibold text-gray-100">Total</TableCell>
                                        <TableCell className="text-right font-semibold text-gray-100">{totalAmount.toLocaleString()}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="flex justify-between print:hidden">
                            <Button onClick={handlePrint} variant="outline">
                                <Printer className="mr-2 h-4 w-4" /> Print Challan
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
