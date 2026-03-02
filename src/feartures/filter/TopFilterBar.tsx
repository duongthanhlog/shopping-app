'use client'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { useFilter } from '@/feartures/filter/contexts/filter.context'
import { CheckIcon } from '@/public/icons'
import { ORDER, SORTBY, sortPriceSelections } from './constant'
import { OrderType, SortByType } from './types'

export default function TopFilterBar() {
    const [open, setOpen] = useState(false)
    const { order, sortBy, filterSlug, handleFilter } = useFilter()
    const [activeSelected, setActiveSelected] = useState<string>('Giá')

    const handleSelect = (
        value: string,
        order: OrderType,
        sortBy: SortByType
    ) => {
        setActiveSelected(value)
        handleFilter(filterSlug, order, sortBy)
        setOpen(false)
    }

    const handleSortFiltered = (
        slug: string,
        order: OrderType,
        sortBy: SortByType
    ) => {
        handleFilter(slug, order, sortBy)
    }

    return (
        <div className="flex bg-gray-200 text-[15px] px-4">
            <div className="flex gap-3 p-3 pl-0 items-center">
                <span className="font-semibold">Sắp xếp theo</span>
                <Button
                    active={
                        sortBy === SORTBY.CREATED_AT && order === ORDER.DESC
                    }
                    onClick={() =>
                        handleSortFiltered(
                            filterSlug,
                            ORDER.DESC,
                            SORTBY.CREATED_AT
                        )
                    }
                >
                    Mới nhất
                </Button>
                <Button
                    active={sortBy === SORTBY.CREATED_AT && order === ORDER.ASC}
                    onClick={() =>
                        handleSortFiltered(
                            filterSlug,
                            ORDER.ASC,
                            SORTBY.CREATED_AT
                        )
                    }
                >
                    Cũ nhất
                </Button>
                <Button
                    active={
                        sortBy === SORTBY.BESTSELLER && order === ORDER.DESC
                    }
                    onClick={() =>
                        handleSortFiltered(
                            filterSlug,
                            ORDER.DESC,
                            SORTBY.BESTSELLER
                        )
                    }
                >
                    Bán chạy
                </Button>
                <div className="relative">
                    <div
                        className={` ${sortBy === SORTBY.PRICE ? 'text-primary' : 'text-black'} select-none w-50 relative flex justify-between cursor-pointer bg-white font-semibold p-1 px-3`}
                        onClick={() => setOpen(!open)}
                    >
                        {activeSelected}
                        <span>▾</span>
                    </div>

                    {open && (
                        <div className="absolute left-0 font-semibold w-full bg-white shadow-md ">
                            {sortPriceSelections.map((item) => (
                                <div
                                    key={item.value}
                                    onClick={() =>
                                        handleSelect(
                                            item.text,
                                            item.value,
                                            item.sortBy
                                        )
                                    }
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full flex justify-between"
                                >
                                    {item.text}
                                    {order === item.value && (
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
                    <span className="text-primary">1</span>/9
                </span>
                <button className="cursor-pointer bg-white w-10 h-10 border border-gray-200">
                    {'<'}
                </button>
                <button className="cursor-pointer bg-white w-10 h-10 border border-gray-200">
                    {'>'}
                </button>
            </div>
        </div>
    )
}
