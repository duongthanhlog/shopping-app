import { getUserIdFromToken } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Checkout from 'app/models/Checkout'
import Product from 'app/models/Product'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    await connectDB()
    const { checkoutList } = await req.json()

    const userId = await getUserIdFromToken()
    if (!userId) {
        return NextResponse.json({ message: 'Chưa đăng nhập' })
    }
    const productsId = checkoutList.map(
        (item: { productId: string; quantity: number }) => item.productId
    )
    const products = await Product.find({ _id: { $in: productsId } })

    const checkoutItems = await Checkout.findOne({
        userId,
    })
    const map = new Map()
    checkoutList.map((item: { productId: string; quantity: number }) => {
        map.set(item.productId, item)
    })

    const checkoutProduct = products.map((product) => {
        const item = map.get(product._id.toString())
        return {
            productId: product._id,
            price: product.price,
            title: product.title,
            thumbnail: product.thumbnail,
            quantity: item.quantity || 0,
        }
    })

    if (!checkoutItems) {
        await Checkout.create({ userId, items: checkoutProduct })
    } else {
        await Checkout.updateOne({ userId }, { $set: { items: checkoutProduct } })
    }

    return NextResponse.json({
        message: 'Checkoutted',
    })
}

export async function GET(req: Request) {
    await connectDB()
    const userId = await getUserIdFromToken()
    const checkoutList = await Checkout.findOne({ userId })

    const shippingFee = 2
    const subTotal = checkoutList.items.reduce((acc, item) => {
        return acc + item.price * item.quantity
    }, 0)
    const totalPrice = shippingFee + subTotal

    return NextResponse.json({
        message: 'Lấy thành công sản phẩm',
        data: {
            checkoutList: checkoutList.items,
            subTotal,
            totalPrice,
            shippingFee,
        },
    })
}
