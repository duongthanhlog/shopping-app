import { useMutation } from '@tanstack/react-query'
import { login as loginApi } from '../auth.service'
import { queryClient } from '@/lib/query-client'
import { useAuth } from '../auth.context'
import { useToast } from '@/feartures/toast/toast.context'
import { useModal } from '@/context/modal.context'

export default function useLogin() {
    const { login } = useAuth()
    const { showToast } = useToast()
    const { closeModal } = useModal()

    const { mutate, isPending } = useMutation({
        mutationFn: loginApi,
        onSuccess: async (token) => {
            queryClient.invalidateQueries({
                queryKey: ['user'],
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
