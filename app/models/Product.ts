import { ProductType } from '@/feartures/product/types/product.type'
import mongoose from 'mongoose'

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

const Product =
    mongoose.models.Product || mongoose.model<ProductType>('Product', ProductSchema)

export default Product
