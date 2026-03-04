import { updateCartquantity } from '../services/product.cart.service'
import { useMutation } from '@tanstack/react-query'
import { Card } from '../types/card.type'
import { ActionType } from '../types/cart.type'
import { queryClient } from '@/lib/query-client'
import { useToast } from '@/feartures/toast/toast.context'
import { CART_ACTION } from '../constants/cart'
import useDeleteProducts from './useDeleteProducts'
import { useModal } from '@/context/modal.context'
import { useAuth } from '@/feartures/auth/auth.context'

export default function useUpdateCart() {
    const { userId } = useAuth()
    const { showToast } = useToast()
    const { openConfirm, closeModal } = useModal()
    const { deleteMutate } = useDeleteProducts()

    const { mutate: updateMutate } = useMutation({
        mutationFn: (payload: {
            card: Card
            type: ActionType
            newQuantity?: number
        }) => {
            return updateCartquantity(payload, userId)
        },
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(['cart', userId], updatedUser.cart)
        },

        onError: (error) => {
            showToast('error', error.message)
        },
    })
    const handleDelete = (card: Card) => {
        deleteMutate(card)
    }

    const handleIncrease = (card: Card, quantity: number) => {
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
        onDelete: handleDelete,
        onIncrease: handleIncrease,
        onDecrease: handleDecrease,
    }
}
