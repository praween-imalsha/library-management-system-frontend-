import apiClient from "./apiClient"
import type { Reader, ReaderData } from "../type/Reader"
import { AxiosError } from "axios"

const API_URL = "/reader"

export const getAllReaders = async (): Promise<Reader[]> => {
    try {
        const response = await apiClient.get(API_URL)
        return response.data
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error("Error fetching readers:", error.response?.data || error.message)
        } else {
            console.error("Unknown error fetching readers:", error)
        }
        throw error
    }
}

export const getReaderById = async (id: string): Promise<Reader> => {
    try {
        const response = await apiClient.get(`${API_URL}/${id}`)
        return response.data
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error("Error fetching reader:", error.response?.data || error.message)
        } else {
            console.error("Unknown error fetching reader:", error)
        }
        throw error
    }
}

export const addReader = async (readerData: ReaderData): Promise<Reader> => {
    try {
        console.log("Sending reader data:", readerData)
        const response = await apiClient.post(API_URL, readerData)
        return response.data
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error("Error adding reader:", error.response?.data || error.message)
            console.error("Status:", error.response?.status)
            console.error("Full error response:", error.response)
        } else {
            console.error("Unknown error adding reader:", error)
        }
        throw error
    }
}

export const updateReader = async (id: string, readerData: ReaderData): Promise<Reader> => {
    try {
        const response = await apiClient.put(`${API_URL}/${id}`, readerData)
        return response.data
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error("Error updating reader:", error.response?.data || error.message)
        } else {
            console.error("Unknown error updating reader:", error)
        }
        throw error
    }
}

export const deleteReader = async (id: string): Promise<void> => {
    try {
        await apiClient.delete(`${API_URL}/${id}`)
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error("Error deleting reader:", error.response?.data || error.message)
        } else {
            console.error("Unknown error deleting reader:", error)
        }
        throw error
    }
}
