import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import StudentSidebar from "@/components/student/sidebar"

// Mock data - replace with actual data from your backend
const studentInfo = {
  ARN: "2251239",
  RollNo: "22K-4417",
  Name: "Ali Yahya Amer",
  Batch: "Fall 2022"
}

const semesterData = [
  {
    term: "Fall 2022",
    summary: {
      CrAtt: 17,
      CrErnd: 17,
      CGPA: 2.57,
      SGPA: 2.57
    },
    courses: [
      { Code: "CL1000", CourseName: "Introduction to Information and Communication Technology", Section: "BCS-1J", CrdHrs: 1, Grade: "B", Points: 3, Type: "Core" },
      { Code: "CL1002", CourseName: "Programming Fundamentals - Lab", Section: "BCS-1J", CrdHrs: 1, Grade: "C", Points: 2, Type: "Core" },
      { Code: "CS1002", CourseName: "Programming Fundamentals", Section: "BCS-1J", CrdHrs: 3, Grade: "C-", Points: 1.67, Type: "Core" },
      { Code: "MT1003", CourseName: "Calculus and Analytical Geometry", Section: "BCS-1J", CrdHrs: 3, Grade: "C+", Points: 2.33, Type: "Core" },
      { Code: "NS1001", CourseName: "Applied Physics", Section: "BCS-1J", CrdHrs: 3, Grade: "C", Points: 2, Type: "Core" },
      { Code: "SL1004", CourseName: "English Composition", Section: "BCS-1J", CrdHrs: 1, Grade: "A-", Points: 3.67, Type: "Core" },
    ]
  },
  {
    term: "Spring 2023",
    summary: {
      CrAtt: 34,
      CrErnd: 34,
      CGPA: 2.72,
      SGPA: 2.86
    },
    courses: [
      { Code: "CL1004", CourseName: "Object Oriented Programming - Lab", Section: "BCS-2J", CrdHrs: 1, Grade: "C-", Points: 1.67, Type: "Core" },
      { Code: "CS1004", CourseName: "Object Oriented Programming", Section: "BCS-2J", CrdHrs: 3, Grade: "B", Points: 3, Type: "Core" },
      { Code: "EE1005", CourseName: "Digital Logic Design", Section: "BCS-2J", CrdHrs: 3, Grade: "B-", Points: 2.67, Type: "Core" },
      { Code: "EL1005", CourseName: "Digital Logic Design - Lab", Section: "BCS-2J", CrdHrs: 1, Grade: "B", Points: 3, Type: "Core" },
      { Code: "MT1006", CourseName: "Differential Equations", Section: "BCS-2J", CrdHrs: 3, Grade: "C+", Points: 2.33, Type: "Core" },
      { Code: "SL1008", CourseName: "Communication and Presentation", Section: "BCS-2J", CrdHrs: 1, Grade: "A", Points: 4, Type: "Core" },
    ]
  }
]

export default function Transcript() {
  return (
      <div className="min-h-screen bg-[#121212] text-gray-200 grid grid-cols-[auto_1fr]">
        <StudentSidebar />
        <main className="container mx-auto p-6 space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-100">Student Transcript</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-gray-200">
                <div><span className="font-semibold">ARN:</span> {studentInfo.ARN}</div>
                <div><span className="font-semibold">Roll No:</span> {studentInfo.RollNo}</div>
                <div><span className="font-semibold">Name:</span> {studentInfo.Name}</div>
                <div><span className="font-semibold">Batch:</span> {studentInfo.Batch}</div>
              </div>
            </CardContent>
          </Card>

          {semesterData.map((semester, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-100">{semester.term}</CardTitle>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-gray-300">
                    <div>Cr. Att: {semester.summary.CrAtt}</div>
                    <div>Cr. Ernd: {semester.summary.CrErnd}</div>
                    <div>CGPA: {semester.summary.CGPA.toFixed(2)}</div>
                    <div>SGPA: {semester.summary.SGPA.toFixed(2)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-300">Code</TableHead>
                        <TableHead className="text-gray-300">Course Name</TableHead>
                        <TableHead className="text-gray-300">Section</TableHead>
                        <TableHead className="text-gray-300">CrdHrs</TableHead>
                        <TableHead className="text-gray-300">Grade</TableHead>
                        <TableHead className="text-gray-300">Points</TableHead>
                        <TableHead className="text-gray-300">Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {semester.courses.map((course, courseIndex) => (
                          <TableRow key={courseIndex}>
                            <TableCell className="font-medium text-gray-200">{course.Code}</TableCell>
                            <TableCell className="text-gray-200">{course.CourseName}</TableCell>
                            <TableCell className="text-gray-200">{course.Section}</TableCell>
                            <TableCell className="text-gray-200">{course.CrdHrs}</TableCell>
                            <TableCell className="text-gray-200">{course.Grade}</TableCell>
                            <TableCell className="text-gray-200">{course.Points}</TableCell>
                            <TableCell className="text-gray-200">{course.Type}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
          ))}
        </main>
      </div>
  )
}