'use client'
import Image from 'next/image'
import Currency from '@/components/ui/currency'
import { formatCurrency } from '@/utils/formatNumber'
import QuantityBox from '@/components/ui/Quantity.box'
import useAuthLogin from '@/feartures/auth/auth.hook'
import { useToast } from '@/feartures/toast/toast.context'
import { useModal } from '@/context/modal.context'
import { useMutation } from '@tanstack/react-query'
import { updateCartquantity } from '@/feartures/product/services/product.cart.service'
import { queryClient } from '@/lib/query-client'
import { CART_ACTION } from '@/feartures/product/constants/cart'
import { useState } from 'react'
import { Card } from '@/feartures/product/types/card.type'
import PercentRating from '@/utils/canculateRating'

export default function ProductDetail({ product }) {
    const { data: user } = useAuthLogin()
    const { showToast } = useToast()
    const { openModal, openConfirm } = useModal()

    const [quantity, setQuantity] = useState(1)

    const { mutate } = useMutation({
        mutationFn: async ({
            product,
            quantity,
        }: {
            product: Card
            quantity: number
        }) => {
            return await updateCartquantity(
                {
                    card: product,
                    type: CART_ACTION.INCREASE,
                    newQuantity: quantity,
                },
                user
            )
        },
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(['cart', user?.id], updatedUser.cart)
            showToast('success', 'Đã thêm vào giỏ hàng')
        },
        onError: (error) => {
            console.log(error)

            openConfirm({
                title: error.message,
                onConfirm: () => {
                    openModal('login')
                },
            })
        },
    })

    const handleAddToCart = () => {
        if (!user) {
            openConfirm({
                title: 'Vui lòng đăng nhập',
                onConfirm: () => openModal('login'),
            })
            return
        }

        mutate({ product, quantity })
    }

    return (
        <div className="bg-white mt-6 pt-5 flex ">
            <Image
                width={200}
                height={200}
                src={product.thumbnail}
                alt=""
                loading="eager"
                className="flex-3 p-4"
            />
            <div className="flex-4 px-5">
                <span className="bg-primary text-white shrink-0 px-2 rounded-[4px] mr-2 text-[12px]">
                    Yêu thích
                </span>
                <span className="text-[20px] leading-5 mt-2">
                    {product.description}
                </span>
                <div className="flex">
                    <div className="mt-[10px] flex gap-4 font-medium items-center text-gray-600 divide-x divide-gray-300">
                        <span className="pr-4 ">
                            <span className="underline leading-4 flex">
                                <span className="font-semibold">
                                    {Math.ceil(product.rating * 10) / 10}
                                </span>
                                <span className="flex w-[100px] ml-2">
                                    {PercentRating(product.rating)}
                                </span>
                            </span>
                        </span>
                        <span className=" text-md pr-4">
                            <span className="font-semibold underline text-[16px] leading-4 text-black mr-1">
                                {product.reviews.length === 0
                                    ? 'Chưa có đánh giá'
                                    : product.reviews.length}
                            </span>{' '}
                            Đánh giá
                        </span>
                        <span className=" pr-4 text-md">
                            Đã bán
                            <span className="text-[16px] font-semibold underline leading-4 text-black ml-2">
                                {product.minimumOrderQuantity}
                            </span>{' '}
                        </span>
                    </div>
                    <span className="ml-auto ">Tố cáo</span>
                </div>
                <div className="bg-gray-100 px-[20px] py-[15px] mt-5 flex items-center">
                    <span className="text-[30px] text-primary font-normal">
                        <span className="px-2">
                            {formatCurrency(
                                product.price -
                                    (product.price *
                                        product.discountPercentage) /
                                        100
                            )}{' '}
                            <Currency right={7} bottom={10} size={20} />
                        </span>
                    </span>
                    <div
                        className="
                                relative inline-flex items-center text-gray-400
                                before:absolute before:left-0 before:right-0 
                                before:top-1/2 before:h-[1.5px] before:bg-gray-400
                                font-semibold
                              "
                    >
                        {formatCurrency(product.price)}{' '}
                        <Currency right={0} bottom={2} size={10} />
                    </div>
                    <span className="ml-4 bg-red-100 text-primary px-1 text-sm font-bold">
                        {`-${product.discountPercentage}%`}
                    </span>
                </div>
                <section className="flex mt-6">
                    <span className="shrink-0 text-gray-500">Vận chuyển</span>
                    <div className="ml-4 flex-col">
                        <div>{product.shippingInformation}</div>
                        <div className="text-green-700 font-semibold my-1">
                            Phí ship 0đ
                        </div>
                        <div className="text-gray-400 text-sm ">
                            Tặng Voucher 20.000₫ nếu đơn giao sau thời gian
                            trên.
                        </div>
                    </div>
                </section>

                <section className="flex items-center mt-3">
                    <div className="text-gray-500 text-[14px] uppercase">
                        bảo hành
                    </div>
                    <div className="ml-4">{product.warrantyInformation}</div>
                </section>

                <section className="flex gap-8 mt-8">
                    <span className="font-semibold text-gray-400">
                        Số lượng
                    </span>
                    <QuantityBox
                        disable={quantity === 1}
                        onIncrease={() => setQuantity(quantity + 1)}
                        onDecrease={() => setQuantity(quantity - 1)}
                        quantity={quantity}
                    />
                </section>

                <section className="flex gap-4 mt-7">
                    <button
                        onClick={handleAddToCart}
                        className="cursor-pointer hover:bg-red-100 border border-primary bg-red-50 text-md text-primary px-5 py-[8px]"
                    >
                        Thêm vào giỏ hàng
                    </button>
                    <button className="cursor-pointer hover:opacity-80 bg-primary px-12 py-[8px] text-white">
                        Mua ngay
                    </button>
                </section>
            </div>
        </div>
    )
}
