import { useModal } from '@/context/modal.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RegisterFormData } from '../auth.types'
import { useToast } from '@/feartures/toast/toast.context'
import { register } from '../auth.service'
import { QUERY_KEYS } from '@/contants/queryKeys'
import { AxiosError } from 'axios'

export default function useRegister() {
    const { closeModal } = useModal()
    const { showToast } = useToast()
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: RegisterFormData) => {
            return await register(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER })
            closeModal()
            showToast('success', `Đăng ký thành công`)
        },
        onError: (error: AxiosError<any>) => {
            showToast('warning', error.response.data.message)
        },
    })
    return { mutate, isPending }
}
