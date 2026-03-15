import { getUserIdFromToken } from '@/lib/auth'
import Checkout from 'app/models/Checkout'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { checkoutList } = await req.json()
    const userId = await getUserIdFromToken()
    if (!userId) {
        return NextResponse.json({ message: 'Chưa đăng nhập' })
    }
    await Checkout.findOneAndUpdate(
        { userId },
        { $set: { items: checkoutList } },
        { returnDocument: 'after', upsert: true }
    )
    const checkoutPreviewList = await Checkout.findOne({ userId }).populate(
        'items.productId'
    )
    return NextResponse.json({
        message: 'Up thành công sản phẩm',
        data: checkoutPreviewList,
    })
}

export async function GET(req: Request) {
    const userId = await getUserIdFromToken()
    const checkoutPreviewList = await Checkout.findOne({ userId }).populate(
        'items.productId'
    )
    return NextResponse.json({
        message: 'Lấy thành công sản phẩm',
        data: checkoutPreviewList,
    })
}
