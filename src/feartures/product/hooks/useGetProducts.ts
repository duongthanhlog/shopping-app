import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/products.service'
import useFilter, { FilterUrl } from '@/feartures/filter/hook/useFilter'
import { QUERY_KEYS } from '@/contants/queryKeys'

export default function useGetProducts() {
    const { category, sortBy, order, limit, page, rating, minPrice, maxPrice, search } =
        useFilter()
    const filter: FilterUrl = {
        category,
        sortBy,
        order,
        limit,
        page,
        rating,
        minPrice,
        maxPrice,
        search,
    }
    const { data, isLoading, isFetching } = useQuery({
        queryKey: QUERY_KEYS.PRODUCT_FILTERED(filter),
        queryFn: () => getProducts(filter),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        placeholderData: keepPreviousData,
    })

    return { data, isLoading, isFetching }
}
