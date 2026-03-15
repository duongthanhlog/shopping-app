import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/feartures/toast/toast.context'
import { QUERY_KEYS } from '@/contants/queryKeys'
import useGetUser from '@/feartures/auth/hooks/useGetUser'
import { useState } from 'react'
import { updateCartquantity } from '../services/product.cart.service'

export default function useUpdateCart() {
    const { user } = useGetUser()
    const { showToast } = useToast()
    const queryClient = useQueryClient()
    const [pendingId, setPendingId] = useState<string | null>(null)

    const { mutate: updateMutate, isPending } = useMutation({
        mutationFn: ({ productId, delta }: { productId: string; delta?: number }) => {
            if (!user?._id) throw new Error('Unauthorized')
            return updateCartquantity({ productId, delta })
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

    const handleIncrease = ({
        productId,
        delta,
    }: {
        productId: string
        delta?: number
    }) => {
        setPendingId(productId)
        updateMutate({
            productId,
            delta,
        })
    }

    const handleDecrease = ({
        productId,
        delta,
    }: {
        productId: string
        delta: number
    }) => {
        setPendingId(productId)
        updateMutate({ productId, delta })
    }

    return {
        pendingId,
        isPending,
        updateMutate,
        onIncrease: handleIncrease,
        onDecrease: handleDecrease,
    }
}
