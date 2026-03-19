import { useModal } from '@/context/modal.context'
import useGetUser from '@/feartures/auth/hooks/useGetUser'

export default function useRequireLogin() {
    const { user } = useGetUser()
    const { openConfirm, openModal } = useModal()
    const requireLogin = () => {
        if (!user) {
            openConfirm({
                title: 'Vui lòng đăng nhập',
                onConfirm: () => openModal('login'),
            })
            return false
        }
        return true
    }
    return { requireLogin }
}
