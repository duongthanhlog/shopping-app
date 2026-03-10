import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getUser } from '../auth.service'
import { QUERY_KEYS } from '@/contants/queryKeys'

export default function useGetUser() {
    const {
        data: user,
        isLoading,
        isFetching,
        error,
    } = useQuery({
        queryKey: QUERY_KEYS.USER,
        queryFn: getUser,
        refetchOnWindowFocus: false,
        retry: false,
    })
    return { user, isFetching, isLoading, error }
}
