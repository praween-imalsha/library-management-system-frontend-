import { useEffect, useState } from 'react'
import { getAllLendings, lendBook, returnBook } from '../services/lendingService'
import { getAllBooks } from '../services/bookService'
import { getAllReaders } from '../services/readerService'

import toast from 'react-hot-toast'
import type {Lending, LendingData} from "../type/Lending.ts";
import type {Reader} from "../type/Reader.ts";
import type {Book} from "../type/Book.ts";


const LendingPage = () => {
    const [lendings, setLendings] = useState<Lending[]>([])
    const [books, setBooks] = useState<Book[]>([])
    const [readers, setReaders] = useState<Reader[]>([])
    const [selectedBook, setSelectedBook] = useState('')
    const [selectedReader, setSelectedReader] = useState('')
    const [borrowDate, setBorrowDate] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAll()
    }, [])

    const fetchAll = async () => {
        setLoading(true)
        try {
            const [lendingData, bookData, readerData] = await Promise.all([
                getAllLendings(),
                getAllBooks(),
                getAllReaders()
            ])
            setLendings(lendingData)
            setBooks(bookData)
            setReaders(readerData)
        } catch (err) {
            toast.error('❌ Failed to load data')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleLend = async () => {
        if (!selectedBook || !selectedReader) {
            toast.error('Please select book and reader')
            return
        }

        const data: LendingData = {
            book: selectedBook,
            reader: selectedReader,
            borrowDate: new Date(borrowDate || new Date()),
            dueDate: new Date(dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)),
            status: 'borrowed'
        }

        try {
            const newLending = await lendBook(data)
            toast.success('✅ Book lent successfully!')
            setLendings((prev) => [newLending, ...prev])
            setSelectedBook('')
            setSelectedReader('')
            setBorrowDate('')
            setDueDate('')
        } catch (err) {
            toast.error('❌ Lending failed')
            console.error(err)
        }
    }

    const handleReturn = async (lendingId: string) => {
        try {
            await returnBook(lendingId)
            toast.success('✅ Book returned')
            fetchAll()
        } catch (err) {
            toast.error('❌ Return failed')
            console.error(err)
        }
    }

    const getBookTitle = (book: Lending['book']) =>
        typeof book === 'string' ? book : book.title

    const getReaderName = (reader: Lending['reader']) =>
        typeof reader === 'string' ? reader : reader.name

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">📚 Lending Management</h1>

            {/* Lend Book Form */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <h2 className="text-lg font-semibold mb-2">➕ Lend a Book</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Book</label>
                        <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} className="w-full p-2 border rounded">
                            <option value="">Select Book</option>
                            {books.map((book) => (
                                <option key={book._id} value={book._id}>{book.title}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Reader</label>
                        <select value={selectedReader} onChange={(e) => setSelectedReader(e.target.value)} className="w-full p-2 border rounded">
                            <option value="">Select Reader</option>
                            {readers.map((reader) => (
                                <option key={reader._id} value={reader._id}>{reader.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Borrow Date</label>
                        <input type="date" value={borrowDate} onChange={(e) => setBorrowDate(e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Due Date</label>
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                </div>
                <button
                    onClick={handleLend}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    📖 Lend Book
                </button>
            </div>

            {/* Lending Table */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-4">📄 Lending Records</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : lendings.length === 0 ? (
                    <p>No lendings available.</p>
                ) : (
                    <table className="w-full text-sm text-left border">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Book</th>
                            <th className="p-2 border">Reader</th>
                            <th className="p-2 border">Borrowed</th>
                            <th className="p-2 border">Due</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lendings.map((lending, idx) => (
                            <tr key={lending._id} className="border-t">
                                <td className="p-2 border">{idx + 1}</td>
                                <td className="p-2 border">{getBookTitle(lending.book)}</td>
                                <td className="p-2 border">{getReaderName(lending.reader)}</td>
                                <td className="p-2 border">{new Date(lending.borrowDate).toLocaleDateString()}</td>
                                <td className="p-2 border">{new Date(lending.dueDate).toLocaleDateString()}</td>
                                <td className="p-2 border">
                    <span className={`px-2 py-1 rounded text-white ${
                        lending.status === 'borrowed' ? 'bg-yellow-500' : 'bg-green-600'
                    }`}>
                      {lending.status}
                    </span>
                                </td>
                                <td className="p-2 border">
                                    {lending.status === 'borrowed' && (
                                        <button
                                            onClick={() => handleReturn(lending._id!)}
                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Return
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default LendingPage
