'use client'
import Button from '@/components/ui/Button'
import { useModal } from '@/context/modal.context'
import { formatCurrency } from '@/utils/formatCurrency'
import { useState } from 'react'
import Image from 'next/image'
import { CheckoutType } from '@/feartures/checkout/checkout.type'
import { AdressIcon, MapIcon } from '@/public/icons'
import useGetCheckout from '@/feartures/checkout/hooks/useGetCheckout'
import useGetUser from '@/feartures/auth/hooks/useGetUser'
import { Adresses } from 'app/models/User'
import FullScreenSpinner from '@/components/ui/FullScreenSpinner'

export default function CheckoutPage() {
    const { openModal } = useModal()
    const [payment, setPayment] = useState<'COD' | 'banking'>('COD')
    const { data, isLoading } = useGetCheckout()
    const { user } = useGetUser()

    const checkoutList = (user && data?.checkoutList) || []
    const totalPrice = data?.totalPrice || 0
    const subTotal = data?.subTotal || 0
    const shippingFee = data?.shippingFee || 0
    const addressList = user?.addresses || []

    if (isLoading) return <FullScreenSpinner />
    return (
        <section className="mt-8 grid grid-cols-[5fr_2fr] gap-4">
            <div className="flex flex-col gap-4">
                <div className="bg-white px-6 py-4">
                    <span className="text-xl font-semibold text-black">
                        Địa chỉ nhận hàng
                    </span>
                    <div className="my-4 h-[1px] w-full bg-gray-300"></div>
                    {addressList.map((item: Adresses) => {
                        return (
                            <div key={item._id}>
                                <div className="flex gap-2">
                                    <div className="flex flex-col items-center">
                                        {/* <div className="bg-primary h-7 w-7 rounded-full"></div> */}
                                        <MapIcon className="text-primary mt-auto w-4 pb-1" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-semibold text-black">
                                            {item.fullName}
                                        </span>
                                        <span className="text-gray-500">
                                            Số điện thoại: {item.phone}
                                        </span>
                                        <span className="text-[14px] text-gray-500">
                                            Địa chỉ : {item.address} {item.ward}-{' '}
                                            {item.district}-{item.province}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            openModal('address')
                                        }}
                                        className="text-primary mb-auto ml-auto cursor-pointer text-lg text-[16px] font-semibold"
                                    >
                                        Thay đổi
                                    </button>
                                </div>
                                <div className="my-4 h-[0.5px] w-full bg-gray-300"></div>
                            </div>
                        )
                    })}
                    {/* {addressList.length === 0 && ( */}
                    <span
                        className="text-primary mt-2 flex cursor-pointer items-center gap-0.5"
                        onClick={() => openModal('orders')}
                    >
                        <AdressIcon className="h-5 w-5" /> Thêm địa chỉ
                    </span>
                    {/* )} */}
                </div>
                <div className="bg-white px-6 py-4">
                    <span className="text-xl font-semibold">Sản phẩm</span>
                    <div className="my-4 h-[0.5px] w-full bg-gray-300"></div>

                    <div className="grid grid-cols-[6fr_3fr_2fr_4fr] bg-gray-50 p-2 px-3 text-center">
                        <span className="text-left">Tên sản phẩm</span>
                        <span className="">Giá</span>
                        <span className="">Số lượng</span>
                        <span className="">Tổng</span>
                    </div>
                    {checkoutList?.map((item: CheckoutType) => {
                        const lastOrderItem =
                            item._id === checkoutList[checkoutList?.length - 1]?._id

                        return (
                            <div key={item._id}>
                                <div className="grid grid-cols-[6fr_3fr_2fr_4fr] items-center px-3">
                                    <div className="flex gap-3">
                                        <Image
                                            alt="order-item"
                                            width={50}
                                            height={50}
                                            src={item.thumbnail}
                                            className="border border-gray-300"
                                        />
                                        <div>{item.title}</div>
                                    </div>
                                    <span className="text-center">
                                        {formatCurrency(item.price)}
                                    </span>
                                    <span className="text-center">{item.quantity}</span>
                                    <span className="text-center">
                                        {formatCurrency(item.price * item.quantity)}
                                    </span>
                                </div>
                                {!lastOrderItem ? (
                                    <div className="my-3 h-[0.5px] w-full bg-gray-300"></div>
                                ) : null}
                            </div>
                        )
                    })}

                    <div className="mt-8">
                        <div className="text-xl font-semibold">
                            Phương thức thanh toán
                        </div>
                        <div className="my-4 h-[0.5px] w-full bg-gray-300"></div>

                        <div className="flex flex-col gap-1">
                            <div
                                onClick={() => setPayment('COD')}
                                className="flex cursor-pointer items-center gap-2"
                            >
                                <span
                                    className={`h-5 w-5 rounded-full border-4 border-gray-300 bg-white ${payment === 'COD' ? 'border-primary' : ''}`}
                                ></span>
                                COD
                            </div>
                            <div
                                onClick={() => setPayment('banking')}
                                className="flex cursor-pointer items-center gap-2"
                            >
                                <span
                                    className={`h-5 w-5 rounded-full border-4 border-gray-300 bg-white ${payment === 'banking' ? 'border-primary' : ''}`}
                                ></span>
                                Chuyển khoản ngân hàng
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" ">
                <div className="bg-white p-6">
                    <span className="text-lg font-semibold">Tóm tắt đơn hàng</span>
                    <div className="my-4 h-[0.5px] w-full bg-gray-300"></div>
                    <div className="flex justify-between text-lg">
                        <span>Tổng tiền hàng:</span>
                        <span className="font-semibold">{formatCurrency(subTotal)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                        <span>Phí vận chuyển:</span>
                        <span className="font-semibold">
                            {checkoutList.length && formatCurrency(shippingFee)}
                        </span>
                    </div>
                    <div className="my-4 h-[0.5px] w-full bg-gray-300"></div>
                    <div className="flex justify-between">
                        <span className="text-xl font-semibold">Tổng cộng:</span>
                        <span className="text-primary text-2xl font-semibold">
                            {formatCurrency(totalPrice)}
                        </span>
                    </div>
                    <Button
                        active
                        className="mt-4 w-full py-3 text-xl font-medium hover:bg-red-700"
                    >
                        Đặt hàng
                    </Button>
                </div>
            </div>
        </section>
    )
}
