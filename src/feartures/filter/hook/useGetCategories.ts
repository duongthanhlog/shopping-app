import { getProductsCategory } from '@/feartures/product/services/products.service'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { CategoryType } from '../types'
import { QUERY_KEYS } from '@/contants/queryKeys'

export default function useGetCategories() {
    const { data, isLoading } = useQuery<CategoryType[]>({
        queryKey: QUERY_KEYS.CATEGORIES,
        queryFn: getProductsCategory,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    })
    return { data, isLoading }
}
