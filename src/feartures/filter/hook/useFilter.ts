import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SORTBY } from '../constant'
import { parseCurrencyToApi } from '@/utils/formatCurrency'

export type FilterUrl = {
    page?: number
    category?: string
    sortBy?: string
    order?: string
    limit?: number
    skip?: number
    minPrice?: number
    maxPrice?: number
    rating?: number
    search?: string
}
export default function useFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = new URLSearchParams(searchParams.toString())

    const category = query.get(SORTBY.CATEGORY)
    const order = query.get('order')
    const sortBy = query.get('sortBy')
    const page = Number(query.get('page')) || 1
    const limit = Number(query.get('limit')) || 15
    const rating = Number(query.get('rating'))
    const minPrice = Number(query.get('minPrice'))
    const maxPrice = Number(query.get('maxPrice'))
    const search = query.get('search')
    const pathname = usePathname()

    const handleFilter = (category: string) => {
        if (category) {
            query.set(SORTBY.CATEGORY, category)
            query.set('page', '1')
        } else {
            query.delete(SORTBY.CATEGORY)
        }
        router.push(`/products?${query.toString()}`)
    }

    const handleSortBy = (sortBy: string, order: string) => {
        query.set('sortBy', sortBy)
        query.set('order', order)
        router.push(`/products?${query.toString()}`)
    }

    const handleGetRating = (rating: number) => {
        query.set('rating', rating.toString())
        router.push(`/products?${query.toString()}`)
    }

    const handleFilterPrice = (minPrice: string, maxPrice: string) => {
        query.set('minPrice', parseCurrencyToApi(minPrice).toString())
        query.set('maxPrice', parseCurrencyToApi(maxPrice).toString())
        router.push(`/products?${query.toString()}`)
    }

    const handleResetFilter = () => {
        router.replace(`/products`)
    }

    const handleSearch = (text: string) => {
        if (pathname === '/products') {
            query.set('search', text)
            router.push(`/products?${query.toString()}`)
        }
    }
    return {
        search,
        minPrice,
        maxPrice,
        handleSearch,
        handleFilterPrice,
        handleGetRating,
        handleFilter,
        handleResetFilter,
        handleSortBy,
        category,
        page,
        limit,
        sortBy,
        order,
        rating,
    }
}
