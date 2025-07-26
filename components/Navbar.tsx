import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "../services/authService"
import toast from "react-hot-toast"
import axios from "axios"
import { useAuth } from "../context/useAuth"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { isLoggedIn, logout: unauthenticate } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => navigate("/login")

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logout()
      toast.success("Logged out successfully 📚")
      unauthenticate()
      navigate("/login")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message)
      } else {
        toast.error("Something went wrong")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDashboard = () => navigate("/dashboard")

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
      <nav className='bg-gradient-to-r from-amber-50 via-rose-100 to-indigo-100 border-b border-indigo-200 shadow-md'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>

            {/* Logo / Title */}
            <div className='flex items-center'>
              <h1 className='text-2xl font-bold text-indigo-800'>📚 Book Club Library</h1>
            </div>

            {/* Desktop Menu */}
            <div className='hidden md:flex items-center space-x-4'>
              {!isLoggedIn && (
                  <button
                      onClick={handleLogin}
                      className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Login
                  </button>
              )}

              {isLoggedIn && (
                  <>
                    <button
                        onClick={handleDashboard}
                        className='bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium transition focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
                    >
                      Dashboard
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={handleLogout}
                        className='bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm font-medium transition focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                    >
                      {isLoading ? "Logging out..." : "Logout"}
                    </button>
                  </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden'>
              <button
                  onClick={toggleMenu}
                  className='text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400'
              >
                <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
              <div className='md:hidden px-2 pt-2 pb-4 space-y-2 border-t border-indigo-200'>
                {!isLoggedIn && (
                    <button
                        onClick={handleLogin}
                        className='block w-full text-left bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-base font-medium'
                    >
                      Login
                    </button>
                )}

                {isLoggedIn && (
                    <>
                      <button
                          onClick={handleDashboard}
                          className='block w-full text-left bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-base font-medium'
                      >
                        Dashboard
                      </button>
                      <button
                          disabled={isLoading}
                          onClick={handleLogout}
                          className='block w-full text-left bg-rose-600 hover:bg-rose-700 text-white px-3 py-2 rounded-md text-base font-medium'
                      >
                        {isLoading ? "Logging out..." : "Logout"}
                      </button>
                    </>
                )}
              </div>
          )}
        </div>
      </nav>
  )
}

export default Navbar
