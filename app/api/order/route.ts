import { CartItemType } from '@/feartures/cart/type/cartItem.type'
import { getUserIdFromToken } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import { formatCurrency } from '@/utils/formatCurrency'
import Order from 'app/models/Order'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    await connectDB()
    const userId = await getUserIdFromToken()
    const { productList } = await req.json()
    const shippingFee = 2
    const calculateTotal = productList.reduce(
        (total: number, item: CartItemType) => total + item.price * item.quantity,
        0
    )
    const totalPrice = calculateTotal + shippingFee
    const order = await Order.findOneAndUpdate(
        { userId },
        { items: productList, totalPrice, shippingFee },
        { returnDocument: 'after', upsert: true }
    )
    return NextResponse.json({ message: 'order thành công', data: order })
}

export async function GET(req: Request) {
    await connectDB()
    const userId = await getUserIdFromToken()
    const order = await Order.findOne({ userId })

    return NextResponse.json({ message: 'lấy order thành công', data: order })
}
