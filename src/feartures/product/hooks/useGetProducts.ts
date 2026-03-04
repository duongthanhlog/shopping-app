import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/product.card.service'
import useFilter from '@/feartures/filter/hook/useFilter'

export default function useGetProducts() {
    const { category, order, limit, skip, sortBy, page } = useFilter()

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['products', category, order, limit, skip, sortBy, page],
        queryFn: () =>
            getProducts({ category, order, limit, skip, sortBy, page }),
        refetchOnWindowFocus: false,
        staleTime: 0,
        placeholderData: keepPreviousData,
    })

    return { data, isLoading, isFetching }
}
