import { apiDummy } from '@/lib/axios'
import { ActionType, CartItemType } from '../type/cartItem.type'
import { ProductType } from '@/feartures/product/types/product.type'

export const getCartByUserId = async () => {
    const res = await apiDummy.get(`/api/cart`)
    return res.data.data || []
}

export const deleteCartItem = async (productId: string) => {
    const res = await apiDummy.delete('/api/cart', {
        data: {
            productId,
        },
    })
    return res.data.data
}

export const updateCartquantity = async ({
    productId,
    delta,
}: {
    productId: String
    delta?: number
}) => {
    const res = await apiDummy.post('/api/cart', {
        productId,
        delta,
    })
    return res.data.data
}
