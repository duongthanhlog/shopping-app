import { ProductType } from '../product/types/product.type'

export type CheckoutType = {
    _id: string
    productId: ProductType
    quantity: number
    thumbnail: string
    title: string
    price: number
}
