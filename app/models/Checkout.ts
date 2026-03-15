import mongoose, { Schema } from 'mongoose'

type CheckoutSType = {
    userId: String
    items: {
        productId: string
        quantity: number
    }
}

const CheckoutSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
})

const Checkout =
    mongoose.models.Checkout || mongoose.model<CheckoutSType>('Checkout', CheckoutSchema)
export default Checkout
