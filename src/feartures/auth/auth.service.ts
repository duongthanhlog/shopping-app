import { apiDummy } from '@/lib/axios'
import { LoginFormData, RegisterFormData } from './auth.types'
import { AddressFormType } from '../checkout/checkout.type'

export const getUser = async () => {
    try {
        const res = await apiDummy.get(`/api/auth/me`)
        return res.data
    } catch (error) {
        if (error.status === 401) return null
    }
}

export const login = async (data: LoginFormData) => {
    const res = await apiDummy.post('/api/auth/login', data)
    return res.data
}

export const register = async (data: RegisterFormData) => {
    const res = await apiDummy.post('/api/auth/register', data)
    return res.data
}

export const logout = async () => {
    const res = await apiDummy.post('/api/auth/logout')
    return res.data
}

export const createUserAddress = async (addressForm: AddressFormType) => {
    const res = await apiDummy.post('/api/auth/me', { addressForm })
    return res.data.data
}
