import Image from 'next/image'
import Currency from '@/components/ui/Currency'
import { formatCurrency } from '../../../utils/formatCurrency'
import QuantityBox from '@/components/ui/Quantity.box'
import Link from 'next/link'
import { useState } from 'react'

import { CART_ACTION } from '../constants/cartAction'
import { ActionType, CartItemType } from '../type/cartItem.type'
import Button from '@/components/ui/Button'

type Props = {
    item: CartItemType
    onIncrease: ({ productId, delta }: { productId: string; delta: number }) => void
    onDecrease: ({
        productId,
        delta,
    }: {
        productId: string
        delta: number
        quantity: number
    }) => void
    onDelete: (productId: string) => void
    onOrder: (productId: string) => void
    className: string
    isPending: boolean
}

export default function CartItem({
    item,
    onIncrease,
    onDecrease,
    onDelete,
    onOrder,
    className,
    isPending,
}: Props) {
    const [action, setAction] = useState<ActionType | null>(null)
    if (!item) return null
    const { productId } = item

    const handleIncrease = () => {
        onIncrease({ productId, delta: +1 })
        setAction(CART_ACTION.INCREASE)
    }

    const handleDecrease = () => {
        onDecrease({ productId, delta: -1, quantity: item.quantity })
        setAction(CART_ACTION.DECREASE)
    }

    const handleDelete = () => {
        onDelete(productId)
    }

    return (
        <div className="container">
            <div className={`${className} select-none border-b border-gray-300 p-4`}>
                <Link href={`/products/${item?.productId}`} className="flex self-start">
                    <Image
                        width={80}
                        height={80}
                        src={item.thumbnail || '/no-image.png'}
                        alt=""
                        loading="eager"
                    />
                    <div className=" w-77.5 self-center">
                        <span className="line-clamp-2">{item.title}</span>
                    </div>
                </Link>
                <div className="centerdiv font-medium">
                    {formatCurrency(item.price)}
                    <Currency bottom={4} />
                </div>
                <QuantityBox
                    quantity={item.quantity}
                    disablePlus={isPending && action === CART_ACTION.INCREASE}
                    disableMinus={isPending && action === CART_ACTION.DECREASE}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                />
                <div className="centerdiv text-primary font-medium">
                    {formatCurrency(item.quantity * item.price)}
                    <span className="relative text-[10px] ml-[2px] bottom-[4px] underline">
                        đ
                    </span>
                </div>
                <div className="centerdiv">
                    {/* <Button
                        active
                        onClick={() => onOrder(item.productId)}
                        className="centerdiv bg-primary text-white p-2 rounded-md font-bold mr-4 cursor-pointer hover:bg-red-600"
                    >
                        Mua ngay
                    </Button> */}
                    <button
                        onClick={handleDelete}
                        className="centerdiv font-medium  cursor-pointer hover:underline"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    )
}
