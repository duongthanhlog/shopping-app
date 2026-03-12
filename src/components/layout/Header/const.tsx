import { FaceBookIcon, InstagramIcon } from '@/public/icons'
import { MenuItemType } from './headerMenu.types'

export const menuLeft: MenuItemType[] = [
    { type: 'link', name: 'Kênh người bán', link: '/' },
    { type: 'link', name: 'Trở thành Người bán Shopee', link: '/' },
    { type: 'link', name: 'Tải ứng dụng', link: '/' },
    {
        type: 'link',
        name: 'Kết nối',
        link: '/',
        icon: <FaceBookIcon className="w-4 h-4 ml-1" />,
    },
    {
        type: 'link',
        name: '',
        link: '/',
        icon: <InstagramIcon className="w-4 h-4 ml-1" />,
    },
]

export const guestMenu: MenuItemType[] = [
    // { type: 'link', name: 'Thông báo', link: '/' },
    // { type: 'link', name: 'Hỗ trợ', link: '/' },
    // { type: 'link', name: 'Tiếng Việt', link: '/' },
    { type: 'action', name: 'Đăng kí', modalType: 'register' },
    { type: 'action', name: 'Đăng nhập', modalType: 'login' },
]
