import { Card } from './card.type'

export type ActionType = 'increase' | 'decrease' | 'delete'

export type CartItemProps = {
    item: Card
    className: string
    onDecrease: (item: Card) => void
    onIncrease: (item: Card, quantity?: number) => void
    onDelete: (item: Card) => void
}
