'use client'
import TopMenu from './TopMenu'
import { useMemo } from 'react'
import Link from 'next/link'
import { CartIcon, ShopeeIcon } from 'public/icons'

import useGetUser from '@/feartures/auth/hooks/useGetUser'
import useGetUserCart from '@/feartures/cart/hooks/useGetUserCart'
import { CartItemType } from '@/feartures/cart/type/cartItem.type'
import SearchForm from '@/feartures/search/SearchForm'
import useRequireLogin from '@/hooks/useRequireLogin'
import Tooltip from '@/components/ui/Tooltips'
import Image from 'next/image'
import { formatCurrency } from '@/utils/formatCurrency'
import Currency from '@/components/ui/Currency'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

export default function Header() {
    const router = useRouter()
    const { isLoading, user } = useGetUser()
    const { data: cartList } = useGetUserCart()
    const { requireLogin } = useRequireLogin()

    const badgeNum = useMemo(() => {
        if (!cartList) return 0
        return cartList.reduce((t: number, i: CartItemType) => t + i.quantity, 0)
    }, [cartList])

    const handleCartClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (requireLogin()) return
        if (!user) {
            e.preventDefault()
        }
    }

    return (
        <header className="bg-primary flex h-[119px] flex-col text-white">
            <div className="mx-auto flex h-[30px] w-full justify-between sm:max-w-[360px] md:max-w-[768px] lg:max-w-[1200px]">
                {!isLoading && <TopMenu />}
            </div>
            <div className="mx-auto flex w-full flex-1 items-center sm:max-w-[360px] md:max-w-[768px] lg:max-w-[1200px]">
                <a href="/" className="mr-10 shrink-0">
                    <ShopeeIcon className="w-40" />
                </a>
                <SearchForm className="pl-2" />
                <Link
                    href={`/cart`}
                    onClick={handleCartClick}
                    className="relative mx-10 mt-2 cursor-pointer p-3 pb-1 group"
                >
                    {cartList?.length > 0 && user && (
                        <span className="text-primary centerdiv absolute top-0 right-0 h-6 w-6 rounded-xl border bg-white p-[1px] text-sm">
                            {badgeNum}
                        </span>
                    )}
                    <CartIcon className="h-8 w-8 shrink-0" />

                    {cartList?.length > 0 && (
                        <Tooltip
                            className="group-hover:block z-10
                        top-full mt-2 right-0 min-w-70 w-95  hidden
                        bg-white py-2 text-black shadow-xl 
                        "
                        >
                            <div>
                                {cartList?.map((item: CartItemType) => {
                                    return (
                                        <div
                                            onClick={() =>
                                                router.push(`/products/${item.productId}`)
                                            }
                                            key={item.productId}
                                            className="flex gap-2 px-3 py-2 hover:bg-gray-100 "
                                        >
                                            <Image
                                                src={item.thumbnail}
                                                alt="item"
                                                width={45}
                                                height={45}
                                                className="border border-gray-200 "
                                            />
                                            <div className="truncate">{item.title}</div>
                                            <div className="ml-auto pl-2 text-primary">
                                                {formatCurrency(item.price)}
                                                <Currency bottom={4} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex px-3 justify-between items-center mt-3">
                                <span className="text-gray-400 text-sm">
                                    {cartList?.length
                                        ? cartList?.length +
                                          `${' '}sản phẩm đã được
                                thêm vào giỏ`
                                        : null}
                                </span>
                                <Button
                                    onClick={() => router.push('/cart')}
                                    active
                                    className="hover:bg-red-700"
                                >
                                    Xem giỏ hàng
                                </Button>
                            </div>
                        </Tooltip>
                    )}
                </Link>
            </div>
        </header>
    )
}
