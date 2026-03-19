import { CART_ACTION } from '@/feartures/cart/constants/cartAction'
import { CartItemType } from '@/feartures/cart/type/cartItem.type'
import { getUserIdFromToken } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Cart from 'app/models/Cart'
import Product from 'app/models/Product'
import User from 'app/models/User'
import { Types } from 'mongoose'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    await connectDB()
    const { productId, delta } = await req.json()

    // const productId = product.productId || product._id
    // const nextQuantity = type === CART_ACTION.INCREASE ? (quantity ?? 1) : -1

    const userId = await getUserIdFromToken()
    const user = await User.findById(userId)
    const product = await Product.findById(productId)
    const userCart = await Cart.findOne({ userId })
    const existingItem = await Cart.findOne({
        userId,
        'items.productId': productId,
    })
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!userCart) {
        await Cart.create({
            userId,
            items: [
                {
                    productId,
                    thumbnail: product.thumbnail,
                    title: product.title,
                    price: product.price,
                    quantity: delta,
                    selected: false,
                },
            ],
        })
    } else if (existingItem) {
        await Cart.updateOne(
            { userId, 'items.productId': productId },
            {
                $inc: { 'items.$.quantity': delta ?? 1 },
            }
        )
    } else {
        await Cart.updateOne(
            { userId },
            {
                $push: {
                    items: {
                        productId,
                        thumbnail: product.thumbnail,
                        title: product.title,
                        price: product.price,
                        quantity: delta ?? 1,
                        selected: false,
                    },
                },
            }
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
