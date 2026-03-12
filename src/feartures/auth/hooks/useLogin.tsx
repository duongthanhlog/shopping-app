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
    const { isPending, mutateAsync } = useMutation({
        mutationKey: ['auth'],
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.USER,
            })
            showToast('success', 'Đăng nhập thành công')
            closeModal()
        },
    })

    return { isPending, mutateAsync }
}
