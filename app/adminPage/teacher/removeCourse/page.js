'use client'

import { useState } from 'react'
import AdminSidebar from "@/components/admin/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function AdminRemoveAssignedCourse() {
    const [teacherId, setTeacherId] = useState('')
    const [courseId, setCourseId] = useState('')
    const [responseMessage, setResponseMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    // Remove Assigned Course by Teacher ID and Course ID
    const removeAssignedCourse = async () => {
        // Reset previous messages before a new request
        setResponseMessage(null)
        setErrorMessage(null)

        // Check if input fields are valid
        if (!teacherId || !courseId) {
            setErrorMessage("Both Teacher ID and Course ID are required.")
            return
        }

        try {
            const userData = sessionStorage.getItem('userData')

            if (!userData) {
                setErrorMessage("No userData found in session storage")
                return
            }

            const parsedData = JSON.parse(userData)
            const token = parsedData.accessToken
            console.log(token);
            if (!token) {
                setErrorMessage("No token found in userData")
                return
            }

            const response = await fetch(`http://localhost:8081/api/teachers/${teacherId}/course/${courseId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            if (response.ok) {
                const data = await response.json()
                setResponseMessage(data.message) // Display message from the backend response
            } else {
                const errorData = await response.json()
                setErrorMessage(errorData.message) // Display error message from the backend response
            }
        } catch (error) {
            setErrorMessage("An error occurred while removing the course")
        }
    }

    return (
        <div className="min-h-screen bg-[#1a1f2e]">
            <div className="grid grid-cols-[auto_1fr]">
                <AdminSidebar />
                <main className="p-8">
                    <div className="max-w-[1400px] mx-auto">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Remove Assigned Course</h1>
                            <p className="text-gray-400">Enter teacher ID and course ID to remove an assigned course.</p>
                        </header>

                        {/* Display error message */}
                        {errorMessage && (
                            <div className="bg-red-600/10 border border-red-600/20 text-red-500 p-3 rounded-md mb-4">
                                {errorMessage}
                            </div>
                        )}

                        {/* Display response message */}
                        {responseMessage && (
                            <div className="bg-green-600/10 border border-green-600/20 text-green-500 p-3 rounded-md mb-4">
                                {responseMessage}
                            </div>
                        )}

                        <div className="bg-[#1c2237] rounded-lg overflow-hidden p-6">
                            <div className="grid gap-4">
                                <div>
                                    <Label htmlFor="teacherId" className="text-white">Teacher ID</Label>
                                    <Input
                                        id="teacherId"
                                        value={teacherId}
                                        onChange={(e) => setTeacherId(e.target.value)}
                                        placeholder="Enter teacher ID"
                                        className="bg-[#2c3547] text-white"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="courseId" className="text-white">Course ID</Label>
                                    <Input
                                        id="courseId"
                                        value={courseId}
                                        onChange={(e) => setCourseId(e.target.value)}
                                        placeholder="Enter course ID"
                                        className="bg-[#2c3547] text-white"
                                    />
                                </div>
                                <Button onClick={removeAssignedCourse} className="mt-4 ml-4">
                                    Remove Assigned Course
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
