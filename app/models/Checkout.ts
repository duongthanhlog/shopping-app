import mongoose, { Schema } from 'mongoose'

type CheckoutItem = {
    productId: string
    price: number
    quantity: number
    title: string
    thumbnail: string
}
type Checkout = {
    userId: string
    items: CheckoutItem[]
    totalPrice: number
}

const CheckoutSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, required: true },
            price: Number,
            title: String,
            thumbnail: String,
            quantity: Number,
        },
    ],
    totalPrice: Number,
})

const Checkout =
    mongoose.models.Checkout || mongoose.model<Checkout>('Checkout', CheckoutSchema)
export default Checkout
