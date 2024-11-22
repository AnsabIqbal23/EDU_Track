'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Search, Filter, RefreshCw } from 'lucide-react';
import AdminSidebar from "@/components/admin/sidebar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialRequests = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", program: "Computer Science", batch: "Fall 2023", status: "pending", date: "2024-10-20" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", program: "Electrical Engineering", batch: "Fall 2023", status: "pending", date: "2024-10-21" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", program: "Business Administration", batch: "Spring 2024", status: "pending", date: "2024-10-22" },
  { id: 4, name: "Diana Ross", email: "diana@example.com", program: "Psychology", batch: "Fall 2023", status: "pending", date: "2024-10-23" },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", program: "Mechanical Engineering", batch: "Spring 2024", status: "pending", date: "2024-10-24" },
];

export default function AdminSignupApproval() {
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleRefresh = () => {
    setRequests([...initialRequests]); // Reset requests to initial state
  };

  const handleApprove = (id) => {
    setRequests(requests.map(request =>
        request.id === id ? { ...request, status: 'approved' } : request
    ));
  };

  const handleReject = (id) => {
    setRequests(requests.map(request =>
        request.id === id ? { ...request, status: 'rejected' } : request
    ));
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch =
        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.program.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="grid grid-cols-[auto_1fr]">
          <AdminSidebar />
          <main className="p-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Student Signup Requests</h1>
              <p className="text-gray-400">Review and manage student registration applications</p>
            </header>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Requests', value: stats.total, color: 'bg-blue-600' },
                { label: 'Pending', value: stats.pending, color: 'bg-yellow-600' },
                { label: 'Approved', value: stats.approved, color: 'bg-green-600' },
                { label: 'Rejected', value: stats.rejected, color: 'bg-red-600' },
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
                          placeholder="Search by name, email, or program..."
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
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" onClick={handleRefresh} className="border-gray-600 text-gray-300 hover:text-white">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="rounded-lg overflow-hidden border border-gray-700">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-800/50 hover:bg-gray-800/50">
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Email</TableHead>
                        <TableHead className="text-gray-300">Program</TableHead>
                        <TableHead className="text-gray-300">Batch</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
                          <TableRow key={request.id} className="hover:bg-gray-800/30">
                            <TableCell className="font-medium text-gray-200">{request.name}</TableCell>
                            <TableCell className="text-gray-200">{request.email}</TableCell>
                            <TableCell className="text-gray-200">{request.program}</TableCell>
                            <TableCell className="text-gray-200">{request.batch}</TableCell>
                            <TableCell>
                              <Badge
                                  variant={
                                    request.status === 'approved' ? 'success' :
                                        request.status === 'rejected' ? 'destructive' : 'secondary'
                                  }
                                  className={
                                    request.status === 'approved' ? 'bg-green-600' :
                                        request.status === 'rejected' ? 'bg-red-600' : 'bg-yellow-600'
                                  }
                              >
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleApprove(request.id)}
                                    disabled={request.status !== 'pending'}
                                    className={`border-gray-600 ${
                                        request.status === 'pending'
                                            ? 'hover:bg-green-600 hover:text-white'
                                            : 'opacity-50 cursor-not-allowed'
                                    }`}
                                >
                                  <Check className="mr-1 h-4 w-4" /> Approve
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleReject(request.id)}
                                    disabled={request.status !== 'pending'}
                                    className={`border-gray-600 ${
                                        request.status === 'pending'
                                            ? 'hover:bg-red-600 hover:text-white'
                                            : 'opacity-50 cursor-not-allowed'
                                    }`}
                                >
                                  <X className="mr-1 h-4 w-4" /> Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
  );
}
