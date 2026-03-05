import { apiDummy } from '@/lib/axios'

export const getProductById = async (id: string) => {
    try {
        const res = await apiDummy.get(`/products/${id}`)
        return res.data
    } catch (error) {
        if (error.code === 'ECONNRESET') {
            const retry = await apiDummy.get(`products/${id}`)
            return retry.data
        }
        throw error
    }
}
