import { apiDummy } from '@/lib/axios'
import { CartItemType } from '../cart/type/cartItem.type'

export const getUserOrder = async () => {
    const res = await apiDummy.get('/api/order')
    return res.data.data
}

export const updateOrder = async (productList: CartItemType[]) => {
    const res = await apiDummy.post('/api/order', {
        productList,
    })
    return res.data.data.items
}
