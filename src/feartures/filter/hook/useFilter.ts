import { useRouter, useSearchParams } from 'next/navigation'

export type FilterUrl = {
    category?: string
    sortBy?: string
    order?: string
    limit?: number
    skip?: number
}
export default function useFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = new URLSearchParams(searchParams.toString())

    const category = query.get('category')
    const order = query.get('order')
    const sortBy = query.get('sortBy')
    const page = Number(query.get('page')) || 1
    const limit = Number(query.get('limit')) || 15

    const handleFilter = (category: string) => {
        if (category) {
            query.set('category', category)
            query.set('page', '1')
        } else {
            query.delete('category')
        }
        router.push(`/products?${query.toString()}`)
    }

    const handleSortBy = (sortBy: string, order: string) => {
        query.set('sortBy', sortBy)
        query.set('order', order)
        router.push(`/products?${query.toString()}`)
    }

    return {
        handleFilter,
        handleSortBy,
        category,
        page,
        limit,
        sortBy,
        order,
    }
}
