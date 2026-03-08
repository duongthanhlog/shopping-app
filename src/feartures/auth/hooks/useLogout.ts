import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../auth.service'
import { useToast } from '@/feartures/toast/toast.context'

export const useLogout = () => {
    const queryClient = useQueryClient()
    const { showToast } = useToast()

    const { mutate } = useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            showToast('success', data.message)
            queryClient.setQueryData(['user'], null)
        },
    })
    return { mutate }
}
