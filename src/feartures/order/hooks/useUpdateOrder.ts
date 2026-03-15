import { updateOrder } from '@/feartures/auth/order.service'
import { CartItemType } from '@/feartures/cart/type/cartItem.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useUpdateOrder() {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: (orderList: CartItemType[]) => updateOrder(orderList),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['order'],
            })
        },
    })

    const handleOrder = (orderList: CartItemType[]) => {
        mutate(orderList)
    }

    return { handleOrder }
}
