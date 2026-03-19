import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/contants/queryKeys'
import { getCheckoutPreview } from '../checkout.service'

export default function useGetCheckout() {
    const { data, isLoading } = useQuery({
        queryKey: QUERY_KEYS.CHECKOUT,
        queryFn: getCheckoutPreview,
    })
    return { data, isLoading }
}
