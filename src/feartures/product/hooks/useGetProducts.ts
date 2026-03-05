import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/product.card.service'
import useFilter from '@/feartures/filter/hook/useFilter'
import { QUERY_KEYS } from '@/contants/queryKeys'

export default function useGetProducts() {
    const { category, order, limit, skip, sortBy, page } = useFilter()
    const filter = {
        category,
        order,
        limit,
        skip,
        sortBy,
        page,
    }
    const { data, isLoading, isFetching } = useQuery({
        queryKey: QUERY_KEYS.PRODUCT_FILTERED(filter),
        queryFn: () => getProducts({ category, order, limit, skip, sortBy, page }),
        refetchOnWindowFocus: false,
        staleTime: 0,
        placeholderData: keepPreviousData,
    })

    return { data, isLoading, isFetching }
}
