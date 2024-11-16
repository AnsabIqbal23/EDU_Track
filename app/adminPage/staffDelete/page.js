// 'use client';
// import { useState } from 'react';
// import { AlertCircle, Trash2 } from 'lucide-react';
// import AdminSidebar from "@/components/admin/sidebar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
//
// // This would typically come from your backend or state management
// const mockStaffMembers = [
//   { id: '1', name: 'John Doe', role: 'teacher' },
//   { id: '2', name: 'Jane Smith', role: 'librarian' },
//   { id: '3', name: 'Bob Johnson', role: 'teacher' },
// ];
//
// const StaffDeleteFormComponent = () => {
//   const [selectedStaff, setSelectedStaff] = useState(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [deleteError, setDeleteError] = useState(null);
//
//   const handleStaffSelect = (staffId) => {
//     const staff = mockStaffMembers.find(s => s.id === staffId);
//     setSelectedStaff(staff || null);
//     setDeleteError(null);
//   };
//
//   const handleDelete = async () => {
//     if (!selectedStaff) return;
//
//     try {
//       // Simulating an API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//
//       console.log(`Deleted staff member: ${selectedStaff.name}`);
//       setIsDeleteDialogOpen(false);
//       setSelectedStaff(null);
//     } catch (error) {
//       setDeleteError('An error occurred while deleting the staff member. Please try again.');
//     }
//   };
//
//   return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
//         <div className="grid grid-cols-[auto_1fr]">
//           <AdminSidebar />
//           <main className="p-8">
//             <div className="max-w-2xl mx-auto">
//               <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
//                 <CardHeader>
//                   <CardTitle className="text-white">Delete Staff Member</CardTitle>
//                   <CardDescription className="text-gray-400">Remove a teacher or librarian from the system</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid w-full items-center gap-4">
//                     <div className="flex flex-col space-y-1.5">
//                       <Label htmlFor="staffSelect">Select Staff Member</Label>
//                       <Select onValueChange={handleStaffSelect}>
//                         <SelectTrigger id="staffSelect">
//                           <SelectValue placeholder="Select a staff member" />
//                         </SelectTrigger>
//                         <SelectContent position="popper">
//                           {mockStaffMembers.map((staff) => (
//                               <SelectItem key={staff.id} value={staff.id}>
//                                 {staff.name} ({staff.role})
//                               </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                   {deleteError && (
//                       <Alert variant="destructive" className="mt-4">
//                         <AlertCircle className="h-4 w-4" />
//                         <AlertTitle>Error</AlertTitle>
//                         <AlertDescription>{deleteError}</AlertDescription>
//                       </Alert>
//                   )}
//                 </CardContent>
//                 <CardFooter className="flex justify-between">
//                   <Button variant="outline">Cancel</Button>
//                   <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//                     <DialogTrigger asChild>
//                       <Button
//                           variant="destructive"
//                           disabled={!selectedStaff}
//                           onClick={() => setIsDeleteDialogOpen(true)}>
//                         <Trash2 className="mr-2 h-4 w-4" />
//                         Delete Staff Member
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogHeader>
//                         <DialogTitle>Are you sure you want to delete this staff member?</DialogTitle>
//                         <DialogDescription>
//                           This action cannot be undone. This will permanently delete the account of {selectedStaff?.name} ({selectedStaff?.role}) and remove their data from our servers.
//                         </DialogDescription>
//                       </DialogHeader>
//                       <DialogFooter>
//                         <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//                           Cancel
//                         </Button>
//                         <Button variant="destructive" onClick={handleDelete}>
//                           Delete
//                         </Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   </Dialog>
//                 </CardFooter>
//               </Card>
//             </div>
//           </main>
//         </div>
//       </div>
//   );
// }
//
// export default StaffDeleteFormComponent;


'use client';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import AdminSidebar from '@/components/admin/sidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui/toast";

