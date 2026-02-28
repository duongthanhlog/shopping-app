import { productsInstance } from '@/lib/axios'

export const getProductById = async (id: string) => {
    const res = await productsInstance.get(`/products/${id}`)
    return res.data
}
