import { ProductType } from '../product/types/product.type'

export type CheckoutType = {
    _id: string
    productId: ProductType
    quantity: number
    thumbnail: string
    title: string
    price: number
}

export type AddressFormType = {
    _id?: string
    name: string
    phone: string
    address: string
    type: 'home' | 'office'
    province: string
    district: string
    ward: string
}

export type AddressCheckoutType = {
    _id: string
} & AddressFormType
