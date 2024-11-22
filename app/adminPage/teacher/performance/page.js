'use client'

import { useState } from 'react'
import AdminSidebar from "@/components/admin/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function AdminTeacherPerformance() {
    const [teacherId, setTeacherId] = useState('')
    const [performanceData, setPerformanceData] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    // Get Teacher Performance by Teacher ID
    const getTeacherPerformance = async () => {
        try {
            const userData = sessionStorage.getItem('userData')

            if (!userData) {
                setErrorMessage("No userData found in session storage")
                return
            }

            const parsedData = JSON.parse(userData)
            const token = parsedData.accessToken

            if (!token) {
                setErrorMessage("No token found in userData")
                return
            }

            const response = await fetch(`http://localhost:8081/api/teachers/${teacherId}/performance`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            if (response.ok) {
                const data = await response.json()
                setPerformanceData(data)
            } else {
                const errorData = await response.json()
                setErrorMessage(errorData.message || "Failed to fetch performance data")
            }
        } catch (error) {
            setErrorMessage("An error occurred while fetching performance data")
            console.error("Error:", error)
        }
    }

    return (
        <div className="min-h-screen bg-[#1a1f2e]">
            <div className="grid grid-cols-[auto_1fr]">
                <AdminSidebar />
                <main className="p-8">
                    <div className="max-w-[1400px] mx-auto">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Teacher Performance</h1>
                            <p className="text-gray-400">Enter teacher ID to view performance data.</p>
                        </header>

                        {errorMessage && (
                            <div className="bg-red-600/10 border border-red-600/20 text-red-500 p-3 rounded-md mb-4">
                                {errorMessage}
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
                                <Button onClick={getTeacherPerformance} className="mt-4 ml-4">
                                    Get Performance Data
                                </Button>
                            </div>
                        </div>

                        {performanceData && (
                            <div className="mt-8 bg-[#2c3547] rounded-lg p-6">
                                {performanceData.length === 0 ? (
                                    <p className="text-white">No performance data found.</p>
                                ) : (
                                    performanceData.map((performance, index) => (
                                        <div key={index} className="mb-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label>Performance Metric</Label>
                                                    <p>{performance.metric}</p>
                                                </div>
                                                <div>
                                                    <Label>Score</Label>
                                                    <p>{performance.score}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mt-4">
                                                <div>
                                                    <Label>Feedback</Label>
                                                    <p>{performance.feedback}</p>
                                                </div>
                                                <div>
                                                    <Label>Evaluation Date</Label>
                                                    <p>{performance.evaluationDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}
