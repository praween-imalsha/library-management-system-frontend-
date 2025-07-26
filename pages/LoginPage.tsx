import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../services/authService"
import toast from "react-hot-toast"
import axios from "axios"
import { useAuth } from "../context/useAuth"

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login: authenticate } = useAuth()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    try {
      const user = await login(formData)
      toast.success(`Welcome back, ${user.name}! 📚`)
      authenticate(user.accessToken)
      navigate("/dashboard")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed")
      } else {
        toast.error("Something went wrong")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-pink-100 px-4'>
        <div className='max-w-md w-full bg-white rounded-xl shadow-xl p-8 space-y-6'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-indigo-800'>📖 Book Club Login</h1>
            <p className='text-sm text-gray-500 mt-1'>Access your library dashboard</p>
          </div>

          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
              <input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='you@example.com'
                  className={`mt-1 w-full px-3 py-2 border ${
                      errors.email ? "border-red-400" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              />
              {errors.email && <p className='text-sm text-red-600'>{errors.email}</p>}
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
              <input
                  id='password'
                  name='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='••••••••'
                  className={`mt-1 w-full px-3 py-2 border ${
                      errors.password ? "border-red-400" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              />
              {errors.password && <p className='text-sm text-red-600'>{errors.password}</p>}
            </div>

            <button
                disabled={isLoading}
                type='submit'
                className='w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition duration-150'
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className='text-center text-sm text-gray-600'>
            Don’t have an account?{" "}
            <Link
                to='/signup'
                className='text-indigo-600 font-medium hover:underline'
            >
              Sign up now
            </Link>
          </div>
        </div>
      </div>
  )
}

export default Login
