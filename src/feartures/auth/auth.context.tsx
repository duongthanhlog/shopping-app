'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { LoginResponse } from './auth.types'
import { RootLayoutProps } from '../../../app/layout'
import { getUserIdByToken } from '../../lib/token'
import { useToast } from '../toast/toast.context'

interface AuthContextType {
    login: (data: LoginResponse) => Promise<void>
    logout: () => void
    loading: boolean
    userId: string
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: RootLayoutProps) {
    const [userId, setUserId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const { showToast } = useToast()
    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (!storedToken) {
            setLoading(false)
            return
        }

        const userId = getUserIdByToken(storedToken)
        setUserId(userId)
        setLoading(false)
    }, [])

    const login = async (data: LoginResponse) => {
        localStorage.setItem('token', data.token)
        const userId = getUserIdByToken(data.token)
        setUserId(userId)
    }
    const logout = () => {
        localStorage.removeItem('token')
        setUserId(null)
        showToast('success', 'Đã đăng xuất')
    }
    return (
        <AuthContext value={{ userId, login, logout, loading }}>
            {children}
        </AuthContext>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
