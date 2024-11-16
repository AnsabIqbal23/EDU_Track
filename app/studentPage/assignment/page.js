'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileIcon, UploadIcon } from "lucide-react"
import StudentSidebar from "@/components/student/sidebar"

const Assignment = () => {
  return (
      <div className="h-screen w-full bg-[#121212] text-gray-200 grid grid-cols-[auto_1fr]">
        {/* Sidebar */}
        <StudentSidebar />

        {/* Main content area */}
        <div className="p-6 bg-black">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Assigned Document Card */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Assigned Document</CardTitle>
                <CardDescription>Review the assignment details below</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
                  <FileIcon className="h-8 w-8 text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold">Assignment_1.pdf</h3>
                    <p className="text-sm text-gray-400">Click to download and view the assignment</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Assignment Card */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Submit Your Assignment</CardTitle>
                <CardDescription>Upload your completed assignment here</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  {/* Full Name Input */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="bg-gray-800 border-gray-600 text-gray-200"
                    />
                  </div>

                  {/* Student ID Input */}
                  <div className="space-y-2">
                    <Label htmlFor="student-id" className="text-gray-300">Student ID</Label>
                    <Input
                        id="student-id"
                        placeholder="Enter your student ID"
                        className="bg-gray-800 border-gray-600 text-gray-200"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="file" className="text-gray-300">Upload Assignment</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="file" type="file" className="bg-gray-800 border-gray-600 text-gray-200" />
                      <Button type="button" size="icon" className="bg-gray-800 hover:bg-gray-700">
                        <UploadIcon className="h-4 w-4 text-gray-200" />
                        <span className="sr-only">Upload file</span>
                      </Button>
                    </div>
                  </div>

                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Submit Assignment</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
  )
}

export default Assignment;