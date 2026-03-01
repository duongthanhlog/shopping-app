import { SortWith } from './types'

export const sort = {
    NEWEST: 'newest',
    OLDER: 'older',
    BEST_SELLER: 'bestSeller',
    LOW_PRICE_HIGH: 'low-price-high',
    HIGH_PRICE_LOW: 'high-price-low',
} as const

export const sortPriceSelections: {
    text: string
    value: SortWith
}[] = [
    {
        text: 'Giá: Thấp đến Cao',
        value: sort.LOW_PRICE_HIGH,
    },
    {
        text: 'Giá: Cao đến Thấp',
        value: sort.HIGH_PRICE_LOW,
    },
]
