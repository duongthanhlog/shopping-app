import { FilterUrl } from '@/feartures/filter/hook/useFilter'

export const QUERY_KEYS = {
    USER: ['user'] as const,
    PRODUCTS: ['products'] as const,
    CATEGORIES: ['categories'] as const,
    PRODUCT: (id: string) => ['product', id] as const,
    PRODUCT_FILTERED: (filter: FilterUrl) => ['products', filter] as const,
    CART: (userId: string) => ['cart', userId] as const,
    SEARCHSUGGEST: (keyword: string) => ['searchSuggest', keyword] as const,
    ORDER: (userId: string) => ['oder', userId] as const,
    CHECKOUT: ['checkout'] as const,
}
