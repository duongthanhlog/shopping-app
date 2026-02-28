import SearchForm from './SearchForm'
import TopMenu from './TopMenu'
import useAuthLogin from '@/feartures/auth/auth.hook'
import { useAuth } from '@/feartures/auth/auth.context'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getUserCart } from '@/feartures/product/services/product.cart.service'
import { useModal } from '../../../context/modal.context'
import Link from 'next/link'
import { Card } from '@/feartures/product/types/card.type'
import { CartIcon, ShopeeIcon } from 'public/icons'

export default function Header() {
    const { loading } = useAuth()
    const { data: user } = useAuthLogin()
    const [badge, setBadge] = useState()
    const { data: cart } = useQuery({
        queryKey: ['cart', user?.id],
        queryFn: () => getUserCart(user),
        enabled: !!user,
    })

    const { openConfirm, openModal } = useModal()

    useEffect(() => {
        if (cart) {
            const badgeNum = cart.reduce((total: number, item: Card) => {
                return total + item.quantity
            }, 0)
            setBadge(badgeNum)
        }
    }, [cart])

    const handleCartClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!user) {
            e.preventDefault()
            openConfirm({
                title: 'Vui lòng đăng nhập',
                onConfirm: () => {
                    openModal('login')
                },
            })
            return
        }
    }

    return (
        <header className="flex flex-col text-white h-[119px] bg-primary ">
            <div className="flex w-full h-[30px] justify-between lg:max-w-[1200px] md:max-w-[768px] sm:max-w-[360px] mx-auto">
                {!loading && <TopMenu />}
            </div>
            <div className="w-full flex flex-1 items-center lg:max-w-[1200px] md:max-w-[768px] sm:max-w-[360px] mx-auto">
                <a href="/" className="mr-10 shrink-0">
                    <ShopeeIcon className="w-40 " />
                </a>
                <SearchForm />
                <Link
                    href={'/cart'}
                    onClick={handleCartClick}
                    className="mx-10 p-3 mt-2 pb-1 relative cursor-pointer"
                >
                    {cart?.length > 0 && (
                        <span className="border absolute text-sm bg-white text-primary p-[1px] w-[24px] h-[24px] rounded-xl top-0 right-0 centerdiv">
                            {badge}
                        </span>
                    )}
                    <CartIcon className="w-8 h-8 shrink-0" />
                </Link>
            </div>
        </header>
    )
}
