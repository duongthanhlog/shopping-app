'use client'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { CheckIcon } from '@/public/icons'
import { SORTBY, sortOptions, sortPriceSelections } from '../constant'
import { OrderType, SortByType } from '../types'
import useFilter from '../hook/useFilter'

export default function TopFilterBar({ totalPages, onChange, isFetching }) {
    const [open, setOpen] = useState(false)
    const [activeSelected, setActiveSelected] = useState<string>('Giá')

    const { page, sortBy, order, handleSortBy, handleResetFilter } = useFilter()

    const handleSelect = (value: string, order: OrderType, sortBy: SortByType) => {
        setActiveSelected(value)
        setOpen(false)
        handleSortBy(sortBy, order)
    }

    return (
        <div className="flex bg-gray-200 px-4 text-[15px]">
            <div className="flex items-center gap-3 p-3 pl-0">
                <span className="font-semibold">Sắp xếp theo</span>
                {sortOptions.map((option, i) => {
                    return (
                        <Button
                            key={i}
                            active={sortBy === option.sortBy && order === option.order}
                            onClick={() => {
                                handleSortBy(option.sortBy, option.order)
                            }}
                        >
                            {option.label}
                        </Button>
                    )
                })}

                <div
                    onMouseLeave={() => setOpen(false)}
                    onMouseEnter={() => setOpen(true)}
                    className="relative"
                >
                    <div
                        className={` ${sortBy === SORTBY.PRICE ? 'text-primary' : 'text-black'} relative flex w-50 cursor-pointer justify-between bg-white p-1 px-3 font-semibold select-none`}
                        onClick={() => setOpen(!open)}
                    >
                        {activeSelected}
                        <span>▾</span>
                    </div>

                    {open && (
                        <div
                            className={`absolute left-0 z-10 w-full bg-white font-semibold shadow-md`}
                        >
                            {sortPriceSelections.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() =>
                                        handleSelect(item.text, item.order, item.sortBy)
                                    }
                                    className="flex w-full cursor-pointer justify-between px-4 py-2 hover:bg-gray-100"
                                >
                                    {item.text}
                                    {item.sortBy === sortBy &&
                                        activeSelected === item.text && (
                                            <CheckIcon className="text-primary h-4 w-4" />
                                        )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="ml-auto flex items-center">
                <span className="mr-4">
                    <span className="text-primary">{page}</span>/
                    <span>{!!totalPages && totalPages}</span>
                </span>
                <button
                    disabled={page < 1 || isFetching}
                    onClick={() => onChange(page - 1)}
                    className={`${page === 1 && 'opacity-50'} h-10 w-10 cursor-pointer border border-gray-200 bg-white`}
                >
                    {'<'}
                </button>
                <button
                    disabled={page === totalPages || isFetching}
                    onClick={() => onChange(page + 1)}
                    className={`${page === totalPages && 'opacity-50'} h-10 w-10 cursor-pointer border border-gray-200 bg-white`}
                >
                    {'>'}
                </button>
            </div>
        </div>
    )
}
