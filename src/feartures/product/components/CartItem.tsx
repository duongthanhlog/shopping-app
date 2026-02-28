import Image from 'next/image'
import Currency from '@/components/ui/currency'
import { CartItemProps } from '../types/cart.type'
import { formatCurrency } from '../../../utils/formatNumber'
import QuantityBox from '@/components/ui/Quantity.box'
import Link from 'next/link'

export default function CartItem({ item, actions }: CartItemProps) {
    return (
        <div className="grid grid-cols-[1fr_3fr_2fr_2fr_2fr] justify-center border-b border-gray-300 p-4">
            <Link
                href={`/product/${item.id}`}
                className="flex gap-4 items-center"
            >
                <Image width={80} height={80} src={item.thumbnail} alt="" />
                <div className=" w-[310px]">
                    <span className="line-clamp-2">{item.title}</span>
                </div>
            </Link>
            <div className="centerdiv font-medium">
                {formatCurrency(item.price)}
                <Currency bottom={4} />
            </div>
            <QuantityBox
                quantity={item.quantity}
                onIncrease={() => actions.onIncrease(item)}
                onDecrease={() => actions.onDecrease(item)}
            />
            <div className="centerdiv text-primary font-medium">
                {formatCurrency(item.quantity * item.price)}
                <span className="relative text-[10px] ml-[2px] bottom-[4px] underline">
                    đ
                </span>
            </div>
            <div className="flex items-center">
                <button className="centerdiv bg-primary text-white p-2 rounded-md font-bold mr-4 cursor-pointer hover:bg-red-600">
                    Mua ngay
                </button>
                <button
                    onClick={() => actions.onDelete(item)}
                    className="centerdiv font-medium mr-4 cursor-pointer hover:underline"
                >
                    Xóa
                </button>
            </div>
        </div>
    )
}
