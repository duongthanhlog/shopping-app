'use client'
import CartItem from '../../src/feartures/product/components/CartItem'
import { useMutation, useQuery } from '@tanstack/react-query'
import useAuthLogin from '../../src/feartures/auth/auth.hook'
import {
    deleteCartItem,
    getUserCart,
    updateCartquantity,
} from '../../src/feartures/product/services/product.cart.service'
import { useToast } from '../../src/feartures/toast/toast.context'
import { queryClient } from '../../src/lib/query-client'
import {
    ActionType,
    CartItemActions,
} from '../../src/feartures/product/types/cart.type'
import { Card } from '../../src/feartures/product/types/card.type'
import { CART_ACTION } from '../../src/feartures/product/constants/cart'
import Image from 'next/image'
import { useModal } from '../../src/context/modal.context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CartPage() {
    const router = useRouter()
    const { data: user, isLoading } = useAuthLogin()
    const { showToast } = useToast()
    const { openConfirm, closeModal } = useModal()

    const { data } = useQuery<Card[]>({
        queryKey: ['cart', user?.id],
        queryFn: () => getUserCart(user),
        enabled: !!user?.id,
    })

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/')
        }
    }, [user, isLoading])

    const { mutate: updateMutate } = useMutation({
        mutationFn: (payload: { card: Card; type: ActionType }) => {
            return updateCartquantity(payload, user)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart'],
            })
        },
        onError: (error) => {
            showToast('error', error.message)
        },
    })

    const { mutate: deleteMutate } = useMutation({
        mutationFn: (card: Card) => deleteCartItem(card, user),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart'],
            })
        },
        onError: (error) => {
            showToast('error', error.message)
        },
    })

    const handleDelete = (card: Card) => {
        deleteMutate(card)
    }

    const handleIncrease = (card: Card) => {
        updateMutate({ card, type: CART_ACTION.INCREASE })
    }
    const handleDecrease = (card: Card) => {
        if (card.quantity === 1) {
            openConfirm({
                title: 'Bạn chắc chắn muốn xóa sản phẩm khỏi giỏ hàng ?',
                onConfirm: () => {
                    closeModal()
                    updateMutate({ card, type: CART_ACTION.DECREASE })
                },
            })
            return
        }
        updateMutate({ card, type: CART_ACTION.DECREASE })
    }

    const actions: CartItemActions = {
        onDelete: handleDelete,
        onIncrease: handleIncrease,
        onDecrease: handleDecrease,
    }

    if (data?.length === 0) {
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
    if (!data) return null
    return (
        <>
            <div className="bg-white">
                <div className="text-primary text-[30px] container py-5">
                    Giỏ hàng của bạn{' '}
                </div>
            </div>
            <div className="bg-white mt-4">
                <div className="container"></div>
            </div>
            <div className="bg-white mt-4 py-5">
                <div className="container">
                    <ul className="">
                        {data.map((item, i) => {
                            return (
                                <CartItem
                                    actions={actions}
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
