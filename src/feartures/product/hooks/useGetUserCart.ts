import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Card } from '../types/card.type'
import { getCartByUserId } from '../services/product.cart.service'
import { useAuth } from '@/feartures/auth/auth.context'

export default function useGetUserCart() {
    const { userId } = useAuth()

    const { data: cart = [] } = useQuery<Card[]>({
        queryKey: ['cart', userId],
        queryFn: () => getCartByUserId(userId),
        enabled: !!userId,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    })

    return { cart }
}
