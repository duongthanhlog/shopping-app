'use client'

type Props = {
    quantity: number
    disable?: boolean
    onIncrease?: () => void
    onDecrease?: () => void
}

export default function QuantityBox({
    quantity,
    disable,
    onIncrease,
    onDecrease,
}: Props) {
    return (
        <div className={`border border-gray-300 h-[36px] centerdiv ml-[1px]`}>
            <button
                disabled={disable}
                onClick={onDecrease}
                className={`${disable ? 'cursor-default text-gray-300' : ' cursor-pointer'} w-[40px] cursor-pointer border-r text-[24px] border-gray-300 h-full centerdiv`}
            >
                -
            </button>
            <input
                value={quantity}
                type="text"
                className="text-center w-[50px]"
                readOnly
            />
            <button
                onClick={onIncrease}
                className="w-[40px] text-[24px] border-l border-gray-300 h-full cursor-pointer centerdiv"
            >
                +
            </button>
        </div>
    )
}
