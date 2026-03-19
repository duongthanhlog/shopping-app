import mongoose from 'mongoose'

interface User {
    email: string
    password: string
    name: string
    avatar: string
    addresses: Adresses[]
    role: string
    createdAt: string
}

export interface Adresses {
    _id: string
    fullName: string
    phone: number
    province: string
    district: string
    ward: string
    address: String
    isDefault: boolean
}

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        addresses: [
            {
                fullName: String,
                phone: String,
                province: String,
                address: String,
                district: String,
                ward: String,
                isDefault: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        role: {
            type: String,
            default: 'user',
        },
        createdAt: Date,
        name: String,
        avatar: String,
    },
    { timestamps: true }
)

const User = mongoose.models.User || mongoose.model<User>('User', UserSchema)
export default User
