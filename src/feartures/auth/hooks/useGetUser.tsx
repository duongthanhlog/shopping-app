import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useAuth } from '../auth.context'
import { getUserById } from '../auth.service'

export default function useGetUser() {
    const { userId } = useAuth()

    const {
        data: user,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => {
            if (!userId) throw new Error('No userId')
            return getUserById(userId)
        },
        enabled: !!userId,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    })
    return { user, isLoading, error }
}
