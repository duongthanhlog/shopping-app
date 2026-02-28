import { Card } from './card.type'

export type ActionType = 'increase' | 'decrease' | 'delete'

export type CartItemActions = {
    onDelete: (item: Card) => void
    onIncrease: (item: Card) => void
    onDecrease: (item: Card) => void
}

export type CartItemProps = {
    item: Card
    actions: CartItemActions
}
