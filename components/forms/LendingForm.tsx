import React, { useState, useEffect } from "react"
import type {Lending} from "../../type/Lending.ts";
import type {Reader} from "../../type/Reader.ts";
import type {Book} from "../../type/Book.ts";

interface LendingFormProps {
    lending?: Lending | null
    readers: Reader[]
    books: Book[]
    onSubmit: (lendingData: Omit<Lending, "_id" | "createdAt" | "updatedAt">) => void
}

interface FormErrors {
    reader?: string
    book?: string
    dueDate?: string
}

const LendingForm: React.FC<LendingFormProps> = ({ lending, readers, books, onSubmit }) => {
    const [selectedReaderId, setSelectedReaderId] = useState<string>("")
    const [selectedBookId, setSelectedBookId] = useState<string>("")
    const [dueDate, setDueDate] = useState<string>("")
    const [status, setStatus] = useState<Lending["status"]>("borrowed")
    const [errors, setErrors] = useState<FormErrors>({})

    useEffect(() => {
        if (lending) {
            setSelectedReaderId(
                typeof lending.reader === "string" ? lending.reader : lending.reader._id
            )
            setSelectedBookId(
                typeof lending.book === "string" ? lending.book : lending.book._id
            )
            setDueDate(new Date(lending.dueDate).toISOString().slice(0, 10))
            setStatus(lending.status)
        } else {
            setSelectedReaderId("")
            setSelectedBookId("")
            setDueDate("")
            setStatus("borrowed")
        }
        setErrors({})
    }, [lending])

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!selectedReaderId) newErrors.reader = "Please select a reader"
        if (!selectedBookId) newErrors.book = "Please select a book"
        if (!dueDate) newErrors.dueDate = "Please select a due date"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit({
                reader: selectedReaderId,
                book: selectedBookId,
                dueDate: new Date(dueDate),
                status,
                borrowDate: lending?.borrowDate || new Date(),
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Reader selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reader</label>
                <select
                    value={selectedReaderId}
                    onChange={(e) => {
                        setSelectedReaderId(e.target.value)
                        if (errors.reader) setErrors((prev) => ({ ...prev, reader: undefined }))
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.reader ? "border-red-300" : "border-gray-300"
                    }`}
                >
                    <option value="">Select a reader</option>
                    {readers.map((reader) => (
                        <option key={reader._id} value={reader._id}>
                            {reader.name} ({reader.membershipId})
                        </option>
                    ))}
                </select>
                {errors.reader && <p className="text-sm text-red-600 mt-1">{errors.reader}</p>}
            </div>

            {/* Book selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
                <select
                    value={selectedBookId}
                    onChange={(e) => {
                        setSelectedBookId(e.target.value)
                        if (errors.book) setErrors((prev) => ({ ...prev, book: undefined }))
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.book ? "border-red-300" : "border-gray-300"
                    }`}
                >
                    <option value="">Select a book</option>
                    {books.map((book) => (
                        <option key={book._id} value={book._id}>
                            {book.title}
                        </option>
                    ))}
                </select>
                {errors.book && <p className="text-sm text-red-600 mt-1">{errors.book}</p>}
            </div>

            {/* Due date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => {
                        setDueDate(e.target.value)
                        if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: undefined }))
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.dueDate ? "border-red-300" : "border-gray-300"
                    }`}
                />
                {errors.dueDate && <p className="text-sm text-red-600 mt-1">{errors.dueDate}</p>}
            </div>

            {/* Status (edit only) */}
            {lending && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as Lending["status"])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    >
                        <option value="borrowed">Borrowed</option>
                        <option value="returned">Returned</option>
                        <option value="overdue">Overdue</option>
                    </select>
                </div>
            )}

            {/* Submit */}
            <div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition duration-200"
                >
                    {lending ? "Update Lending" : "Create Lending"}
                </button>
            </div>
        </form>
    )
}

export default LendingForm
