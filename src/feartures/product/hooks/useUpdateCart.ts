import { updateCartquantity } from '../services/product.cart.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ActionType, CartType } from '../types/cart.type'
import { useToast } from '@/feartures/toast/toast.context'
import { CART_ACTION } from '../constants/cartAction'
import useDeleteProducts from './useDeleteProducts'
import { useModal } from '@/context/modal.context'
import { QUERY_KEYS } from '@/contants/queryKeys'
import useGetUser from '@/feartures/auth/hooks/useGetUser'
import { useState } from 'react'

export default function useUpdateCart() {
    const { user } = useGetUser()
    const { showToast } = useToast()
    const { openConfirm, closeModal } = useModal()
    const { deleteMutate } = useDeleteProducts()
    const queryClient = useQueryClient()
    const [pendingId, setPendingId] = useState<string | null>(null)

    const { mutate: updateMutate, isPending } = useMutation({
        mutationFn: (payload: { productId: any; type: ActionType; newQuantity?: number }) => {
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
    const handleDelete = (productId: string) => {
        openConfirm({
            title: 'Bạn chắc chắn muốn xóa sản phẩm ?',
            onConfirm: () => {
                deleteMutate(productId)
                showToast('warning', 'Đã xóa sản phẩm')
                closeModal()
            },
        })
    }

    const handleIncrease = (productId: string, quantity?: number) => {
        setPendingId(productId)
        updateMutate({
            productId,
            type: CART_ACTION.INCREASE,
            newQuantity: quantity,
        })
    }

    const handleDecrease = (productId: string, quantity: number) => {
        if (quantity === 1) {
            openConfirm({
                title: 'Bạn chắc chắn muốn xóa sản phẩm khỏi giỏ hàng ?',
                onConfirm: () => {
                    deleteMutate(productId)
                    closeModal()
                },
            })
            return
        }
        setPendingId(productId)
        updateMutate({ productId, type: CART_ACTION.DECREASE })
    }

    return {
        pendingId,
        onDelete: handleDelete,
        onIncrease: handleIncrease,
        onDecrease: handleDecrease,
    }
}
