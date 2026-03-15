import mongoose, { Schema } from 'mongoose'
import { title } from 'process'
export type OrderItem = {
    productId: string
    quantity: number
    price: number
    product_name: string
    product_image: string
}
export type Order = {
    userId: string
    items: OrderItem[]
    totalPrice: number
    shippingFee: number
    paymentMethod: 'COD' | 'BANKING'
    status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'
    address: string
    phone: string
    createdAt: string
    updatedAt: string
}
const OrderSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                },
                quantity: Number,
                price: Number,
                title: String,
                thumbnail: String,
            },
        ],
        totalPrice: Number,
        shippingFee: {
            type: Number,
            default: 0,
        },
        paymentMethod: {
            type: String,
            enum: ['COD', 'BANKING'],
            default: 'COD',
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'],
            default: 'pending',
        },
        address: String,
        phone: String,
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.models.Order || mongoose.model<Order>('Order', OrderSchema)

export default Order
