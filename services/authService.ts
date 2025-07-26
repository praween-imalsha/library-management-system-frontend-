import type { User } from "../type/User"
import apiClient from "./apiClient"

export interface SignUpResponse {
    name: string
    email: string
    _id: string
}

export interface LoginResponse {
    name: string
    accessToken: string // add access token as well
    email: string
    _id: string
}

export interface LogoutResponse {
    message: string
}

export interface RefreshTokenResponse {
    accessToken: string
}

export const signUp = async (userData: User): Promise<SignUpResponse> => {
    const response = await apiClient.post("/auth/signup", userData)
    return response.data
}

export const login = async (loginData: Omit<User, "name">): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/login", loginData)
    return response.data
}

export const logout = async (): Promise<LogoutResponse> => {
    const response = await apiClient.post("/auth/logout")
    return response.data
}

// add refresh token
export const refreshToken = async (): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post("/auth/refresh-token")
    return response.data
}
