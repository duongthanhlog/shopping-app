import { apiDummy } from '@/lib/axios'
import { connectDB } from '@/lib/mongodb'
import Product from 'app/models/Product'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        await connectDB()
        const products = await Product.find()
        const total = await Product.countDocuments()
        return NextResponse.json({ products, total })
    } catch (error) {
        return NextResponse.json({ error: 'Error creating product' }, { status: 500 })
    }
}
