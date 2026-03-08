import { connectDB } from '@/lib/mongodb'
import User from 'app/models/User'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
    await connectDB()
    const body = await req.json()
    const user = await User.findOne({ email: body.email })
    if (!user) {
        return NextResponse.json({ message: 'Email không tồn tại' }, { status: 400 })
    }
    const isMatch = await bcrypt.compare(body.password, user?.password)

    try {
        if (!isMatch) {
            return NextResponse.json({ message: 'Mật khẩu không chính xác' }, { status: 400 })
        }
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '7d' })
        const cookieStore = await cookies()
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
        })

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ message: 'Đăng nhập thất bại' }, { status: 500 })
    }
}
