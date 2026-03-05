import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card } from '../types/card.type'
import { deleteCartItem } from '../services/product.cart.service'
import { useToast } from '@/feartures/toast/toast.context'

import { useAuth } from '@/feartures/auth/auth.context'
import { QUERY_KEYS } from '@/contants/queryKeys'

export default function useDeleteProducts() {
    const queryClient = useQueryClient()
    const { userId } = useAuth()
    const { showToast } = useToast()
    const { mutate: deleteMutate } = useMutation({
        mutationFn: (card: Card) => deleteCartItem(card, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CART(userId),
            })
        },
        onError: (error) => {
            showToast('error', error.message)
        },
    })
    return { deleteMutate }
}
