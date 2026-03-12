import { connectDB } from '@/lib/mongodb'
import Product from 'app/models/Product'
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
    const page = Number(searchParams.get('page')) || 1
    const ratingParam = searchParams.get('rating')
    let rating = ratingParam ? Number(ratingParam) : undefined
    const minPrice = Number(searchParams.get('minPrice')) || undefined
    const maxPrice = Number(searchParams.get('maxPrice')) || undefined
    const keyword = searchParams.get('search')
    const limit = keyword ? 10 : Math.min(Number(searchParams.get('limit')) || 15, 30)

    let query: any = {}
    const orderType = order === 'desc' ? -1 : 1
    const sortField = sortBy

    if (minPrice || maxPrice) {
        query.price = {}
        if (minPrice) {
            query.price.$gte = minPrice
        }

        if (maxPrice) {
            query.price.$lte = maxPrice
        }
    }
    if (keyword && keyword.trim() !== '') {
        query.$or = [
            {
                title: { $regex: keyword, $options: 'i' },
            },
            {
                description: { $regex: keyword, $options: 'i' },
            },
        ]
    }

    if (rating) {
        if (rating === 5) {
            query.rating = { $gte: 4.9 }
        } else {
            query.rating = { $gte: rating }
        }
    }
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
