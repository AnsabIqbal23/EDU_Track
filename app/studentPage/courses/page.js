'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import StudentSidebar from "@/components/student/sidebar"

// Mock data for available courses
const availableCourses = [
  { id: 'CS101', name: 'Introduction to Computer Science', credits: 3 },
  { id: 'MATH201', name: 'Linear Algebra', credits: 4 },
  { id: 'PHYS301', name: 'Quantum Mechanics', credits: 4 },
  { id: 'ENG102', name: 'Academic Writing', credits: 3 },
  { id: 'CHEM201', name: 'Organic Chemistry', credits: 4 },
  { id: 'BIO101', name: 'Introduction to Biology', credits: 3 },
  { id: 'ECON201', name: 'Microeconomics', credits: 3 },
  { id: 'PSYCH101', name: 'Introduction to Psychology', credits: 3 },
]

export default function Courses() {
  const [selectedCourses, setSelectedCourses] = useState([]) // Changed to normal useState
  const [confirmedCourses, setConfirmedCourses] = useState([])

  const handleCourseToggle = (courseId) => {
    setSelectedCourses(prev =>
        prev.includes(courseId)
            ? prev.filter(id => id !== courseId)
            : [...prev, courseId]
    )
  }

  const handleConfirm = () => {
    setConfirmedCourses(selectedCourses)
  }

  const totalCredits = confirmedCourses.reduce((sum, courseId) => {
    const course = availableCourses.find(c => c.id === courseId)
    return sum + (course?.credits || 0)
  }, 0)

  return (
      <div className="min-h-screen bg-[#121212] text-gray-200 grid grid-cols-[auto_1fr]">
        <StudentSidebar />
        <main className="container mx-auto p-6 h-full">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-100">Course Selection</CardTitle>
            </CardHeader>
            <CardContent>
              {confirmedCourses.length === 0 ? (
                  <>
                    <ScrollArea className="h-[300px] pr-4">
                      {availableCourses.map((course) => (
                          <div key={course.id} className="flex items-center space-x-2 mb-4">
                            <Checkbox
                                id={course.id}
                                checked={selectedCourses.includes(course.id)}
                                onCheckedChange={() => handleCourseToggle(course.id)} // Fixed onCheckedChange
                            />
                            <label
                                htmlFor={course.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-200"
                            >
                              {course.name} ({course.credits} credits)
                            </label>
                          </div>
                      ))}
                    </ScrollArea>
                    <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    Selected: {selectedCourses.length} course(s)
                  </span>
                      <Button onClick={handleConfirm} disabled={selectedCourses.length === 0}>
                        Confirm Selection
                      </Button>
                    </div>
                  </>
              ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-100">Your Confirmed Courses</h3>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      {confirmedCourses.map((courseId) => {
                        const course = availableCourses.find(c => c.id === courseId)
                        return (
                            <Card key={courseId} className="bg-gray-700 border-gray-600">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-gray-100">{course?.name}</h4>
                                <div className="flex justify-between items-center mt-2">
                                  <Badge variant="secondary">{course?.id}</Badge>
                                  <span className="text-sm text-gray-400">{course?.credits} credits</span>
                                </div>
                              </CardContent>
                            </Card>
                        )
                      })}
                    </div>
                    <div className="mt-4 text-right">
                      <span className="text-sm text-gray-400">Total Credits: {totalCredits}</span>
                    </div>
                    <Button
                        className="mt-4"
                        onClick={() => {
                          setSelectedCourses([])
                          setConfirmedCourses([])
                        }}
                    >
                      Reset Selection
                    </Button>
                  </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
  )
}
