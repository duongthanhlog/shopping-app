'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useGetUser from '@/feartures/auth/hooks/useGetUser'
import FullScreenSpinner from '@/components/ui/FullScreenSpinner'
import { useEffect, useMemo, useState } from 'react'
import { useModal } from '@/context/modal.context'
import { useToast } from '@/feartures/toast/toast.context'
import useGetUserCart from '@/feartures/cart/hooks/useGetUserCart'
import useUpdateCart from '@/feartures/cart/hooks/useUpdateCart'
import { CartItemType } from '@/feartures/cart/type/cartItem.type'
import CartItem from '@/feartures/cart/components/CartItem'
import CartActionsBar from '@/feartures/cart/components/CartActionsBar'
import CartSkeleton from '@/components/ui/skeletons/CartSkeleton'
import useDeleteProducts from '@/feartures/cart/hooks/useDeleteCart'

export default function CartPage() {
    const router = useRouter()
    const { user, isLoading } = useGetUser()
    const { data, isSuccess } = useGetUserCart()
    const { onIncrease, onDecrease, pendingId } = useUpdateCart()
    const { deleteMutate, isPending } = useDeleteProducts()
    const { openConfirm, closeModal } = useModal()
    const { showToast } = useToast()
    const [checkedId, setCheckedId] = useState([])

    const cart = data ?? []
    useEffect(() => {
        if (!user && !isLoading) {
            router.replace('/')
        }
    }, [user, isLoading, router])

    const cartItemChecked = useMemo(
        () => cart.filter((item: CartItemType) => checkedId.includes(item.productId)),
        [cart, checkedId]
    )

    const total = useMemo(() => {
        const totalCartQuantity = cartItemChecked.reduce(
            (total: number, item: CartItemType) => total + item.quantity,
            0
        )
        const totalCartChecked = cartItemChecked.reduce(
            (total: number, item: CartItemType) => total + item.price * item.quantity,
            0
        )
        return {
            quantity: totalCartQuantity,
            price: totalCartChecked,
        }
    }, [cart, checkedId])

    const handleIncrease = (product: CartItemType) => {
        onIncrease(product)
    }

    const handleDecrease = (product: CartItemType, quantity: number) => {
        if (quantity === 1) {
            openConfirm({
                title: 'Bạn chắc chắn muốn xóa sản phẩm khỏi giỏ hàng ?',
                onConfirm: () => {
                    deleteMutate(product)
                    closeModal()
                },
            })
            return
        }
        onDecrease(product)
    }

    const handleDelete = (product: CartItemType) => {
        openConfirm({
            title: 'Bạn chắc chắn muốn xóa sản phẩm ?',
            onConfirm: () => {
                deleteMutate(product)
                setCheckedId((prev) =>
                    prev.filter((checkedId) => checkedId !== product.productId)
                )
                showToast('success', 'Đã xóa sản phẩm')
                closeModal()
            },
        })
    }

    const handleRemoveMultiCartItem = () => {
        openConfirm({
            title: `Xóa ${cartItemChecked.length} sản phẩm đã chọn?`,
            onConfirm: async () => {
                await Promise.all(
                    cartItemChecked.map((item: CartItemType) => deleteMutate(item))
                )
                showToast('success', `Đã xóa ${cartItemChecked.length} sản phẩm`)
                closeModal()
            },
        })
    }

    const handleCheckAll = (e: any) => {
        if (e.target.checked) {
            setCheckedId(() => {
                const currentCartItemsId = cart.map((item: CartItemType) => {
                    return item.productId
                })

                return currentCartItemsId
            })
        } else {
            setCheckedId([])
        }
    }

    const handleCheck = (e: any, productId: string) => {
        if (e.target.checked) {
            setCheckedId((prev) => [...prev, productId])
        } else {
            setCheckedId((prev) => prev.filter((checkItem) => checkItem !== productId))
        }
    }

    if (isLoading) return <CartSkeleton />
    if (isPending) return <FullScreenSpinner />
    if (isSuccess && cart.length === 0) {
        return (
            <div className="flex justify-center select-none h-[calc(100vh-300px)]">
                <Image
                    alt="Empty cart"
                    width={600}
                    loading="eager"
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
                <div className="text-primary text-[30px] container py-5">
                    Giỏ hàng của bạn{' '}
                </div>
            </div>
            <div className="bg-white container">
                <div className={`text-gray-500 ${cartGrid} p-4 my-4 pl-8 select-none`}>
                    <div className="">Sản phẩm</div>
                    <div className="centerdiv">Đơn giá</div>
                    <div className="centerdiv">Số lượng</div>
                    <div className="centerdiv">Số tiền</div>
                    <div className="centerdiv">Thao tác</div>
                </div>
            </div>
            <div className="bg-white py-5 ">
                <div className="container">
                    <ul className="min-h-[65vh] border-t border-gray-300">
                        {cart.map((item: CartItemType) => {
                            return (
                                <div key={item.productId} className="flex items-center">
                                    <input
                                        onChange={(e) => handleCheck(e, item.productId)}
                                        checked={checkedId.includes(item.productId)}
                                        type="checkbox"
                                        className=" w-5 h-5 accent-primary rounded cursor-pointer border-gray-300  focus:ring-primary"
                                    />
                                    <CartItem
                                        isPending={pendingId === item.productId}
                                        onIncrease={handleIncrease}
                                        onDecrease={handleDecrease}
                                        onDelete={handleDelete}
                                        item={item}
                                        className={cartGrid}
                                    />
                                </div>
                            )
                        })}
                    </ul>
                    <CartActionsBar
                        checkedId={checkedId}
                        onCheckAll={handleCheckAll}
                        onRemoveMultiCartItem={handleRemoveMultiCartItem}
                        totalQuantity={total.quantity}
                        totalPrice={total.price}
                    />
                </div>
            </div>
        </>
    )
}
