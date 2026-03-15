import Button from '@/components/ui/Button'
import Currency from '@/components/ui/Currency'
import { formatCurrency } from '@/utils/formatCurrency'
import Link from 'next/link'

type Props = {
    checkedId: string[]
    onCheckAll: (e: React.ChangeEvent<HTMLInputElement>) => void
    onRemoveMultiCartItem: () => void
    totalQuantity: number
    totalPrice: number
    onOrder: (productId: string) => void
}

export default function CartActionsBar({
    checkedId,
    onCheckAll,
    onRemoveMultiCartItem,
    totalQuantity,
    totalPrice,
    onOrder,
}: Props) {
    return (
        <div className="container mt-10 sticky shadow-xl border border-gray-300 h-25 px-4 bg-gray-50 z-0 bottom-2 ">
            <label
                htmlFor="checkall"
                className="w-60 cursor-pointer flex items-center p-4 gap-4 pl-0 select-none"
            >
                <input
                    onChange={onCheckAll}
                    id="checkall"
                    type="checkbox"
                    className=" w-5 h-5 accent-primary rounded cursor-pointer border-gray-300  focus:ring-primary"
                />{' '}
                <div className="text-black">
                    <span>Chọn tất cả</span>
                </div>
            </label>
            <Button
                disabled={checkedId.length === 0}
                onClick={onRemoveMultiCartItem}
                className="text-black hover:bg-gray-300"
            >
                Xóa
            </Button>
            <div className="flex absolute top-0 right-4 items-center h-full gap-4">
                <div className="text-lg">
                    Tổng cộng ( <span className="text-primary">{totalQuantity}</span> sản
                    phẩm) :{' '}
                    <span className="text-primary text-xl font-semibold">
                        {formatCurrency(totalPrice)}
                    </span>{' '}
                    <Currency
                        bottom={10}
                        className="text-[16px] font-semibold text-primary"
                    />
                </div>
                <Button
                    active
                    onClick={onOrder}
                    className="bg-primary bottom-0 w-40 h-12 text-xl text-white centerdiv rounded-md hover:bg-red-700"
                >
                    Mua hàng
                </Button>
            </div>
        </div>
    )
}
