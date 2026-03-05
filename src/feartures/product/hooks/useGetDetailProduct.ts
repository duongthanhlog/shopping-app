'use client'
import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../services/product.details.service'
import { QUERY_KEYS } from '@/contants/queryKeys'

export default function useGetDetailProduct(id: string) {
    const {
        data: card,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: QUERY_KEYS.PRODUCT(id),
        queryFn: () => getProductById(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
    })

    return { card, isLoading, isFetching }
}
