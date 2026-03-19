import { apiDummy } from '@/lib/axios'

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
