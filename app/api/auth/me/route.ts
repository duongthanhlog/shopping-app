import { connectDB } from '@/lib/mongodb'
import { NextResponse } from 'next/server'
import User from 'app/models/User'
import { getUserIdFromToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'
export async function GET() {
    await connectDB()
    try {
        const userId = await getUserIdFromToken()
        const user = await User.findById(userId).select('-password')
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ message: 'invalid token' }, { status: 401 })
    }
}
