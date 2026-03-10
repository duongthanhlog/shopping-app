import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/feartures/toast/toast.context'
import { CART_ACTION } from '../../cart/constants/cartAction'
import { useModal } from '@/context/modal.context'
import { QUERY_KEYS } from '@/contants/queryKeys'
import useGetUser from '@/feartures/auth/hooks/useGetUser'
import { useState } from 'react'
import { updateCartquantity } from '../services/product.cart.service'
import { ActionType } from '../type/cartItem.type'

export default function useUpdateCart() {
    const { user } = useGetUser()
    const { showToast } = useToast()
    const queryClient = useQueryClient()
    const [pendingId, setPendingId] = useState<string | null>(null)

    const { mutate: updateMutate, isPending } = useMutation({
        mutationFn: (payload: {
            productId: string
            type: ActionType
            newQuantity?: number
        }) => {
            if (!user?._id) throw new Error('Unauthorized')
            return updateCartquantity(payload)
        },
        onSuccess: (userCart) => {
            queryClient.setQueryData(QUERY_KEYS.CART(user?._id), userCart)
        },
        onError: (error) => {
            console.log(error)
            showToast('warning', error.message)
        },
        onSettled: () => {
            setPendingId(null)
        },
    })

    const handleIncrease = (productId: string, quantity?: number) => {
        setPendingId(productId)
        updateMutate({
            productId,
            type: CART_ACTION.INCREASE,
            newQuantity: quantity,
        })
    }

    const handleDecrease = (productId: string) => {
        setPendingId(productId)
        updateMutate({ productId, type: CART_ACTION.DECREASE })
    }

    return {
        pendingId,
        isPending,
        onIncrease: handleIncrease,
        onDecrease: handleDecrease,
    }
}
