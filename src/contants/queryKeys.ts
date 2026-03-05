import { FilterUrl } from '@/feartures/filter/hook/useFilter'

export const QUERY_KEYS = {
    PRODUCTS: ['products'] as const,
    PRODUCT: (id: string) => ['product', id] as const,
    PRODUCT_FILTERED: (filter: FilterUrl) => ['products', filter] as const,
    USER: ['user'] as const,
    CART: (userId: string) => ['cart', userId] as const,
}
