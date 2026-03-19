export interface LoginFormData {
    email: string
    password: string
}

export interface RegisterFormData extends LoginFormData {
    confirmPassword: string
}

export interface User {
    _id: string
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
    _id: string
    fullName: string
    phone: number
    ward: string
    address: string
    district: string
    province: string
    isDefault: boolean
}
