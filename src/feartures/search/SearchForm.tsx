import useFilter from '@/feartures/filter/hook/useFilter'
import { ProductType } from '@/feartures/product/types/product.type'
import { SearchIcon } from '@/public/icons'
import { useEffect, useRef, useState } from 'react'
import { useSearchSuggest } from './hook/useSearchSuggest'
import Link from 'next/link'
import Spinner from '@/components/ui/Spinner'

export default function SearchForm({ className }: { className?: string }) {
    const [keyword, setKeyword] = useState('')
    const [open, setOpen] = useState(false)
    const { handleSearch } = useFilter()
    const { dropDownList, isFetching } = useSearchSuggest(keyword)
    const searchRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <>
            <div
                ref={searchRef}
                className={`relative flex h-11 min-w-10 flex-1 items-center justify-center rounded-xs bg-white p-1 leading-none `}
            >
                <input
                    autoComplete="off"
                    onFocus={() => setOpen(true)}
                    onChange={(e) => {
                        setKeyword(e.target.value)
                        handleSearch(e.target.value)
                    }}
                    name="search"
                    type="text"
                    placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
                    className={`h-full flex-1 text-black outline-none placeholder:text-gray-500 ${className}`}
                />
                <div className="bg-primary bg-red flex h-full w-15 cursor-pointer items-center justify-center rounded-xs p-2 text-lg text-black hover:opacity-80">
                    {isFetching ? (
                        <Spinner />
                    ) : (
                        <div onClick={() => handleSearch(keyword)}>
                            <SearchIcon className="h-5 w-5 text-white" />
                        </div>
                    )}
                </div>
                <ul className="absolute top-full left-0 z-10 mt-1 flex max-h-72 w-[93%] flex-col overflow-y-auto bg-white shadow-md">
                    {open &&
                        dropDownList?.products.map((item: ProductType) => {
                            return (
                                <Link
                                    onClick={() => setOpen(false)}
                                    href={`/products/${item._id}`}
                                    key={item._id}
                                    className="text-[16px] cursor-pointer p-3 text-black hover:bg-gray-100"
                                >
                                    {item.title}
                                </Link>
                            )
                        })}
                </ul>
            </div>
        </>
    )
}
