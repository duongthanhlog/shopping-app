import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ORDER, SORTBY } from '../constant'
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
    const pathName = usePathname()
    const category = searchParams.get('category')
    const sortBy = searchParams.get('sortBy') || SORTBY.RATING
    const order = searchParams.get('order') || ORDER.DESC
    const limit = Number(searchParams.get('limit')) || 10
    const page = Number(searchParams.get('page')) || 1
    const skip = (page - 1) * limit

    const handleFilter = (category: string) => {
        if (category) {
            query.set('category', category)
            query.set('page', '1')
            query.set('skip', '0')
            router.push(`/products?${query.toString()}`)
        } else {
            removeFilter()
        }
    }

    const handleSortBy = (sortBy: string, order?: string) => {
        query.set('sortBy', sortBy)
        query.set('order', order)
        router.push(`/products?${query.toString()}`)
    }

    const removeFilter = () => {
        query.delete('sortBy')
        query.delete('order')
        query.delete('page')
        router.replace(`${pathName}?page=1`)
    }

    return {
        handleSortBy,
        handleFilter,
        removeFilter,
        category,
        order,
        limit,
        skip,
        page,
        sortBy,
    }
}
