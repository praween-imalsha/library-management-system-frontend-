import apiClient from './apiClient'
import type {Lending, LendingData} from "../type/Lending.ts";



const API_BASE = '/lendings'


export const getAllLendings = async (): Promise<Lending[]> => {
    const response = await apiClient.get(`${API_BASE}`)
    return response.data.lendings
}


export const getLendingById = async (id: string): Promise<Lending> => {
    const response = await apiClient.get(`${API_BASE}/${id}`)
    return response.data.lending
}


export const lendBook = async (data: LendingData): Promise<Lending> => {
    const response = await apiClient.post(`${API_BASE}/lend`, data)
    return response.data.lending
}


export const returnBook = async (lendingId: string): Promise<{ message: string; lendingId: string }> => {
    const response = await apiClient.put(`${API_BASE}/return/${lendingId}`)
    return response.data
}
