import { apiDummy } from '@/lib/axios'
import { ActionType, CartItemType } from '../type/cartItem.type'
import { ProductType } from '@/feartures/product/types/product.type'

export const getCartByUserId = async () => {
    const res = await apiDummy.get(`/api/cart`)
    return res.data.data || []
}

export const deleteCartItem = async (product: CartItemType) => {
    const res = await apiDummy.delete('/api/cart', {
        data: {
            productId: product.productId,
        },
    })
    return res.data.data
}

export const updateCartquantity = async (payload: {
    product: CartItemType
    type: ActionType
    newQuantity?: number
}) => {
    const res = await apiDummy.post('/api/cart', {
        product: payload.product,
        type: payload.type,
        quantity: payload.newQuantity,
    })
    return res.data.data
}
