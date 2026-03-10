import { Product } from '@/feartures/product/types/product.type'

export type ActionType = 'increase' | 'decrease' | 'delete'

export interface CartItemType {
    _id: string
    userId: string
    productId: Product
    quantity: number
}

export type CartItemProps = {
    item: CartItemType
    className: string
    onDecrease: (productId: string) => void
    onIncrease: (productId: string, quantity?: number) => void
    onDelete: (productId: string) => void
}
