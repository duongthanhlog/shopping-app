'use client'
import { MenuItemType } from '../components/layout/Header/header-menu.types'
import { useModal } from '../context/modal.context'
import { guestMenu } from '../components/layout/Header/const'
import { useAuth } from '../feartures/auth/auth.context'
import useGetUser from '@/feartures/auth/hooks/useGetUser'

export default function useHeaderMenu() {
    const { userId, logout } = useAuth()
    const { openModal, closeModal, openConfirm } = useModal()
    const { user, isLoading } = useGetUser()
    let userMenu: MenuItemType[]

    if (userId) {
        userMenu = [
            {
                type: 'action',
                name: user?.name || user?.email?.split('@')[0],
                avatar: user?.avatar,
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
    const menuRight: MenuItemType[] = !userId
        ? guestMenu.map((item) =>
              item.type === 'action'
                  ? {
                        ...item,
                        onClick: () => openModal(item.modalType),
                    }
                  : item
          )
        : !isLoading
          ? [...guestMenu.slice(0, 3), ...userMenu]
          : []

    return { menuRight }
}
