import { CartType } from '@/feartures/product/types/cart.type'
import mongoose, { Schema } from 'mongoose'

const CartSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        default: 1,
    },
})

CartSchema.index({ userId: 1, productId: 1 }, { unique: true })

const Cart = mongoose.models.Cart || mongoose.model<CartType>('Cart', CartSchema)
export default Cart
