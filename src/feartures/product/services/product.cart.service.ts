import instance from '@/lib/axios'
import { User } from '../../auth/auth.types'
import { getUserById } from '../../auth/auth.service'
import { CART_ACTION } from '../constants/cart'
import { Card } from '../types/card.type'
import { ActionType } from '../types/cart.type'

export const getUserCart = async (user: User) => {
    const res = await getUserById(user.id)
    const data = await res.cart
    return data
}

export const deleteCartItem = async (card: Card, user: User) => {
    const cart: Card[] = await getUserCart(user)
    const patchRes = cart.filter((item) => {
        return item.id !== card.id
    })
    const updateCart = await instance.patch(`/users/${user.id}`, {
        cart: patchRes,
    })
    return updateCart
}

export const updateCartquantity = async (
    payload: { card: Card; type: ActionType; newQuantity?: number },
    user: User
) => {
    const cart: Card[] = await getUserCart(user)

    const existingItem = cart.find((item) => item.id === payload.card.id)

    if (!!existingItem) {
        if (
            existingItem.quantity === 1 &&
            payload.type === CART_ACTION.DECREASE
        ) {
            return deleteCartItem(existingItem, user)
        }

        const updatequantityCart = cart.map((item) => {
            if (item.id === payload.card.id) {
                return {
                    ...item,
                    quantity:
                        payload.type === CART_ACTION.INCREASE
                            ? item.quantity + (payload.newQuantity ?? 1)
                            : Math.max(1, item.quantity - 1),
                }
            }
            return item
        })

        const res = await instance.patch(`/users/${user.id}`, {
            cart: updatequantityCart,
        })
        return res.data
    } else {
        const res = await instance.patch(`/users/${user.id}`, {
            cart: [...cart, { ...payload.card, quantity: payload.newQuantity }],
        })
        return res.data
    }
}
