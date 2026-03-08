import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Product } from '../types/card.type'
import { getCartByUserId } from '../services/product.cart.service'
import { QUERY_KEYS } from '@/contants/queryKeys'
import useGetUser from '@/feartures/auth/hooks/useGetUser'

export default function useGetUserCart() {
    const { user } = useGetUser()

    const { data, isFetching, isLoading, isFetched } = useQuery({
        queryKey: QUERY_KEYS.CART(user?._id),
        queryFn: () => {
            if (!user?._id) throw new Error('Unauthorized')
            return getCartByUserId()
        },
        enabled: !!user?._id,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        retry: false,
    })

    return { data, isFetching, isLoading, isFetched }
}
