import { FilterUrl } from '@/feartures/filter/hook/useFilter'
import { apiDummy } from '@/lib/axios'

export const getProducts = async (filter: FilterUrl) => {
    const res = await apiDummy.get(`api/products`, { params: filter })
    return res.data
}

export const getProductsCategory = async () => {
    const res = await apiDummy.get(`/api/category`)

    return res.data
}
