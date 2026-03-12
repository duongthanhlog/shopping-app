import useFilter from '@/feartures/filter/hook/useFilter'
import { ProductType } from '@/feartures/product/types/product.type'
import { SearchIcon } from '@/public/icons'
import { useEffect, useRef, useState } from 'react'
import { useSearchSuggest } from './hook/useSearchSuggest'
import Link from 'next/link'
import Spinner from '@/components/ui/Spinner'

export default function SearchForm() {
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
                className=" rounded-xs p-1 bg-white flex items-center justify-center flex-1 leading-none h-11 min-w-10 relative"
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
                    className="placeholder:text-gray-500 text-black pl-3 border-none outline-none flex-1 h-full"
                />
                <div className="hover:opacity-80 bg-primary w-15 rounded-xs h-full p-2 flex items-center justify-center text-black bg-red cursor-pointer text-lg">
                    {isFetching ? (
                        <Spinner />
                    ) : (
                        <SearchIcon className="text-white w-5 h-5 " />
                    )}
                </div>
                <ul className="absolute w-[93%] left-0 top-full mt-1  bg-white shadow-md flex flex-col z-10 max-h-72 overflow-y-auto">
                    {open &&
                        dropDownList?.products.map((item: ProductType) => {
                            return (
                                <Link
                                    onClick={() => setOpen(false)}
                                    href={`/products/${item._id}`}
                                    key={item._id}
                                    className="text-black hover:bg-gray-100 cursor-pointer p-3"
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
