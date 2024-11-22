'use client'

import { useState } from 'react'
import AdminSidebar from "@/components/admin/sidebar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminTeacherDetails() {
    const [teacherId, setTeacherId] = useState('')
    const [teacherData, setTeacherData] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const fetchTeacherDetails = async () => {
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

            const response = await fetch(`http://localhost:8081/api/teachers/info/${teacherId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setTeacherData(data)
                setIsDialogOpen(true)
            } else {
                const errorData = await response.json()
                setErrorMessage(errorData.message || "Failed to fetch teacher details.")
            }
        } catch (error) {
            setErrorMessage("An error occurred while fetching teacher details.")
            console.error("Error:", error)
        }
    }

    const handleInputChange = (e) => {
        setTeacherId(e.target.value)
    }

    return (
        <div className="min-h-screen bg-[#1a1f2e]">
            <div className="grid grid-cols-[auto_1fr]">
                <AdminSidebar />
                <main className="p-8">
                    <div className="max-w-[1400px] mx-auto">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Get Teacher Info</h1>
                            <p className="text-gray-400">Enter a teacher ID to get their details.</p>
                        </header>

                        {errorMessage && (
                            <div className="bg-red-600/10 border border-red-600/20 text-red-500 p-3 rounded-md mb-4">
                                {errorMessage}
                            </div>
                        )}

                        <div className="bg-[#1c2237] rounded-lg overflow-hidden p-6">
                            <div className="grid gap-4">
                                <Label htmlFor="teacherId" className="text-white">Teacher ID</Label>
                                <Input
                                    id="teacherId"
                                    value={teacherId}
                                    onChange={handleInputChange}
                                    placeholder="Enter teacher ID"
                                    className="bg-[#2c3547] text-white"
                                />
                                <Button onClick={fetchTeacherDetails} className="mt-4">Search Teacher</Button>
                            </div>
                        </div>

                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Teacher Details</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    {teacherData ? (
                                        <div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label>Username</Label>
                                                    <p>{teacherData.username}</p>
                                                </div>
                                                <div>
                                                    <Label>Email</Label>
                                                    <p>{teacherData.email}</p>
                                                </div>
                                                <div>
                                                    <Label>Department</Label>
                                                    <p>{teacherData.department}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mt-4">
                                                <div>
                                                    <Label>Office Hours</Label>
                                                    <p>{teacherData.officeHours}</p>
                                                </div>
                                                <div>
                                                    <Label>Qualification</Label>
                                                    <p>{teacherData.qualification}</p>
                                                </div>
                                                <div>
                                                    <Label>Specialization</Label>
                                                    <p>{teacherData.specialization}</p>
                                                </div>
                                                <div>
                                                    <Label>Courses</Label>
                                                    <p>{teacherData.courses}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>No teacher data available.</p>
                                    )}
                                </div>
                                <DialogFooter>
                                    <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </main>
            </div>
        </div>
    )
}
