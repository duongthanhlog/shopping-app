'use client'
import { MenuItemType } from '../components/layout/Header/headerMenu.types'
import { useModal } from '../context/modal.context'
import { guestMenu } from '../components/layout/Header/const'
import useGetUser from '@/feartures/auth/hooks/useGetUser'
import { useLogout } from '@/feartures/auth/hooks/useLogout'

export default function useHeaderMenu() {
    const { user } = useGetUser()
    const { mutate: logout } = useLogout()
    const { openModal, closeModal, openConfirm } = useModal()
    let userMenu: MenuItemType[]

    if (user) {
        userMenu = [
            {
                type: 'action',
                name: user.name || user.email.split('@')[0],
                avatar: user.avatar,
            },
            {
                type: 'action',
                name: 'Đăng xuất',
                onClick: () => {
                    openConfirm({
                        title: 'Bạn chắc chắn muốn đăng xuất',
                        onConfirm: () => {
                            logout()
                            closeModal()
                        },
                    })
                },
            },
        ]
    }

    const menuRight: MenuItemType[] = user
        ? [...guestMenu.slice(0, 3), ...userMenu]
        : guestMenu.map((item) =>
              item.type === 'action'
                  ? {
                        ...item,
                        onClick: () => openModal(item.modalType),
                    }
                  : item
          )

    return { menuRight }
}
