import React from "react"

import {MdDelete, MdEdit, MdVisibility} from "react-icons/md";
import type {Lending} from "../../type/Lending.ts";


interface LendingTableProps {
    lendings: Lending[]
    onView: (lending: Lending) => void
    onEdit: (lending: Lending) => void
    onDelete: (lending: Lending) => void
}

const LendingTable: React.FC<LendingTableProps> = ({ lendings, onView, onEdit, onDelete }) => {
    const formatDate = (date: Date | string) => {
        const d = typeof date === "string" ? new Date(date) : date
        return d.toLocaleDateString()
    }

    const getStatusBadge = (status: Lending["status"]) => {
        const statusClasses = {
            borrowed: "bg-blue-100 text-blue-800",
            returned: "bg-green-100 text-green-800",
            overdue: "bg-red-100 text-red-800",
        }

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
        )
    }

    // Helper to safely get book title or ID string
    const getBookTitle = (book: string | { _id: string; title: string }) => {
        if (typeof book === "string") return book
        return book.title
    }

    // Helper to safely get reader name or ID string
    const getReaderName = (reader: string | { _id: string; name: string }) => {
        if (typeof reader === "string") return reader
        return reader.name
    }

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lending ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reader</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrow Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {lendings.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                            No lendings found
                        </td>
                    </tr>
                ) : (
                    lendings.map((lending) => (
                        <tr key={lending._id ?? Math.random()} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {lending._id ?? "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {getBookTitle(lending.book)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {getReaderName(lending.reader)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDate(lending.borrowDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDate(lending.dueDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(lending.status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => onView(lending)}
                                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-100 transition duration-150"
                                        title="View"
                                    >
                                        <MdVisibility className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onEdit(lending)}
                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-100 transition duration-150"
                                        title="Edit"
                                    >
                                        <MdEdit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(lending)}
                                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100 transition duration-150"
                                        title="Delete"
                                    >
                                        < MdDelete className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    )
}

export default LendingTable
