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
    id: string
    fullName: string
    phone: number
    street: string
    city: string
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
                phone: Number,
                street: String,
                city: String,
                isDefault: Boolean,
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
