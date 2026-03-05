import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login as loginApi } from '../auth.service'
import { useAuth } from '../auth.context'
import { useToast } from '@/feartures/toast/toast.context'
import { useModal } from '@/context/modal.context'
import { QUERY_KEYS } from '@/contants/queryKeys'

export default function useLogin() {
    const { login } = useAuth()
    const { showToast } = useToast()
    const { closeModal } = useModal()
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: loginApi,
        onSuccess: async (token) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.USER,
            })
            login(token)
            showToast('success', 'Đăng nhập thành công')
            closeModal()
        },
        onError: (error) => {
            showToast('error', error.message)
        },
    })

    return { mutate, isPending }
}
