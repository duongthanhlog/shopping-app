import { api } from '@/lib/axios'
import { LoginFormData, RegisterFormData } from './auth.types'

export const getUserById = async (userId: string) => {
    const res = await api.get(`/users/${userId}`)
    return res.data
}

export const login = async (data: LoginFormData) => {
    const res = await api.get('/users', { params: { email: data.email } })
    const user = res.data[0]

    if (!user || user.password !== data.password) {
        throw new Error('Tài khoản hoặc mật khẩu không đúng')
    }
    return { token: `long-token-${user.id}` }
}

export const register = async (data: RegisterFormData) => {
    const res = await api.get('/users', { params: { email: data.email } })
    const { confirmPassword, ...rest } = data

    const newUser = {
        ...rest,
        name: '',
        avatar: '',
        phone: '',
        addresses: [],
        cart: [],
        wishlist: [],
        orders: [],
        role: 'user',
        createdAt: new Date().toISOString(),
    }
    if (res.data.length > 0) {
        throw new Error('Email đã được sử dụng')
    }
    return api.post('/users', newUser)
}
