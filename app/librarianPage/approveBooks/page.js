'use client'
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Search, Filter, RefreshCw } from "lucide-react";
import LibrarianSidebar from "@/components/librarian/sidebar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialBooks = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", status: "pending", date: "2024-10-20", student: "a@gmail.com" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", status: "pending", date: "2024-10-21", student: "b@gmail.com" },
    { id: 3, title: "1984", author: "George Orwell", status: "pending", date: "2024-10-22", student: "a@gmail.com" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", status: "pending", date: "2024-10-23", student: "c@gmail.com" },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", status: "pending", date: "2024-10-24", student: "d@gmail.com" },
];

export default function BookApprovalDashboard() {
    const [books, setBooks] = useState(initialBooks);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const handleApprove = (id) => {
        setBooks(books.map(book =>
            book.id === id ? { ...book, status: "approved" } : book
        ));
    };

    const handleReject = (id) => {
        setBooks(books.map(book =>
            book.id === id ? { ...book, status: "rejected" } : book
        ));
    };

    const handleRefresh = () => {
        setBooks(initialBooks); // Reset books to the initial state
        setSearchTerm(""); // Clear search term
        setStatusFilter("all"); // Reset filter to 'all'
    };

    const filteredBooks = books.filter(book => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || book.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: books.length,
        pending: books.filter(b => b.status === "pending").length,
        approved: books.filter(b => b.status === "approved").length,
        rejected: books.filter(b => b.status === "rejected").length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="grid grid-cols-[auto_1fr]">
                <LibrarianSidebar />

                <main className="p-8">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Book Approval</h1>
                        <p className="text-gray-400">Manage and approve book submissions</p>
                    </header>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {[{ label: "Total Books", value: stats.total, color: "bg-blue-600" },
                            { label: "Pending", value: stats.pending, color: "bg-yellow-600" },
                            { label: "Approved", value: stats.approved, color: "bg-green-600" },
                            { label: "Rejected", value: stats.rejected, color: "bg-red-600" }]
                            .map((stat, index) => (
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
                                            placeholder="Search by title or author..."
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
                            <div className="rounded-lg overflow-hidden border border-gray-700">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-800/50 hover:bg-gray-800/50">
                                            <TableHead className="text-gray-300">Title</TableHead>
                                            <TableHead className="text-gray-300">Author</TableHead>
                                            <TableHead className="text-gray-300">Student Email</TableHead>
                                            <TableHead className="text-gray-300">Status</TableHead>
                                            <TableHead className="text-gray-300">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredBooks.map((book) => (
                                            <TableRow key={book.id} className="hover:bg-gray-800/30">
                                                <TableCell className="font-medium text-gray-200">{book.title}</TableCell>
                                                <TableCell className="text-gray-200">{book.author}</TableCell>
                                                <TableCell className="text-gray-200">{book.student}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            book.status === "approved"
                                                                ? "bg-green-600"
                                                                : book.status === "rejected"
                                                                    ? "bg-red-600"
                                                                    : "bg-yellow-600"
                                                        }
                                                    >
                                                        {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleApprove(book.id)}
                                                            disabled={book.status !== "pending"}
                                                            className={`border-gray-600 ${book.status === "pending" ? "hover:bg-green-600 hover:text-white" : "opacity-50 cursor-not-allowed"}`}
                                                        >
                                                            <Check className="mr-1 h-4 w-4" /> Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleReject(book.id)}
                                                            disabled={book.status !== "pending"}
                                                            className={`border-gray-600 ${book.status === "pending" ? "hover:bg-red-600 hover:text-white" : "opacity-50 cursor-not-allowed"}`}
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

