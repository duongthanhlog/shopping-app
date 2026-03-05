'use client'

type Props = {
    quantity: number
    disablePlus?: boolean
    disableMinus?: boolean
    onIncrease?: () => void
    onDecrease?: () => void
}

export default function QuantityBox({ quantity, disableMinus, disablePlus, onIncrease, onDecrease }: Props) {
    return (
        <div className={`border border-gray-300 h-9 centerdiv ml-px`}>
            <button
                disabled={disableMinus}
                onClick={onDecrease}
                className={`${disableMinus ? 'text-gray-300' : 'opacity-100'} w-10 cursor-pointer border-r text-[24px] border-gray-300 h-full centerdiv`}
            >
                -
            </button>
            <input value={quantity} type="text" className="text-center w-12.5" readOnly />
            <button
                disabled={disablePlus}
                onClick={onIncrease}
                className={`${disablePlus ? 'text-gray-300' : 'opacity-100'} text-gray-300' : ' cursor-pointer'} w-[40px] cursor-pointer border-l text-[24px] border-gray-300 h-full centerdiv`}
            >
                +
            </button>
        </div>
    )
}
