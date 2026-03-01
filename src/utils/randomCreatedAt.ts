import { Card } from '@/feartures/product/types/card.type'

export const randomCreatedAt = (product: Card) => {
    return new Date(
        Date.now() - Math.random() * 10000000000 //dummyjson createdAt is a same date so I have to fake time here
    ).toISOString()
}
