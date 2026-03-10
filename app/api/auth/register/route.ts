import { connectDB } from '@/lib/mongodb'
import User from 'app/models/User'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    await connectDB()
    try {
        const cookieStore = await cookies()
        const body = await req.json()

        const existingUser = await User.findOne({ email: body.email })
        if (existingUser) {
            return NextResponse.json({ message: 'Email đã tồn tại' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(body.password, 10)

        const user = await User.create({
            email: body.email,
            password: hashedPassword,
        })

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
            expiresIn: '7d',
        })

        cookieStore.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
        })

        return Response.json({ user, token })
    } catch (error) {
        return Response.json({ message: 'Đăng ký thất bại' }, { status: 500 })
    }
}

export async function GET() {
    return Response.json({ message: 'register api' })
}
