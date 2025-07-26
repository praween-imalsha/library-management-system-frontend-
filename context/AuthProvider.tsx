import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import apiClient, { setHeader } from "../services/apiClient"
import router from "../router"

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [accessToken, setAccessToken] = useState<string>("")
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)

    // Update axios default header when accessToken changes
    useEffect(() => {
        setHeader(accessToken)
        console.log("Access Token updated:", accessToken)
    }, [accessToken])

    // Try to refresh token on mount
    useEffect(() => {
        const tryRefresh = async () => {
            try {
                // Use GET for refresh-token if backend expects cookie-based auth
                const result = await apiClient.get("/auth/refresh-token")

                if (result.data?.accessToken) {
                    setAccessToken(result.data.accessToken)
                    setIsLoggedIn(true)

                    const currentPath = window.location.pathname
                    if (currentPath === "/" || currentPath === "/login" || currentPath === "/signup") {
                        router.navigate("/dashboard")
                    }
                } else {
                    throw new Error("No access token returned")
                }
            } catch (error) {
                setIsLoggedIn(false)
                setAccessToken("")
                console.log("Refresh token failed:", error)
            } finally {
                setIsAuthenticating(false)
                console.log("Authentication check finished")
            }
        }

        tryRefresh()
    }, [])

    const login = (token: string) => {
        setAccessToken(token)
        setIsLoggedIn(true)
    }

    const logout = () => {
        setIsLoggedIn(false)
        setAccessToken("")
        // Optionally clear cookies or notify backend here
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, isAuthenticating }}>
            {children}
        </AuthContext.Provider>
    )
}
