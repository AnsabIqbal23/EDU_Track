'use client'
import React, { useState, useEffect } from 'react'
import { BookList } from '@/components/ui/bookList'
import LibrarianSidebar from '@/components/librarian/sidebar'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Helper function to get the access token from session storage
const getToken = () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    return userData?.accessToken || ''
}

// Function to fetch books from the search API
async function fetchBooks(query) {
    const token = getToken()
    const response = await fetch(`http://localhost:8081/api/library/search?query=${query}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error('Failed to fetch books')
    }
    return await response.json()
}

export default function ViewBooksPage() {
    const [books, setBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const [statusFilter, setStatusFilter] = useState('all')

    // Function to fetch books based on the search term
    const fetchBooksWithStatus = async (query) => {
        setLoading(true)
        try {
            const data = await fetchBooks(query)
            const updatedBooks = data.map((book) => ({
                ...book,
                status: book.availabilityStatus === 'AVAILABLE'
                    ? 'Available'
                    : book.availabilityStatus === 'CHECKED_OUT'
                        ? 'Checked Out'
                        : book.availabilityStatus === 'RESERVED'
                            ? 'Reserved'
                            : 'Lost',
            }))
            setBooks(updatedBooks)
            setFilteredBooks(updatedBooks)
        } catch (error) {
            console.error('Error fetching books:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBooksWithStatus('')
    }, [])

    const handleRefresh = async () => {
        await fetchBooksWithStatus(searchTerm)
    }

    const filteredData = filteredBooks.filter(book => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || book.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="grid grid-cols-[auto_1fr]">
                <LibrarianSidebar />
                <main className="p-8">
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-1">Library Book Management</h1>
                    </header>

                    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                        <CardHeader className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4 flex-1">
                                    <div className="relative flex-1 max-w-md">
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
                                                <SelectValue placeholder="Filter by status"/>
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                <SelectItem value="all">All</SelectItem>
                                                <SelectItem value="Available">Available</SelectItem>
                                                <SelectItem value="Checked Out">Checked Out</SelectItem>
                                                <SelectItem value="Reserved">Reserved</SelectItem>
                                                <SelectItem value="Lost">Lost</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="border-gray-600 text-gray-300 hover:text-white"
                                        onClick={handleRefresh}
                                        disabled={loading}
                                    >
                                        <RefreshCw className="h-4 w-4 mr-2"/>
                                        Refresh
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            {/* Use BookList component here */}
                            <BookList books={filteredData} />
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
