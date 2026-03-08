import { connectDB } from '@/lib/mongodb'
import Product from 'app/models/Product'
import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    await connectDB()
    if (process.env.NODE_ENV !== 'production') {
        await Product.syncIndexes()
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const sortBy = searchParams.get('sortBy')
    const order = searchParams.get('order')
    const limit = Math.min(Number(searchParams.get('limit')) || 15, 30)
    const page = Number(searchParams.get('page')) || 1

    let query: any = {}
    const orderType = order === 'desc' ? -1 : 1
    const sortField = sortBy || 'createdAt'

    if (category) query.category = category
    try {
        const total = await Product.countDocuments(query)
        const totalPages = Math.ceil(total / limit) || 1
        const currentPage = Math.min(page, totalPages)
        const skip = (currentPage - 1) * limit

        const products = await Product.find(query)
            .sort({
                [sortField]: orderType,
            })
            .limit(limit)
            .skip(skip)

        return NextResponse.json({ products, totalPages, currentPage })
    } catch (error) {
        console.log(error)

        return NextResponse.json({ error: 'Error creating product' }, { status: 500 })
    }
}
