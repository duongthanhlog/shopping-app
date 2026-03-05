'use client'
import CartItem from '../../src/feartures/product/components/CartItem'
import Image from 'next/image'
import { useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import useGetUserCart from '@/feartures/product/hooks/useGetUserCart'
import useUpdateCart from '@/feartures/product/hooks/useUpdateCart'
import { useAuth } from '@/feartures/auth/auth.context'
import CartSkeleton from '@/components/ui/skeletons/CartSkeleton'

export default function CartPage() {
    const { userId, isLoading } = useAuth()
    const { cart, isFetched, isFetching } = useGetUserCart()
    const { onIncrease, onDecrease, onDelete } = useUpdateCart()

    if (!userId && !isLoading) {
        redirect('/')
    }
    if (isFetching || isLoading) return <CartSkeleton />

    if (isFetched && cart.length === 0) {
        return (
            <div className="flex justify-center select-none h-[100vh-100px]">
                <Image
                    alt=""
                    width={400}
                    height={400}
                    className=" object-cover"
                    src="https://bizweb.dktcdn.net/100/476/619/themes/894432/assets/empty-cart.png?1744439213741"
                />
            </div>
        )
    }
    const cartGrid = 'grid grid-cols-[3fr_2fr_2fr_2fr_2fr] px-4 items-center'

    return (
        <>
            <div className="bg-white">
                <div className="text-primary text-[30px] container py-5">Giỏ hàng của bạn </div>
            </div>
            <div className="bg-white container">
                <div className={`text-gray-500 ${cartGrid} p-4 my-4 select-none`}>
                    <div className="">Sản phẩm</div>
                    <div className="centerdiv">Đơn giá</div>
                    <div className="centerdiv">Số lượng</div>
                    <div className="centerdiv">Số tiền</div>
                    <div className="centerdiv">Thao tác</div>
                </div>
            </div>
            <div className="bg-white py-5 ">
                <div className="container">
                    <ul className="min-h-[65vh]  border-t border-gray-300">
                        {cart.map((item, i) => {
                            return (
                                <CartItem
                                    onIncrease={onIncrease}
                                    onDecrease={onDecrease}
                                    onDelete={onDelete}
                                    key={i}
                                    item={item}
                                    className={cartGrid}
                                />
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}
