import mongoose from 'mongoose'

interface ProductSType {
    id: String
    title: string
    slug: string
    description: string
    category: string
    brand: string
    price: number
    discountPercentage: number
    rating: number
    sold: number
    quantity: number
    minimumOrderQuantity: number
    thumbnail: string
    stock: number
    tags: string[]
    createdAt: string
}
const ProductSchema = new mongoose.Schema(
    {
        id: String,
        title: String,
        slug: String,
        description: String,
        category: String,
        brand: String,
        price: Number,
        discountPercentage: Number,
        rating: Number,
        sold: Number,
        quantity: Number,
        minimumOrderQuantity: Number,
        thumbnail: String,
        stock: Number,
        tags: Array,
        createdAt: String,
    },
    { timestamps: true }
)

const Product = mongoose.models.Product || mongoose.model<ProductSType>('Product', ProductSchema)

export default Product
