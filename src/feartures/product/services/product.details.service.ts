import { apiDummy } from '@/lib/axios'

export const getProductById = async (id: string) => {
    const res = await apiDummy.get(`/products/${id}`)
    return res.data
}
