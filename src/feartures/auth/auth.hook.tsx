import { useQuery } from '@tanstack/react-query'
import { useAuth } from './auth.context'
import { getUserById } from './auth.service'

export default function useAuthLogin() {
    const { userId } = useAuth()

    const { data, isLoading, error } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
    })
    return { data, isLoading, error }
}
