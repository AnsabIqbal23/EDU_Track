// 'use client';
//
// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Search, Filter, RefreshCw } from "lucide-react";
// import StudentSidebar from "@/components/student/sidebar";
// import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast"; // Import Toast components
//
// export default function Courses() {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourses, setSelectedCourses] = useState([]);
//   const [confirmedCourses, setConfirmedCourses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [toastMessage, setToastMessage] = useState(""); // For toast messages
//   const [toastType, setToastType] = useState(""); // "success" or "error"
//
//   const userData = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("userData")) : null;
//   const token = userData?.accessToken;
//   const studentId = userData?.id;
//
//   // Load selected courses from sessionStorage on initial load
//   useEffect(() => {
//     const savedSelectedCourses = JSON.parse(sessionStorage.getItem("selectedCourses")) || [];
//     setSelectedCourses(savedSelectedCourses);
//   }, []);
//
//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`http://localhost:8081/api/courses/available?studentId=${studentId}`, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         if (!response.ok) throw new Error("Failed to fetch courses");
//         const data = await response.json();
//
//         // Store course IDs in sessionStorage
//         sessionStorage.setItem("availableCourses", JSON.stringify(data.map(course => course.courseId)));
//
//         setCourses(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourses();
//   }, [studentId, token]);
//
//   const handleCourseToggle = (courseId) => {
//     setSelectedCourses((prev) => {
//       const newSelectedCourses = prev.includes(courseId)
//           ? prev.filter((id) => id !== courseId)
//           : [...prev, courseId];
//
//       // Store updated selected courses in sessionStorage
//       sessionStorage.setItem("selectedCourses", JSON.stringify(newSelectedCourses));
//
//       return newSelectedCourses;
//     });
//   };
//
//   const handleConfirm = async () => {
//     // Retrieve course IDs from sessionStorage
//     const storedCourseIds = JSON.parse(sessionStorage.getItem("availableCourses")) || [];
//
//     for (const courseId of selectedCourses) {
//       if (storedCourseIds.includes(courseId)) {
//         try {
//           const response = await fetch(`http://localhost:8081/api/courses/enroll?studentId=${studentId}&courseId=${courseId}&isBacklog=0`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${token}`,
//             },
//           });
//
//           if (response.ok) {
//             setConfirmedCourses((prev) => [...prev, courseId]);
//             setToastMessage("Course successfully enrolled!");
//             setToastType("success");
//           } else {
//             const data = await response.json();
//             if (data.message === "You are already enrolled in this course.") {
//               setToastMessage("You are already enrolled in this course.");
//               setToastType("error");
//             }
//           }
//         } catch (err) {
//           console.log("Error enrolling in course:", err);
//           setToastMessage("An error occurred while enrolling.");
//           setToastType("error");
//         }
//       }
//     }
//   };
//
//   const handleRefresh = () => {
//     setSearchTerm("");
//     setStatusFilter("all");
//     setSelectedCourses([]);
//     setConfirmedCourses([]);
//     sessionStorage.removeItem("selectedCourses"); // Clear the selected courses in sessionStorage
//   };
//
//   const filteredCourses = courses.filter((course) => {
//     const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase());
//     const isSelected = selectedCourses.includes(course.courseId);
//     const isConfirmed = confirmedCourses.includes(course.courseId);
//     const matchesStatus =
//         statusFilter === "all" ||
//         (statusFilter === "selected" && isSelected) ||
//         (statusFilter === "confirmed" && isConfirmed);
//
//     return matchesSearch && matchesStatus;
//   });
//
//   const stats = {
//     total: courses.length,
//     selected: selectedCourses.length,
//     confirmed: confirmedCourses.length,
//   };
//
//   return (
//       <ToastProvider> {/* Wrap with ToastProvider */}
//         <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200">
//           <div className="grid grid-cols-[auto_1fr]">
//             <StudentSidebar />
//             <main className="p-8">
//               <header className="mb-8">
//                 <h1 className="text-3xl font-bold text-white mb-2">Course Selection</h1>
//                 <p className="text-gray-400">Manage and enroll in available courses</p>
//               </header>
//
//               <div className="grid grid-cols-3 gap-4 mb-6">
//                 {[{
//                   label: "Total Courses",
//                   value: stats.total,
//                   color: "bg-blue-600"
//                 }, {
//                   label: "Selected",
//                   value: stats.selected,
//                   color: "bg-yellow-600"
//                 }, {
//                   label: "Confirmed",
//                   value: stats.confirmed,
//                   color: "bg-green-600"
//                 }].map((stat, index) => (
//                     <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
//                       <CardContent className="p-4">
//                         <div className="flex items-center justify-between">
//                           <p className="text-gray-400">{stat.label}</p>
//                           <Badge className={`${stat.color} text-white`}>{stat.value}</Badge>
//                         </div>
//                       </CardContent>
//                     </Card>
//                 ))}
//               </div>
//
//               <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
//                 <CardHeader className="p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-4 flex-1">
//                       <div className="relative flex-1 max-w-md">
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                         <Input
//                             placeholder="Search by course name..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="pl-10 bg-gray-700/50 border-gray-600 text-gray-100"
//                         />
//                       </div>
//                       <div className="w-48">
//                         <Select value={statusFilter} onValueChange={setStatusFilter}>
//                           <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-100">
//                             <Filter className="h-4 w-4 mr-2" />
//                             <SelectValue placeholder="Filter by status" />
//                           </SelectTrigger>
//                           <SelectContent className="bg-gray-800 border-gray-700">
//                             <SelectItem value="all">All Status</SelectItem>
//                             <SelectItem value="selected">Selected</SelectItem>
//                             <SelectItem value="confirmed">Confirmed</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <Button
//                           variant="outline"
//                           className="border-gray-600 text-gray-300 hover:text-white"
//                           onClick={handleRefresh}
//                       >
//                         <RefreshCw className="h-4 w-4 mr-2" />
//                         Refresh
//                       </Button>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-6">
//                   {loading ? (
//                       <div className="text-center text-gray-400">Loading courses...</div>
//                   ) : error ? (
//                       <div className="text-center text-red-500">{error}</div>
//                   ) : (
//                       <ScrollArea className="max-h-[500px] space-y-2">
//                         {filteredCourses.map((course) => {
//                           const isSelected = selectedCourses.includes(course.courseId);
//                           const isConfirmed = confirmedCourses.includes(course.courseId);
//
//                           return (
//                               <div
//                                   key={course.courseId}
//                                   className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
//                               >
//                                 <div>
//                                   <p className="font-semibold text-white">{course.courseName}</p>
//                                   <p className="text-gray-400">{course.courseCode}</p>
//                                 </div>
//                                 <div className="flex items-center space-x-4">
//                                   <Checkbox
//                                       checked={isSelected}
//                                       onChange={() => handleCourseToggle(course.courseId)}
//                                   />
//                                   <Button
//                                       variant="outline"
//                                       disabled={isConfirmed}
//                                       onClick={() => handleCourseToggle(course.courseId)}
//                                   >
//                                     {isConfirmed ? "Confirmed" : isSelected ? "Selected" : "Select"}
//                                   </Button>
//                                 </div>
//                               </div>
//                           );
//                         })}
//                       </ScrollArea>
//                   )}
//                 </CardContent>
//                 <div className="p-6 flex justify-end">
//                   <Button onClick={handleConfirm} className="bg-green-600">Confirm Enrollment</Button>
//                 </div>
//               </Card>
//             </main>
//           </div>
//
//           {/* Toast for success or error message */}
//           <ToastViewport className="top-16 right-4" />
//           {toastMessage && (
//               <Toast className={`${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
//                 <ToastTitle>{toastType === 'success' ? "Success" : "Error"}</ToastTitle>
//                 <ToastDescription>{toastMessage}</ToastDescription>
//                 <ToastClose />
//               </Toast>
//           )}
//         </div>
//       </ToastProvider>
//   );
// }
//

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, RefreshCw } from "lucide-react";
import StudentSidebar from "@/components/student/sidebar";
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [confirmedCourses, setConfirmedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const userData = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("userData")) : null;
  const token = userData?.accessToken;
  const studentId = userData?.id;

  // Load confirmed and selected courses from sessionStorage
  useEffect(() => {
    const savedConfirmedCourses = JSON.parse(sessionStorage.getItem("confirmedCourses")) || [];
    const savedSelectedCourses = JSON.parse(sessionStorage.getItem("selectedCourses")) || [];
    setConfirmedCourses(savedConfirmedCourses);
    setSelectedCourses(savedSelectedCourses);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8081/api/courses/available?studentId=${studentId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();

        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [studentId, token]);

  const handleCourseToggle = (courseId) => {
    if (confirmedCourses.includes(courseId)) return; // Prevent toggling confirmed courses

    setSelectedCourses((prev) => {
      const newSelectedCourses = prev.includes(courseId)
          ? prev.filter((id) => id !== courseId)
          : [...prev, courseId];

      sessionStorage.setItem("selectedCourses", JSON.stringify(newSelectedCourses));
      return newSelectedCourses;
    });
  };

  const handleConfirm = async () => {
    let updatedConfirmedCourses = [...confirmedCourses]; // Copy the current confirmed courses

    for (const courseId of selectedCourses) {
      if (!confirmedCourses.includes(courseId)) {
        try {
          const response = await fetch(
              `http://localhost:8081/api/courses/enroll?studentId=${studentId}&courseId=${courseId}&isBacklog=0`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
          );

          const data = await response.json();

          if (response.ok) {
            // Successfully enrolled in the course
            updatedConfirmedCourses.push(courseId);
            setToastMessage("Course successfully enrolled!");
            setToastType("success");
          } else if (data.message === "You are already enrolled in this course.") {
            // Handle the "already enrolled" case
            if (!updatedConfirmedCourses.includes(courseId)) {
              updatedConfirmedCourses.push(courseId);
            }
            setToastMessage("You are already enrolled in this course.");
            setToastType("info");
          } else {
            // Handle any other error message by removing the course from confirmed courses
            updatedConfirmedCourses = updatedConfirmedCourses.filter(
                (id) => id !== courseId
            );
            setToastMessage(data.message || "An error occurred while enrolling.");
            setToastType("error");
          }
        } catch (err) {
          console.error("Error enrolling in course:", err);
          setToastMessage("An error occurred while enrolling.");
          setToastType("error");
        }
      }
    }

    // Update state and sessionStorage
    setConfirmedCourses(updatedConfirmedCourses);
    sessionStorage.setItem("confirmedCourses", JSON.stringify(updatedConfirmedCourses));
    setSelectedCourses([]); // Clear selected courses after confirmation
    sessionStorage.removeItem("selectedCourses");
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSelectedCourses([]);
    sessionStorage.removeItem("selectedCourses");
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const isSelected = selectedCourses.includes(course.courseId);
    const isConfirmed = confirmedCourses.includes(course.courseId);
    const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "selected" && isSelected) ||
        (statusFilter === "confirmed" && isConfirmed);

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: courses.length,
    selected: selectedCourses.length,
    confirmed: confirmedCourses.length,
  };

  return (
      <ToastProvider>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200">
          <div className="grid grid-cols-[auto_1fr]">
            <StudentSidebar />
            <main className="p-8">
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Course Selection</h1>
                <p className="text-gray-400">Manage and enroll in available courses</p>
              </header>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Total Courses", value: stats.total, color: "bg-blue-600" },
                  { label: "Selected", value: stats.selected, color: "bg-yellow-600" },
                  { label: "Confirmed", value: stats.confirmed, color: "bg-green-600" },
                ].map((stat, index) => (
                    <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400">{stat.label}</p>
                          <Badge className={`${stat.color} text-white`}>{stat.value}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by course name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-gray-700/50 border-gray-600 text-gray-100"
                        />
                      </div>
                      <div className="w-48">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-100">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="selected">Selected</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:text-white"
                          onClick={handleRefresh}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {loading ? (
                      <div className="text-center text-gray-400">Loading courses...</div>
                  ) : error ? (
                      <div className="text-center text-red-500">{error}</div>
                  ) : (
                      <ScrollArea className="max-h-[500px] space-y-2">
                        {filteredCourses.map((course) => {
                          const isSelected = selectedCourses.includes(course.courseId);
                          const isConfirmed = confirmedCourses.includes(course.courseId);

                          return (
                              <div
                                  key={course.courseId}
                                  className={`flex items-center justify-between px-4 py-3 rounded-md bg-gray-700/50 border ${
                                      isSelected
                                          ? "border-yellow-500"
                                          : isConfirmed
                                              ? "border-green-500"
                                              : "border-gray-600"
                                  }`}
                              >
                                <div>
                                  <p className="font-medium text-gray-200">{course.courseName}</p>
                                  <p className="text-sm text-gray-400">
                                    {course.teacherName} - {course.section}
                                  </p>
                                </div>
                                <Checkbox
                                    checked={isSelected || isConfirmed}
                                    onCheckedChange={() => handleCourseToggle(course.courseId)}
                                    disabled={isConfirmed}
                                />
                              </div>
                          );
                        })}
                      </ScrollArea>
                  )}
                </CardContent>
              </Card>

              <div className="mt-6">
                <Button
                    disabled={selectedCourses.length === 0}
                    onClick={handleConfirm}
                    className="w-full bg-blue-600 hover:bg-blue-500"
                >
                  Confirm Selected Courses
                </Button>
              </div>
            </main>
          </div>
        </div>

        <ToastViewport className="mt-16" />
        <Toast open={!!toastMessage} onOpenChange={() => setToastMessage("")}>
          <div className={toastType === "success" ? "bg-green-700" : "bg-red-700"} />
          <ToastTitle>{toastType === "success" ? "Success" : "Error"}</ToastTitle>
          <ToastDescription>{toastMessage}</ToastDescription>
          <ToastClose />
        </Toast>
      </ToastProvider>
  );
}
