import { useModal } from '@/context/modal.context'
import { useAuth } from '../auth.context'
import { useMutation } from '@tanstack/react-query'
import { RegisterFormData } from '../auth.types'
import { useToast } from '@/feartures/toast/toast.context'
import { login as loginApi, register as registerApi } from '../auth.service'
import { queryClient } from '@/lib/query-client'

export default function useRegister() {
    const { closeModal } = useModal()
    const { login } = useAuth()
    const { showToast } = useToast()

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: RegisterFormData) => {
            await registerApi(data)
            return await loginApi(data)
        },
        onSuccess: (token) => {
            login(token)
            queryClient.invalidateQueries({ queryKey: ['user'] })
            closeModal()
            showToast('success', `Đăng ký thành công`)
        },
        onError: (error) => {
            showToast('error', error.message)
        },
    })
    return { mutate, isPending }
}
