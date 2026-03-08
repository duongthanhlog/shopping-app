import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getUser } from '../auth.service'
import { QUERY_KEYS } from '@/contants/queryKeys'

export default function useGetUser() {
    const {
        data: user,
        isLoading,
        error,
    } = useQuery({
        queryKey: QUERY_KEYS.USER,
        queryFn: getUser,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        retry: false,
    })
    return { user, isLoading, error }
}