const TeacherDeleteFormComponent = () => {
  const [Id, setTeacherId] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState("success");

  const showToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000); // Hide toast after 3 seconds
  };

  // const handleDelete = async () => {
  //   if (!teacherId) return;
  //
  //   try {
  //     const url = `http://localhost:8081/api/teachers/removeTeacher?teacherId=${teacherId}`;
  //     const userData = sessionStorage.getItem('userData');
  //
  //     if (!userData) {
  //       showToast("error", "No userData found in session storage");
  //       return;
  //     }
  //
  //     const parsedData = JSON.parse(userData);
  //     const token = parsedData.accessToken;
  //
  //     if (!token) {
  //       showToast("error", "Authorization token missing.");
  //       return;
  //     }
  //
  //     // Make the API call to delete the teacher
  //     const response = await fetch(url, {
  //       method: 'DELETE',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       },
  //     });
  //
  //     const result = await response.text(); // Read the response message from the backend
  //
  //     if (result === 'Teacher Not Found') {
  //       showToast("error", "Teacher Not Found");
  //     } else if (result === 'Teacher Deleted Successfully') {
  //       showToast("success", "Teacher Deleted Successfully");
  //       setIsDeleteDialogOpen(false);
  //       setTeacherId('');
  //     } else {
  //       throw new Error(result || 'Failed to delete the teacher. Please check the ID or try again.');
  //     }
  //   } catch (error) {
  //     showToast("error", error.message || 'An error occurred while deleting the teacher. Please try again.');
  //   }
  // };

  const handleDelete = async () => {
    if (!Id) return;

    try {
      const url = `http://localhost:8081/api/teachers/delete/${Id}`;
      const userData = sessionStorage.getItem('userData');

      if (!userData) {
        showToast("error", "No userData found in session storage");
        return;
      }

      const parsedData = JSON.parse(userData);
      const token = parsedData.accessToken;

      if (!token) {
        showToast("error", "Authorization token missing.");
        return;
      }

      // Make the API call to delete the teacher
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.text(); // Read the response message from the backend

      if (result === 'Teacher Not Found') {
        showToast("error", "Teacher Not Found");
      } else if (result === 'Teacher Deleted Successfully') {
        showToast("success", "Teacher Deleted Successfully");
        setIsDeleteDialogOpen(false);
        setTeacherId('');
      } else {
        throw new Error(result || 'Failed to delete the teacher. Please check the ID or try again.');
      }
    } catch (error) {
      showToast("error", error.message || 'An error occurred while deleting the teacher. Please try again.');
    }
  };

  return (
      <ToastProvider swipeDirection="right">
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="grid grid-cols-[auto_1fr]">
            <AdminSidebar />
            <main className="p-8">
              <div className="max-w-2xl mx-auto">
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Delete Teacher</CardTitle>
                    <CardDescription className="text-gray-400">Enter the Teacher ID to remove the teacher from the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="teacherIdInput">Teacher ID</Label>
                        <Input
                            id="IdInput"
                            placeholder="Enter Teacher ID"
                            value={Id}
                            onChange={(e) => setTeacherId(e.target.value)}
                            className="bg-gray-700 text-white border-gray-600"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setTeacherId('')}>
                      Clear
                    </Button>
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                            variant="destructive"
                            disabled={!Id}
                            onClick={() => setIsDeleteDialogOpen(true)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Teacher
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure you want to delete this teacher?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete the teacher with ID {Id} from the system.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="outline" onClick={handleDelete}>
                            Confirm
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </div>
            </main>
          </div>

          {/* Toast Display */}
          {toastMessage && (
              <Toast className={toastType === "error" ? "bg-red-600" : "bg-green-600"}>
                <ToastTitle>{toastType === "error" ? "Error" : "Success"}</ToastTitle>
                <ToastDescription>{toastMessage}</ToastDescription>
                <ToastClose />
              </Toast>
          )}
          <ToastViewport />
        </div>
      </ToastProvider>
  );
};

export default TeacherDeleteFormComponent;
