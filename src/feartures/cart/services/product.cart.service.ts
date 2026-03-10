import { api, apiDummy } from '@/lib/axios'
import { Product } from '../../product/types/product.type'
import { ActionType, CartItemType } from '../types/cart.type'

export const getCartByUserId = async () => {
    const res = await apiDummy.get(`/api/cart`)
    return res.data.data
}

export const deleteCartItem = async (productId: string) => {
    const res = await apiDummy.delete('/api/cart', {
        data: {
            productId,
        },
    })
    return res.data.data
}

export const updateCartquantity = async (payload: {
    productId: string
    type: ActionType
    newQuantity?: number
}) => {
    const res = await apiDummy.post('/api/cart/', {
        productId: payload.productId,
        type: payload.type,
        quantity: payload.newQuantity,
    })
    return res.data.data
}
