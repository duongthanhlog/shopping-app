import { OrderType, SortByType } from './types'

export const SORTBY = {
    PRICE: 'price',
    BESTSELLER: 'minimumOrderQuantity',
    RATING: 'rating',
    CREATED_AT: 'createdAt',
    DISCOUNT: 'discountPercentage',
    CATEGORY: 'category',
} as const

export const ORDER = {
    ASC: 'asc',
    DESC: 'desc',
} as const

export const sortPriceSelections: {
    text: string
    order: OrderType
    sortBy: SortByType
}[] = [
    {
        text: 'Giá: Thấp đến Cao',
        sortBy: SORTBY.PRICE,
        order: ORDER.ASC,
    },
    {
        text: 'Giá: Cao đến Thấp',
        sortBy: SORTBY.PRICE,
        order: ORDER.DESC,
    },
]

export const sortOptions = [
    {
        label: 'Đánh giá cao',
        sortBy: SORTBY.RATING,
        order: ORDER.DESC,
    },
    {
        label: 'Giảm giá sâu',
        sortBy: SORTBY.DISCOUNT,
        order: ORDER.DESC,
    },
    {
        label: 'Bán chạy',
        sortBy: SORTBY.BESTSELLER,
        order: ORDER.DESC,
    },
]
