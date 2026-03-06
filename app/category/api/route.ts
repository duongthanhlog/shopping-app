import { connectDB } from '@/lib/mongodb'
import Product from 'app/models/Product'
import { NextResponse } from 'next/server'

export async function GET() {
    await connectDB()
    const categories = await Product.distinct('category')

    return NextResponse.json(categories)
}
