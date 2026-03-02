'use client'

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
    const arr = Array.from(
        { length: totalPage },
        (_, i) => totalPage - i
    ).reverse()

    return (
        <div className="flex justify-center gap-10 mt-10 mb-10">
            <button className="text-lg text-gray-400 cursor-pointer px-4 py-1">
                {'<'}
            </button>
            {Array(
                arr.map((item, i) => {
                    return (
                        <span
                            key={i}
                            onClick={() => onChange(item)}
                            className={`${page === item ? 'bg-primary text-white hover:text-white' : 'bg-none text-gray-400 hover:text-primary'} select-none px-4 py-1 text-semibold text-lg cursor-pointer rounded-sm `}
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
