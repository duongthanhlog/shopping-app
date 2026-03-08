import { connectDB } from '@/lib/mongodb'
import Product from 'app/models/Product'
import { NextResponse } from 'next/server'

export async function GET() {
    await connectDB()
    try {
        const categoriesArrStr = await Product.distinct('category')
        const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
        const categories = categoriesArrStr.map((category) => {
            return {
                name: capitalize(category),
                slug: category,
            }
        })
        return NextResponse.json(categories)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Failed to fetch categories' }, { status: 500 })
    }
}
