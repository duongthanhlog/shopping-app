import { useMutation } from '@tanstack/react-query'
import { Card } from '../types/card.type'
import { deleteCartItem } from '../services/product.cart.service'
import { useToast } from '@/feartures/toast/toast.context'
import { queryClient } from '@/lib/query-client'
import useGetUser from '@/feartures/auth/hooks/useGetUser'
import { useAuth } from '@/feartures/auth/auth.context'

export default function useDeleteProducts() {
    const { userId } = useAuth()
    const { showToast } = useToast()
    const { mutate: deleteMutate } = useMutation({
        mutationFn: (card: Card) => deleteCartItem(card, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart'],
            })
        },
        onError: (error) => {
            showToast('error', error.message)
        },
    })
    return { deleteMutate }
}
