'use client'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { useFilter } from '@/feartures/filter/contexts/filter.context'
import { CheckIcon } from '@/public/icons'
import { ORDER, SORTBY, sortPriceSelections } from './constant'
import { OrderType, SortByType } from './types'
import { useSearchParams } from 'next/navigation'
import usePaginate from './hook/usePaginate'
import { useQuery } from '@tanstack/react-query'
import { getFilteredProducts } from './services/filter.service'

const sortOptions = [
    {
        label: 'Tốt nhất',
        sortBy: SORTBY.RATING,
        order: ORDER.DESC,
    },
    {
        label: 'Đánh giá xấu nhất',
        sortBy: SORTBY.RATING,
        order: ORDER.ASC,
    },
    {
        label: 'Bán chạy',
        sortBy: SORTBY.BESTSELLER,
        order: ORDER.DESC,
    },
]

export default function TopFilterBar() {
    const [open, setOpen] = useState(false)
    const { order, sortBy, category, handleFilter } = useFilter()
    const [activeSelected, setActiveSelected] = useState<string>('Giá')
    const { page, limit, skip, handleChangePage } = usePaginate()

    const { data } = useQuery({
        queryKey: ['filterd-product', category, order, limit, skip, sortBy],
        queryFn: () =>
            getFilteredProducts(category, order, limit, skip, sortBy),
        refetchOnWindowFocus: false,
        staleTime: 0,
    })
    console.log(sortBy)

    const totalPage = Math.ceil(data?.totalProduct / limit)

    const handleSelect = (
        value: string,
        order: OrderType,
        sortBy: SortByType
    ) => {
        setActiveSelected(value)
        handleFilter(category, order, sortBy)
        setOpen(false)
    }

    return (
        <div className="flex bg-gray-200 text-[15px] px-4">
            <div className="flex gap-3 p-3 pl-0 items-center">
                <span className="font-semibold">Sắp xếp theo</span>
                {sortOptions.map((option, i) => {
                    return (
                        <Button
                            key={i}
                            active={
                                sortBy === option.sortBy &&
                                order === option.order
                            }
                            onClick={() =>
                                handleFilter(
                                    category,
                                    option.order,
                                    option.sortBy
                                )
                            }
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
                        <div className="absolute left-0 font-semibold w-full bg-white shadow-md ">
                            {sortPriceSelections.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        handleSelect(
                                            item.text,
                                            item.order,
                                            item.sortBy
                                        )
                                    }}
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
                    <span>{!!totalPage && totalPage}</span>
                </span>
                <button
                    disabled={page < 1}
                    onClick={() => handleChangePage(page - 1)}
                    className="cursor-pointer bg-white w-10 h-10 border border-gray-200"
                >
                    {'<'}
                </button>
                <button
                    disabled={page === totalPage}
                    onClick={() => handleChangePage(page + 1)}
                    className="cursor-pointer bg-white w-10 h-10 border border-gray-200"
                >
                    {'>'}
                </button>
            </div>
        </div>
    )
}
