import apiClient from "./apiClient"
import type {Book, BookData} from "../type/Book.ts";


export const getAllBooks = async (): Promise<Book[]> => {
    const response = await apiClient.get("/Books")
    return response.data
}


export const getBookById = async (_id: string): Promise<Book> => {
    const response = await apiClient.get(`/Books/${_id}`)
    return response.data
}


export const addBook = async (bookData: BookData): Promise<Book> => {
    const response = await apiClient.post("/Books", bookData)
    return response.data
}


export const updateBook = async (_id: string, bookData: BookData): Promise<Book> => {
    const response = await apiClient.put(`/Books/${_id}`, bookData)
    return response.data
}


export const deleteBook = async (_id: string): Promise<void> => {
    await apiClient.delete(`/Books/${_id}`)
}
