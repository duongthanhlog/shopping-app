'use client'

import { getPage } from '@/utils/customBotPaginate'

interface PropsType {
    totalPage: number
    onChange: (num: number) => void
    page: number
}

export default function BottomPaginationNav({
    totalPage,
    onChange,
    page,
}: PropsType) {
    return (
        <>
            <div className="flex justify-center gap-10 mt-10 mb-10">
                {page !== 1 && (
                    <button
                        onClick={() => onChange(page - 1)}
                        className="text-gray-500 text-lg  cursor-pointer px-4 py-1"
                    >
                        {'<'}
                    </button>
                )}
                {getPage(page, totalPage).map((item, i) => {
                    return (
                        <button
                            key={i}
                            onClick={() => {
                                if (typeof item !== 'string') {
                                    onChange(item)
                                }
                            }}
                            className={`${page === item ? 'bg-primary text-white hover:text-white' : 'bg-none text-gray-400 hover:text-primary'} select-none px-4 py-1 text-semibold text-lg cursor-pointer rounded-sm `}
                        >
                            {item}
                        </button>
                    )
                })}
                {page !== totalPage && (
                    <button
                        onClick={() => onChange(page + 1)}
                        className="text-gray-400 text-lg  cursor-pointer px-4 py-1"
                    >
                        {'>'}
                    </button>
                )}
            </div>
        </>
    )
}
