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
        <div className="flex bg-gray-200 text-[15px] px-4">
            <div className="flex gap-3 p-3 pl-0 items-center">
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

                <div className="relative">
                    <div
                        className={` ${sortBy === SORTBY.PRICE ? 'text-primary' : 'text-black'} select-none w-50 relative flex justify-between cursor-pointer bg-white font-semibold p-1 px-3`}
                        onClick={() => setOpen(!open)}
                    >
                        {activeSelected}
                        <span>▾</span>
                    </div>

                    {open && (
                        <div className="absolute left-0 font-semibold w-full bg-white shadow-md z-10">
                            {sortPriceSelections.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() =>
                                        handleSelect(item.text, item.order, item.sortBy)
                                    }
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full flex justify-between"
                                >
                                    {item.text}
                                    {item.sortBy === sortBy &&
                                        activeSelected === item.text && (
                                            <CheckIcon className="w-4 h-4 text-primary" />
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
                    className={`${page === 1 && 'opacity-50'} cursor-pointer bg-white w-10 h-10 border border-gray-200`}
                >
                    {'<'}
                </button>
                <button
                    disabled={page === totalPages || isFetching}
                    onClick={() => onChange(page + 1)}
                    className={`${page === totalPages && 'opacity-50'} cursor-pointer bg-white w-10 h-10 border border-gray-200`}
                >
                    {'>'}
                </button>
            </div>
        </div>
    )
}
