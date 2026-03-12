import { apiDummy } from '@/lib/axios'

export const fetchSuggest = async (value: string) => {
    const res = await apiDummy(`/api/products?search=${value}&limit=5`)
    const data = res.data
    return data
}
