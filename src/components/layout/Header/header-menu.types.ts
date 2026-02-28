import { ReactNode } from 'react'

type ModalType = 'login' | 'register'

interface BaseMenuItem {
    name: string
}

interface LinkMenuItem extends BaseMenuItem {
    type: 'link'
    link?: string
    icon?: ReactNode
}

interface UserMenuItem extends BaseMenuItem {
    type: 'action'
    onClick?: () => void
    modalType?: ModalType
    avatar?: string
    confirm?: boolean
}

export type MenuItemType = LinkMenuItem | UserMenuItem
