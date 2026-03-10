import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/products.service'
import useFilter from '@/feartures/filter/hook/useFilter'
import { QUERY_KEYS } from '@/contants/queryKeys'

export default function useGetProducts() {
    const { category, sortBy, order, limit, page } = useFilter()
    const filter = {
        category,
        sortBy,
        order,
        limit,
        page,
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
