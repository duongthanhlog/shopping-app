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

export async function POST(req: Request) {
    await connectDB()

    const { addressForm } = await req.json()
    const userId = await getUserIdFromToken()
    const user = await User.findByIdAndUpdate(
        userId,
        {
            $push: {
                addresses: {
                    ...addressForm,
                    fullName: addressForm.name,
                },
            },
        },
        { returnDocument: 'after' }
    )
    console.log(addressForm)

    return NextResponse.json({ message: 'Cập nhật địa chỉ thành công' })
}
