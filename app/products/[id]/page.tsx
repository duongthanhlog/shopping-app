'use client'
import Image from 'next/image'
import Currency from '@/components/ui/Currency'
import { formatCurrency } from '@/utils/formatCurrency'
import QuantityBox from '@/components/ui/Quantity.box'
import { useModal } from '@/context/modal.context'
import { useState } from 'react'
import PercentRating from '@/utils/canculateRating'
import { useParams, useRouter } from 'next/navigation'
import useGetDetailProduct from '@/feartures/product/hooks/useGetDetailProduct'
import ProductDetailSkeleton from '@/components/ui/skeletons/ProductDetailSkeleton'
import useGetUser from '@/feartures/auth/hooks/useGetUser'
import { useToast } from '@/feartures/toast/toast.context'
import useUpdateCart from '@/feartures/cart/hooks/useUpdateCart'
import useUpdateCheckout from '@/feartures/checkout/useUpdateCheckout'

export default function ProductDetail() {
    const router = useRouter()
    const { user } = useGetUser()
    const { openModal, openConfirm } = useModal()
    const { onIncrease, isPending } = useUpdateCart()
    const [quantity, setQuantity] = useState(1)
    const { showToast } = useToast()
    const { id } = useParams<{ id: string }>()
    const { product, isLoading } = useGetDetailProduct(id)
    const { mutateAsync } = useUpdateCheckout()

    const checkoutProduct = {
        productId: product?._id,
        quantity,
    }

    const handleAddToCart = () => {
        if (!user) {
            openConfirm({
                title: 'Vui lòng đăng nhập',
                onConfirm: () => openModal('login'),
            })
            return
        }
        onIncrease({ productId: id, delta: quantity })
        showToast('success', 'Đã thêm vào giỏ hàng')
    }

    const handleIncrease = () => setQuantity((prev) => prev + 1)

    const handleDecrease = () => {
        setQuantity((prev) => prev - 1)
    }

    const handleCheckout = async () => {
        await mutateAsync([checkoutProduct])
        router.push('/checkout')
    }

    if (isLoading) return <ProductDetailSkeleton />
    return (
        <div className="mt-6 flex bg-white pt-5">
            <Image
                width={200}
                height={200}
                src={product.thumbnail}
                alt=""
                loading="eager"
                className="flex-3 p-4"
            />
            <div className="flex-4 px-5">
                <span className="bg-primary mr-2 shrink-0 rounded-sm px-2 text-[12px] text-white">
                    Yêu thích
                </span>
                <span className="mt-2 text-[20px] leading-5">{product.description}</span>
                <div className="flex items-center">
                    <div className="mt-2.5 flex items-center gap-4 divide-x divide-gray-300 font-medium text-gray-600">
                        <span className="pr-4">
                            <span className="flex underline underline-offset-3">
                                <span className="font-semibold">
                                    {Math.ceil(product.rating * 10) / 10}
                                </span>
                                <span className="mt-0.75 ml-2 flex w-25">
                                    {PercentRating(product.rating)}
                                </span>
                            </span>
                        </span>
                        <span className="text-md pr-4">
                            <span className="mr-1 text-[16px] font-semibold text-black underline underline-offset-3">
                                {product?.tags?.length === 0
                                    ? 'Chưa có đánh giá'
                                    : product.reviews.length}
                            </span>{' '}
                            Đánh giá
                        </span>
                        <span className="text-md pr-4">
                            Đã bán
                            <span className="ml-2 text-[16px] font-semibold text-black underline underline-offset-3">
                                {product.minimumOrderQuantity}
                            </span>{' '}
                        </span>
                    </div>
                    <span className="mt-2 mr-2 ml-auto font-semibold">
                        Tồn kho :{' '}
                        <span className="text-primary font-semibold underline">
                            {product.stock}
                        </span>
                    </span>
                </div>
                <div className="mt-5 flex items-center bg-gray-100 px-[20px] py-[15px]">
                    <span className="text-primary text-[30px] font-normal">
                        <span className="px-2">
                            {formatCurrency(
                                product.price -
                                    (product.price * product.discountPercentage) / 100
                            )}{' '}
                            <Currency right={7} bottom={10} size={20} />
                        </span>
                    </span>
                    <div className="relative inline-flex items-center font-semibold text-gray-400 before:absolute before:top-1/2 before:right-0 before:left-0 before:h-[1.5px] before:bg-gray-400">
                        {formatCurrency(product.price)}đá{' '}
                        <Currency right={0} bottom={2} size={10} />
                    </div>
                    <span className="text-primary ml-4 bg-red-100 px-1 text-sm font-bold">
                        {`-${product.discountPercentage}%`}
                    </span>
                </div>
                <section className="mt-6 flex">
                    <span className="shrink-0 text-gray-500">Vận chuyển</span>
                    <div className="ml-4 flex-col">
                        <div>{product.shippingInformation}</div>
                        <div className="my-1 font-semibold text-green-700">
                            Phí ship 0đ
                        </div>
                        <div className="text-sm text-gray-400">
                            Tặng Voucher 20.000₫ nếu đơn giao sau thời gian trên.
                        </div>
                    </div>
                </section>

                <section className="mt-3 flex items-center">
                    <div className="text-[14px] text-gray-500 uppercase">bảo hành</div>
                    <div className="ml-4">{product.warrantyInformation}</div>
                </section>

                <section className="mt-8 flex gap-8">
                    <span className="font-semibold text-gray-400">Số lượng</span>
                    <QuantityBox
                        disableMinus={quantity === 1}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                        quantity={quantity}
                    />
                </section>

                <section className="mt-7 flex gap-4">
                    <button
                        disabled={isPending}
                        onClick={handleAddToCart}
                        className="border-primary text-md text-primary cursor-pointer border bg-red-50 px-5 py-[8px] hover:bg-red-100"
                    >
                        Thêm vào giỏ hàng
                    </button>
                    <button
                        onClick={handleCheckout}
                        className="bg-primary cursor-pointer px-12 py-[8px] text-white hover:opacity-80"
                    >
                        Mua ngay
                    </button>
                </section>
            </div>
        </div>
    )
}
