'use client'

import { useState } from 'react'

export default function BottomPaginationNav() {
    const [active, setActive] = useState(0)
    return (
        <div className="flex justify-center gap-10 mt-10 mb-10">
            <button className="text-lg text-gray-400 cursor-pointer px-4 py-1">
                {'<'}
            </button>
            {Array(
                [1, 2, 3, 4, 5].map((item, i) => {
                    return (
                        <span
                            key={i}
                            onClick={() => setActive(i)}
                            className={`${active === i ? 'bg-primary text-white hover:text-white' : 'bg-none text-gray-400 hover:text-primary'} select-none px-4 py-1 text-semibold text-lg cursor-pointer rounded-sm `}
                        >
                            {item}
                        </span>
                    )
                })
            )}
            <button className="text-lg text-gray-400 cursor-pointer px-4 py-1">
                {'>'}
            </button>
        </div>
    )
}
