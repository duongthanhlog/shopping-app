'use client'
import CartItem from '../../src/feartures/product/components/CartItem'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useGetUserCart from '@/feartures/product/hooks/useGetUserCart'
import useUpdateCart from '@/feartures/product/hooks/useUpdateCart'
import { useAuth } from '@/feartures/auth/auth.context'

export default function CartPage() {
    const router = useRouter()
    const { userId } = useAuth()
    const { cart } = useGetUserCart()
    const { onIncrease, onDecrease, onDelete } = useUpdateCart()

    useEffect(() => {
        if (!userId) {
            router.replace('/')
        }
    }, [userId])

    if (cart?.length === 0) {
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

    return (
        <>
            <div className="bg-white">
                <div className="text-primary text-[30px] container py-5">
                    Giỏ hàng của bạn{' '}
                </div>
            </div>
            <div className="bg-white">
                <div className="container"></div>
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
                                />
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}
