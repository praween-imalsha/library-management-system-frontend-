import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import type {Book} from "../../type/Book.ts";


interface BooksTableProps {
    books: Book[];
    onEdit: (book: Book) => void;
    onDelete: (book: Book) => void;
}

const BooksTable: React.FC<BooksTableProps> = ({ books, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Genre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                {books.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                            No books found
                        </td>
                    </tr>
                ) : (
                    books.map((book) => (
                        <tr key={book._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book._id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.author}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.genre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => onEdit(book)}
                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-100 transition duration-150"
                                        aria-label={`Edit book ${book.title}`}
                                    >
                                        <MdEdit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(book)}
                                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100 transition duration-150"
                                        aria-label={`Delete book ${book.title}`}
                                    >
                                        <MdDelete className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default BooksTable;
