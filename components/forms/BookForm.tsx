import React, { useState, useEffect } from "react";
import type {Book, BookData} from "../../type/Book.ts";


interface BookFormProps {
    book?: Book | null;
    onSubmit: (bookData: BookData) => void;
}

interface FormErrors {
    title?: string;
    author?: string;
    genre?: string;
    quantity?: string;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit }) => {
    const [formData, setFormData] = useState<BookData>({
        title: "",
        author: "",
        genre: "",
        quantity: 1,
    });

    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                author: book.author,
                genre: book.genre,
                quantity: book.quantity,
            });
        } else {
            setFormData({
                title: "",
                author: "",
                genre: "",
                quantity: 1,
            });
        }
        setErrors({});
    }, [book]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.author.trim()) newErrors.author = "Author is required";
        if (!formData.genre.trim()) newErrors.genre = "Genre is required";
        if (!formData.quantity || formData.quantity < 1)
            newErrors.quantity = "Quantity must be at least 1";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "quantity" ? Number(value) : value,
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.title ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter book title"
                />
                {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
            </div>


            <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                </label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.author ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter author name"
                />
                {errors.author && <p className="text-sm text-red-600 mt-1">{errors.author}</p>}
            </div>


            <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                    Genre
                </label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.genre ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter genre"
                />
                {errors.genre && <p className="text-sm text-red-600 mt-1">{errors.genre}</p>}
            </div>


            <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                </label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.quantity ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter quantity"
                    min={1}
                />
                {errors.quantity && <p className="text-sm text-red-600 mt-1">{errors.quantity}</p>}
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition duration-200"
                >
                    {book ? "Update Book" : "Add Book"}
                </button>
            </div>
        </form>
    );
};

export default BookForm;
