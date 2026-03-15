import { apiDummy } from '@/lib/axios'
import { CartItemType } from '../cart/type/cartItem.type'

export const updateCheckoutPreview = async (checkoutList) => {
    const res = await apiDummy.post('/api/checkout', {
        checkoutList,
    })
    return res.data.data
}

export const getCheckoutPreview = async () => {
    const res = await apiDummy.get('/api/checkout')
    return res.data.data.items
}
