import { CART_ACTION } from '@/feartures/product/constants/cartAction'
import { getUserIdFromToken } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Cart from 'app/models/Cart'
import User from 'app/models/User'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    await connectDB()
    const { productId, type, quantity } = await req.json()

    const userId = await getUserIdFromToken()
    const user = await User.findById(userId)
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    const existed = await Cart.findOne({ userId, productId })
    let nextQuantity = type === CART_ACTION.INCREASE ? (quantity ?? 1) : -1

    if (type === CART_ACTION.DECREASE && existed?.quantity === 1) {
        return NextResponse.json({ message: 'Không thể giảm thêm' })
    }

    if (!existed) {
        await Cart.create({
            userId,
            productId,
            quantity: quantity ?? 1,
        })
    } else {
        await Cart.findOneAndUpdate({ userId, productId }, { $inc: { quantity: nextQuantity } }, { new: true })
    }
    const cartItems = await Cart.find({ userId }).populate('productId')
    return NextResponse.json({ message: 'Đã lấy thành công giỏ hàng', data: cartItems })
}

export async function GET(req: Request) {
    await connectDB()
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload
    const userId = decoded.userId
    const cartItems = await Cart.find({ userId }).populate('productId').lean()

    return NextResponse.json({ data: cartItems }, { status: 200 })
}

export async function DELETE(req: Request) {
    await connectDB()
    const cookieStore = await cookies()
    const { productId } = await req.json()
    const token = cookieStore.get('token')?.value
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload
    const userId = decoded.userId

    const cartItems = await Cart.deleteOne({ userId, productId })

    return NextResponse.json({ message: 'Xóa thành công', data: cartItems })
}
