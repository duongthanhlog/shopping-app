'use client'
import Button from '@/components/ui/Button'
import { useModal } from '@/context/modal.context'
import { formatCurrency } from '@/utils/formatCurrency'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import useGetCheckout from '@/feartures/checkout/useGetCheckout'
import { CheckoutType } from '@/feartures/checkout/checkout.type'
import { useGetOrder } from '@/feartures/order/hooks/useGetOrder'

export default function CheckoutPage() {
    const { openModal } = useModal()
    const [payment, setPayment] = useState<'COD' | 'banking'>('COD')
    const { order } = useGetOrder()
    const { data } = useGetCheckout()

    const totalPrice = useMemo(() => {
        return data?.reduce((total: number, item: CheckoutType) => {
            return total + item?.productId?.price * item?.quantity
        }, 0)
    }, [data])

    return (
        <section className="mt-8 grid grid-cols-[5fr_2fr] gap-4">
            <div className="flex flex-col gap-4">
                <div className="bg-white px-6 py-4">
                    <span className="text-xl font-semibold text-black">
                        Địa chỉ nhận hàng
                    </span>
                    <div className="my-4 h-[1px] w-full bg-gray-300"></div>
                    {/* <div className="flex gap-2">
                        <div className="flex flex-col">
                            <div className=" bg-primary rounded-full w-7 h-7"></div>
                            <span className="mt-auto">icon</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-black font-semibold text-lg">
                                Dương Thanh Long
                            </span>
                            <span className="text-gray-500">
                                Số điện thoại: 0925633080
                            </span>
                            <span className="text-gray-500">
                                Địa chỉ : 3 đê la thành nhỏ , xã đàn, hà nội
                            </span>
                        </div>
                        <button className="ml-auto mb-auto font-semibold text-lg text-primary cursor-pointer">
                            Thay đổi
                        </button>
                    </div> */}
                    <span
                        className="cursor-pointer p-3"
                        onClick={() => openModal('orders')}
                    >
                        Thêm địa chỉ
                    </span>
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
                    {data?.map((item: CheckoutType) => {
                        const { _id, thumbnail, title, price } = item.productId
                        const lastOrderItem =
                            item._id === data[data.length - 1]?.productId._id

                        return (
                            <div key={_id}>
                                <div className="grid grid-cols-[6fr_3fr_2fr_4fr] items-center px-3">
                                    <div className="flex gap-3">
                                        <Image
                                            alt="order-item"
                                            width={50}
                                            height={50}
                                            src={thumbnail}
                                            className="border border-gray-300"
                                        />
                                        <div>{title}</div>
                                    </div>
                                    <span className="text-center">
                                        {formatCurrency(price)}
                                    </span>
                                    <span className="text-center">{item.quantity}</span>
                                    <span className="text-center">
                                        {formatCurrency(price * item.quantity)}
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
                        <span className="font-semibold">
                            {formatCurrency(totalPrice)}
                        </span>
                    </div>
                    <div className="flex justify-between text-lg">
                        <span>Phí vận chuyển:</span>
                        <span className="font-semibold">
                            {formatCurrency(order?.shippingFee)}
                        </span>
                    </div>
                    <div className="my-4 h-[0.5px] w-full bg-gray-300"></div>
                    <div className="flex justify-between">
                        <span className="text-xl font-semibold">Tổng cộng:</span>
                        <span className="text-primary text-2xl font-semibold">
                            {formatCurrency(order?.totalPrice)}
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
