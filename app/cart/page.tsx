'use client'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import useGetUserCart from '@/feartures/product/hooks/useGetUserCart'
import useUpdateCart from '@/feartures/product/hooks/useUpdateCart'
import useGetUser from '@/feartures/auth/hooks/useGetUser'
import CartItem from '@/feartures/product/components/CartItem'
import FullScreenSpinner from '@/components/ui/FullScreenSpinner'
import { CartType } from '@/feartures/product/types/cart.type'
import { useState } from 'react'

export default function CartPage() {
    const { user, isLoading } = useGetUser()
    const { data, isFetching, isLoading: isLoadingCart } = useGetUserCart()
    const { onIncrease, onDecrease, onDelete, pendingId } = useUpdateCart()
    const cart = data ?? []

    if (!user && !isLoading) {
        redirect('/')
    }

    const handleIncrease = (id: string) => {
        onIncrease(id)
    }

    const handleDecrease = (id: string, quantity: number) => {
        onDecrease(id, quantity)
    }

    if (isFetching || isLoading) return <FullScreenSpinner />

    if (!isLoadingCart && cart.length === 0) {
        return (
            <div className="flex justify-center select-none h-[calc(100vh-300px)]">
                <Image
                    alt="Empty cart"
                    width={600}
                    height={600}
                    objectFit="cover"
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
                        {cart.map((item: CartType) => {
                            return (
                                <CartItem
                                    isPending={pendingId === item.productId._id}
                                    onIncrease={handleIncrease}
                                    onDecrease={handleDecrease}
                                    onDelete={onDelete}
                                    key={item._id}
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
