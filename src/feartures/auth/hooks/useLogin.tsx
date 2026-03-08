import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '../auth.service'
import { useToast } from '@/feartures/toast/toast.context'
import { useModal } from '@/context/modal.context'
import { QUERY_KEYS } from '@/contants/queryKeys'
import { AxiosError } from 'axios'

export default function useLogin() {
    const { showToast } = useToast()
    const { closeModal } = useModal()
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.USER,
            })
            showToast('success', 'Đăng nhập thành công')
            closeModal()
        },
        onError: (error: AxiosError<any>) => {
            showToast('error', error.response?.data?.message)
        },
    })

    return { mutate, isPending }
}
