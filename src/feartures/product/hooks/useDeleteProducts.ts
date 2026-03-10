import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCartItem } from '../../cart/services/product.cart.service'
import { useToast } from '@/feartures/toast/toast.context'
import { QUERY_KEYS } from '@/contants/queryKeys'
import useGetUser from '@/feartures/auth/hooks/useGetUser'

export default function useDeleteProducts() {
    const queryClient = useQueryClient()
    const { user } = useGetUser()
    const { showToast } = useToast()

    const { mutate: deleteMutate } = useMutation({
        mutationFn: (productId: string) => {
            if (!user?._id) throw new Error('Unauthorized')
            return deleteCartItem(productId)
        },
        onSuccess: () => {
            if (!user?._id) throw new Error('Unauthorized')
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CART(user._id),
            })
        },
        onError: (error) => {
            showToast('error', error.message)
        },
    })
    return { deleteMutate }
}
