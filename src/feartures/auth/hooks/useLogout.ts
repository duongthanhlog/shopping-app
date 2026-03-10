import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../auth.service'
import { useToast } from '@/feartures/toast/toast.context'
import { QUERY_KEYS } from '@/contants/queryKeys'

export const useLogout = () => {
    const queryClient = useQueryClient()
    const { showToast } = useToast()

    const { mutate, isPending } = useMutation({
        mutationKey: ['auth'],
        mutationFn: logout,
        onSuccess: (data) => {
            showToast('success', data.message)
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.USER,
            })
        },
    })
    return { mutate, isPending }
}
