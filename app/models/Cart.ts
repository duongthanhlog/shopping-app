import { CartType } from '@/feartures/cart/type/cartItem.type'
import mongoose, { Schema } from 'mongoose'

const CartSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, required: true },
            thumbnail: String,
            title: String,
            price: Number,
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
})

CartSchema.index({ userId: 1, productId: 1 }, { unique: true })

const Cart = mongoose.models.Cart || mongoose.model<CartType>('Cart', CartSchema)
export default Cart
