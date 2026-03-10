import Image from 'next/image'
import Currency from '@/components/ui/Currency'
import { formatCurrency } from '../../../utils/formatCurrency'
import QuantityBox from '@/components/ui/Quantity.box'
import Link from 'next/link'
import { useState } from 'react'

import { CART_ACTION } from '../constants/cartAction'
import { ActionType, CartItemType } from '../type/cartItem.type'

type Props = {
    item: CartItemType
    onIncrease: (id: string) => void
    onDecrease: (id: string, quantity: number) => void
    onDelete: (id: string) => void
    className: string
    isPending: boolean
}

export default function CartItem({
    item,
    onIncrease,
    onDecrease,
    onDelete,
    className,
    isPending,
}: Props) {
    const [action, setAction] = useState<ActionType | null>(null)
    if (!item.productId) return null

    const handleIncrease = () => {
        onIncrease(item.productId._id)
        setAction(CART_ACTION.INCREASE)
    }

    const handleDecrease = () => {
        onDecrease(item.productId._id, item.quantity)
        setAction(CART_ACTION.DECREASE)
    }

    const handleDelete = () => {
        onDelete(item.productId._id)
    }

    return (
        <div className="container">
            <div className={`${className} select-none border-b border-gray-300 p-4`}>
                <Link
                    href={`/products/${item.productId._id}`}
                    className="centerdiv gap-4"
                >
                    <Image
                        width={80}
                        height={80}
                        src={item.productId.thumbnail || '/no-image.png'}
                        alt=""
                    />
                    <div className=" w-77.5">
                        <span className="line-clamp-2">{item.productId.title}</span>
                    </div>
                </Link>
                <div className="centerdiv font-medium">
                    {formatCurrency(item.productId.price)}
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
                    {formatCurrency(item.quantity * item.productId.price)}
                    <span className="relative text-[10px] ml-[2px] bottom-[4px] underline">
                        đ
                    </span>
                </div>
                <div className="centerdiv">
                    <button className="centerdiv bg-primary text-white p-2 rounded-md font-bold mr-4 cursor-pointer hover:bg-red-600">
                        Mua ngay
                    </button>
                    <button
                        onClick={handleDelete}
                        className="centerdiv font-medium mr-4 cursor-pointer hover:underline"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    )
}
