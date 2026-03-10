'use client'
import SearchForm from './SearchForm'
import TopMenu from './TopMenu'
import { useMemo } from 'react'
import { useModal } from '../../../context/modal.context'
import Link from 'next/link'
import { CartIcon, ShopeeIcon } from 'public/icons'

import useGetUser from '@/feartures/auth/hooks/useGetUser'
import useGetUserCart from '@/feartures/cart/hooks/useGetUserCart'
import { CartItemType } from '@/feartures/cart/type/cartItem.type'

export default function Header() {
    const { isLoading, user } = useGetUser()
    const { data } = useGetUserCart()
    const { openConfirm, openModal } = useModal()

    const badgeNum = useMemo(() => {
        if (!data) return 0
        return data.reduce((t: number, i: CartItemType) => t + i.quantity, 0)
    }, [data])

    const handleCartClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!user) {
            e.preventDefault()
            openConfirm({
                title: 'Vui lòng đăng nhập',
                onConfirm: async () => {
                    openModal('login')
                },
            })
            return
        }
    }

    return (
        <header className="flex flex-col text-white h-[119px] bg-primary ">
            <div className="flex w-full h-[30px] justify-between lg:max-w-[1200px] md:max-w-[768px] sm:max-w-[360px] mx-auto">
                {!isLoading && <TopMenu />}
            </div>
            <div className="w-full flex flex-1 items-center lg:max-w-[1200px] md:max-w-[768px] sm:max-w-[360px] mx-auto">
                <a href="/" className="mr-10 shrink-0">
                    <ShopeeIcon className="w-40 " />
                </a>
                <SearchForm />
                <Link
                    href={`/cart`}
                    onClick={handleCartClick}
                    className="mx-10 p-3 mt-2 pb-1 relative cursor-pointer"
                >
                    {data?.length > 0 && user && (
                        <span className="border absolute text-sm bg-white text-primary p-[1px] w-[24px] h-[24px] rounded-xl top-0 right-0 centerdiv">
                            {badgeNum}
                        </span>
                    )}
                    <CartIcon className="w-8 h-8 shrink-0" />
                </Link>
            </div>
        </header>
    )
}
