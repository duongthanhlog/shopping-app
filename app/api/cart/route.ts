import { CART_ACTION } from '@/feartures/cart/constants/cartAction'
import { CartItemType } from '@/feartures/cart/type/cartItem.type'
import { getUserIdFromToken } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Cart from 'app/models/Cart'
import User from 'app/models/User'
import { Types } from 'mongoose'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    await connectDB()
    const { product, type, quantity } = await req.json()

    const productId = product.productId || product._id
    const nextQuantity = type === CART_ACTION.INCREASE ? (quantity ?? 1) : -1

    const userId = await getUserIdFromToken()
    const user = await User.findById(userId)
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const updated = await Cart.updateOne(
        { userId, 'items.productId': productId },
        { $inc: { 'items.$.quantity': nextQuantity } }
    )

    if (updated.matchedCount === 0 && type === CART_ACTION.INCREASE) {
        await Cart.updateOne(
            { userId },
            {
                $push: {
                    items: {
                        productId,
                        thumbnail: product.thumbnail,
                        title: product.title,
                        price: product.price,
                        quantity: nextQuantity,
                    },
                },
            },
            { upsert: true }
        )
    }
    await Cart.updateOne(
        { userId },
        {
            $pull: { items: { quantity: { $lte: 0 } } },
        }
    )

    const cart = await Cart.findOne({ userId })

    return NextResponse.json({ data: cart.items || [] })
}

export async function GET(req: Request) {
    await connectDB()
    const userId = await getUserIdFromToken()
    const cart = await Cart.findOne({ userId })

    return NextResponse.json({ data: cart.items || [] }, { status: 200 })
}

export async function DELETE(req: Request) {
    await connectDB()
    const { productId } = await req.json()

    const userId = await getUserIdFromToken()
    await Cart.updateOne(
        { userId },
        {
            $pull: { items: { productId: new Types.ObjectId(productId) } },
        }
    )
    return NextResponse.json({
        message: 'Xóa thành công',
    })
}
