import mongoose from 'mongoose'

interface ProductSType {
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
        title: String,
        slug: String,
        description: String,
        category: String,
        brand: String,
        price: Number,
        discountPercentage: Number,
        shippingInformation: String,
        availabilityStatus: String,
        warrantyInformation: String,
        rating: Number,
        sold: Number,
        quantity: Number,
        minimumOrderQuantity: Number,
        thumbnail: String,
        stock: Number,
        tags: [String],
        reviews: [
            {
                rating: { type: Number },
                comment: { type: String },
                date: { type: Date },
                reviewerName: { type: String },
                reviewerEmail: { type: String },
            },
        ],
    },
    { timestamps: true }
)

const Product = mongoose.models.Product || mongoose.model<ProductSType>('Product', ProductSchema)

export default Product
