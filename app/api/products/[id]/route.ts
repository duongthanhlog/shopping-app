import { connectDB } from '@/lib/mongodb'
import Product from 'app/models/Product'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB()
    const { id } = await params

    try {
        const productDetail = await Product.findById(id)
        if (!productDetail) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 })
        }
        return NextResponse.json(productDetail)
    } catch (error) {
        return NextResponse.json('Lấy sản phẩm thất bại')
    }
}
