import Link from 'next/link'
import Image from 'next/image'
import { MenuItemType } from './header-menu.types'
import { User } from '../../../feartures/auth/auth.types'

interface Props {
    item: MenuItemType
    loading: boolean
    user: User
    className?: string
    displayName?: string
    onClick?: () => void
}
export default function MenuItem({ item, className, user }: Props) {
    switch (item?.type) {
        case 'link':
            return (
                <Link className={className} href={item.link}>
                    {item.name}
                </Link>
            )
        case 'action':
            return (
                <button className={className} onClick={item.onClick}>
                    {item.avatar && (
                        <>
                            <Image
                                alt="avatar"
                                width={24}
                                height={24}
                                loading="eager"
                                className="w-6 h-6 rounded-[50px] mr-2"
                                src="https://scontent.fsgn12-1.fna.fbcdn.net/v/t39.30808-6/406583550_122093351270148279_9119213848156166925_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeGTXjP6lHCMPRmQKb6SsgkpDAwcVR_8x-YMDBxVH_zH5hUcEaxhC1zKvV7ztgUanlCAP6CbPZbIADdjbNTNiylo&_nc_ohc=nPaBB5zr5-AQ7kNvwHXEV4I&_nc_oc=AdncHV616QU2Ry2_M5zPYcdtFVnQoyUWz4Cj80FDpL8h26QowGwNS2rznMhoM7VurzGUG6kgC5odV70Lyu8Z6ZaA&_nc_zt=23&_nc_ht=scontent.fsgn12-1.fna&_nc_gid=lVVIYn4dNcOWGZH36eFg4w&oh=00_Afvd_AwijEggx6UAZAqJqOhSsEUaD9QHa4R7VoAucKRdhw&oe=699CCD72"
                            />
                        </>
                    )}
                    <span
                        className={`${user && item.name !== 'Đăng xuất' ? 'font-bold' : 'font-tight'}`}
                    >
                        {item.name}
                    </span>
                </button>
            )
    }
}
