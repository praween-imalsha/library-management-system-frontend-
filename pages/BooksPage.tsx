import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import type {Book, BookData} from "../type/Book.ts";
import {addBook, deleteBook, getAllBooks, updateBook} from "../services/bookService.ts";
import BooksTable from "../components/tables/BooksTable.tsx";
import Dialog from "../components/Dialog.tsx";
import BookForm from "../components/forms/BookForm.tsx";



const BooksPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isBooksLoading, setIsBooksLoading] = useState(false);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const [selectedBook, setSelectedBook] = useState<Book | null>(null);


    const fetchAllBooks = async () => {
        try {
            setIsBooksLoading(true);
            const data = await getAllBooks();
            setBooks(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong while fetching books.");
            }
        } finally {
            setIsBooksLoading(false);
        }
    };

    useEffect(() => {
        fetchAllBooks();
    }, []);

    const handleAddBook = () => {
        setSelectedBook(null);
        setIsAddDialogOpen(true);
    };

    const handleEditBook = (book: Book) => {
        setSelectedBook(book);
        setIsEditDialogOpen(true);
    };

    // Handle Delete button clicked on a book row
    const handleDeleteBook = (book: Book) => {
        setSelectedBook(book);
        setIsDeleteDialogOpen(true);
    };

    // Handle Add or Update form submission
    const handleFormSubmit = async (bookData: BookData) => {
        if (selectedBook) {
            // Update
            try {
                const updated = await updateBook(selectedBook._id, bookData);
                setBooks((prev) =>
                    prev.map((b) => (b._id === selectedBook._id ? updated : b))
                );
                toast.success("Book updated successfully.");
                setIsEditDialogOpen(false);
            } catch (error) {
                toast.error(
                    axios.isAxiosError(error) ? error.message : "Update failed."
                );
            }
        } else {
            // Add
            try {
                const newBook = await addBook(bookData);
                setBooks((prev) => [...prev, newBook]);
                toast.success("Book added successfully.");
                setIsAddDialogOpen(false);
            } catch (error) {
                toast.error(axios.isAxiosError(error) ? error.message : "Add failed.");
            }
        }
        setSelectedBook(null);
    };

    // Confirm Delete action
    const confirmDelete = async () => {
        if (!selectedBook) return;
        try {
            await deleteBook(selectedBook._id);
            toast.success("Book deleted successfully.");
            setBooks((prev) => prev.filter((b) => b._id !== selectedBook._id));
        } catch (error) {
            toast.error(
                axios.isAxiosError(error) ? error.message : "Delete failed."
            );
        } finally {
            setIsDeleteDialogOpen(false);
            setSelectedBook(null);
        }
    };

    // Cancel all dialogs
    const cancelDialog = () => {
        setIsAddDialogOpen(false);
        setIsEditDialogOpen(false);
        setIsDeleteDialogOpen(false);
        setSelectedBook(null);
    };

    if (isBooksLoading)
        return (
            <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
                Loading books...
            </div>
        );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Books</h1>
                    <button
                        onClick={handleAddBook}
                        className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150"
                    >
                        <MdAdd className="w-5 h-5" />
                        <span>Add Book</span>
                    </button>
                </div>

                {/* Books Table */}
                <BooksTable books={books} onEdit={handleEditBook} onDelete={handleDeleteBook} />

                {/* Add Book Dialog */}
                <Dialog
                    isOpen={isAddDialogOpen}
                    onCancel={cancelDialog}
                    onConfirm={() => {
                        const form = document.querySelector("form") as HTMLFormElement;
                        if (form) form.requestSubmit();
                    }}
                    title="Add New Book"
                >
                    <BookForm onSubmit={handleFormSubmit} />
                </Dialog>

                <Dialog
                    isOpen={isEditDialogOpen}
                    onCancel={cancelDialog}
                    onConfirm={() => {
                        const form = document.querySelector("form") as HTMLFormElement;
                        if (form) form.requestSubmit();
                    }}
                    title="Edit Book"
                >
                    <BookForm book={selectedBook} onSubmit={handleFormSubmit} />
                </Dialog>


                <Dialog
                    isOpen={isDeleteDialogOpen}
                    onCancel={cancelDialog}
                    onConfirm={confirmDelete}
                    title="Delete Book"
                >
                    <p className="text-gray-700">
                        Are you sure you want to delete <strong>{selectedBook?.title}</strong>? This action cannot be undone.
                    </p>
                </Dialog>
            </div>
        </div>
    );
};

export default BooksPage;
