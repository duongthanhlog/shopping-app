import { OrderType, SortByType } from './types'

export const SORTBY = {
    PRICE: 'price',
    BESTSELLER: 'minimumOrderQuantity',
    RATING: 'rating',
    CREATED_AT: 'createdAt',
} as const

export const ORDER = {
    ASC: 'asc',
    DESC: 'desc',
} as const

export const sortPriceSelections: {
    text: string
    value: OrderType
    sortBy: SortByType
}[] = [
    {
        text: 'Giá: Thấp đến Cao',
        sortBy: SORTBY.PRICE,
        value: ORDER.ASC,
    },
    {
        text: 'Giá: Cao đến Thấp',
        sortBy: SORTBY.PRICE,
        value: ORDER.DESC,
    },
]
