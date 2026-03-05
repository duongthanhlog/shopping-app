import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Card } from '../types/card.type'
import { getCartByUserId } from '../services/product.cart.service'
import { useAuth } from '@/feartures/auth/auth.context'
import { QUERY_KEYS } from '@/contants/queryKeys'

export default function useGetUserCart() {
    const { userId } = useAuth()

    const {
        data: cart = [],
        isFetching,
        isLoading,
        isFetched,
    } = useQuery<Card[]>({
        queryKey: QUERY_KEYS.CART(userId),
        queryFn: () => getCartByUserId(userId),
        enabled: !!userId,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    })

    return { cart, isFetching, isLoading, isFetched }
}
