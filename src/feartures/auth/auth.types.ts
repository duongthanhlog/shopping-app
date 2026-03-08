import { Product } from '../product/types/card.type'

export interface LoginFormData {
    email: string
    password: string
}

export interface RegisterFormData extends LoginFormData {
    confirmPassword: string
}

export interface User {
    id: string
    email: string
    name: string
    avatar: string
    addresses: Adresses[]
    role: string
    createdAt: string
}

export interface LoginResponse {
    token: string
}

export interface Adresses {
    id: string
    fullName: string
    phone: number
    street: string
    city: string
    isDefault: boolean
}
