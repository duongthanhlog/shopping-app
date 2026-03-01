'use client'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { useFilter } from '@/feartures/filter/filter.context'
import { CheckIcon } from '@/public/icons'
import { sort, sortPriceSelections } from './constant'
import { SortWith } from './types'

export default function TopFilterBar() {
    const [open, setOpen] = useState(false)
    const { SortWith, filterSlug, handleFilter } = useFilter()
    const [activeSelected, setActiveSelected] = useState<string>('Giá')

    const handleSelect = (value: string, sortOption: SortWith) => {
        setActiveSelected(value)
        handleFilter(filterSlug, sortOption)
        setOpen(false)
    }

    const handleSortFiltered = (slug: string, SortWith: SortWith) => {
        handleFilter(slug, SortWith)
    }

    return (
        <div className="flex bg-gray-200 text-[15px] px-4">
            <div className="flex gap-3 p-3 pl-0 items-center">
                <span className="font-semibold">Sắp xếp theo</span>
                <Button
                    active={SortWith === sort.NEWEST}
                    onClick={() => handleSortFiltered(filterSlug, sort.NEWEST)}
                >
                    Mới nhất
                </Button>
                <Button
                    active={SortWith === sort.OLDER}
                    onClick={() => handleSortFiltered(filterSlug, sort.OLDER)}
                >
                    Cũ nhất
                </Button>
                <Button
                    active={SortWith === sort.BEST_SELLER}
                    onClick={() =>
                        handleSortFiltered(filterSlug, sort.BEST_SELLER)
                    }
                >
                    Bán chạy
                </Button>
                <div className="relative">
                    <div
                        className={` ${SortWith === sort.HIGH_PRICE_LOW || SortWith === sort.LOW_PRICE_HIGH ? 'text-primary' : 'text-black'} select-none w-50 relative flex justify-between cursor-pointer bg-white font-semibold p-1 px-3`}
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
                                        handleSelect(item.text, item.value)
                                    }
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full flex justify-between"
                                >
                                    {item.text}
                                    {SortWith === item.value && (
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
