import { SortWith } from '@/feartures/filter/types'
import { Card } from '@/feartures/product/types/card.type'

export const sortProducts = (products: Card[], SortWith: SortWith) => {
    switch (SortWith) {
        case 'newest':
            return [...products].sort((a, b) => {
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
            })
        case 'older':
            return [...products].sort((a, b) => {
                return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )
            })
        case 'bestSeller':
            return [...products].sort(
                (a, b) => b.minimumOrderQuantity - a.minimumOrderQuantity
            )
        case 'high-price-low':
            return [...products].sort((a, b) => b.price - a.price)
        case 'low-price-high':
            return [...products].sort((a, b) => a.price - b.price)
        default:
            return products
    }
}
