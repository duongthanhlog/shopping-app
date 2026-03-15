import { useQuery } from '@tanstack/react-query'
import { getCheckoutPreview } from './checkout.service'
import { QUERY_KEYS } from '@/contants/queryKeys'

export default function useGetCheckout() {
    const { data } = useQuery({
        queryKey: QUERY_KEYS.CHECKOUT,
        queryFn: getCheckoutPreview,
        refetchOnWindowFocus: false,
    })
    return { data }
}
