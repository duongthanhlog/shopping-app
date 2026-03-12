export type ActionType = 'increase' | 'decrease' | 'delete'

export interface CartItemType {
    productId: string
    quantity: number
    thumbnail: string
    title: string
    price: number
}

export type CartType = {
    userId: string
    items: CartItemType[]
}
