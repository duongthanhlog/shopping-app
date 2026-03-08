import { Product } from './card.type'

export type ActionType = 'increase' | 'decrease' | 'delete'

export interface CartType {
    _id: string
    userId: string
    productId: Product
    quantity: number
}

export type CartItemProps = {
    item: CartType
    className: string
    onDecrease: (productId: string) => void
    onIncrease: (productId: string, quantity?: number) => void
    onDelete: (productId: string) => void
}
