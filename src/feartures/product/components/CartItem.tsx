import Image from 'next/image'
import Currency from '@/components/ui/Currency'
import { CartItemProps } from '../types/cart.type'
import { formatCurrency } from '../../../utils/formatNumber'
import QuantityBox from '@/components/ui/Quantity.box'
import Link from 'next/link'

export default function CartItem({ item, onIncrease, onDecrease, onDelete, className }: CartItemProps) {
    return (
        <div className="container">
            <div className={`${className} select-none border-b border-gray-300 p-4`}>
                <Link href={`/products/${item.id}`} className="centerdiv gap-4">
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
                    onIncrease={() => onIncrease(item)}
                    onDecrease={() => onDecrease(item)}
                />
                <div className="centerdiv text-primary font-medium">
                    {formatCurrency(item.quantity * item.price)}
                    <span className="relative text-[10px] ml-[2px] bottom-[4px] underline">đ</span>
                </div>
                <div className="centerdiv">
                    <button className="centerdiv bg-primary text-white p-2 rounded-md font-bold mr-4 cursor-pointer hover:bg-red-600">
                        Mua ngay
                    </button>
                    <button
                        onClick={() => onDelete(item)}
                        className="centerdiv font-medium mr-4 cursor-pointer hover:underline"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    )
}
