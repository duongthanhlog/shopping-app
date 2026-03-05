import { updateCartquantity } from '../services/product.cart.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card } from '../types/card.type'
import { ActionType } from '../types/cart.type'
import { useToast } from '@/feartures/toast/toast.context'
import { CART_ACTION } from '../constants/cart'
import useDeleteProducts from './useDeleteProducts'
import { useModal } from '@/context/modal.context'
import { useAuth } from '@/feartures/auth/auth.context'
import { QUERY_KEYS } from '@/contants/queryKeys'

export default function useUpdateCart() {
    const { userId } = useAuth()
    const { showToast } = useToast()
    const { openConfirm, closeModal } = useModal()
    const { deleteMutate } = useDeleteProducts()
    const queryClient = useQueryClient()

    const { mutate: updateMutate, isPending } = useMutation({
        mutationFn: (payload: { card: Card; type: ActionType; newQuantity?: number }) => {
            return updateCartquantity(payload, userId)
        },
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(QUERY_KEYS.CART(userId), updatedUser.cart)
        },

        onError: (error) => {
            showToast('warning', error.message)
        },
    })
    const handleDelete = (card: Card) => {
        openConfirm({
            title: 'Bạn chắc chắn muốn xóa sản phẩm ?',
            onConfirm: () => {
                deleteMutate(card)
                closeModal()
            },
        })
    }

    const handleIncrease = (card: Card, quantity?: number) => {
        updateMutate({
            card,
            type: CART_ACTION.INCREASE,
            newQuantity: quantity,
        })
    }

    const handleDecrease = (card: Card) => {
        if (card.quantity === 1) {
            openConfirm({
                title: 'Bạn chắc chắn muốn xóa sản phẩm khỏi giỏ hàng ?',
                onConfirm: () => {
                    deleteMutate(card)
                    closeModal()
                },
            })
            return
        }
        updateMutate({ card, type: CART_ACTION.DECREASE })
    }

    return {
        isPending,
        onDelete: handleDelete,
        onIncrease: handleIncrease,
        onDecrease: handleDecrease,
    }
}
