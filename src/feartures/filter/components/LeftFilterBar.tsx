import { ArrowRight, ArrowUpSolidIcon, CheckIcon } from '@/public/icons'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProductsCategory } from '../../product/services/products.service'
import { useState } from 'react'
import useFilter from '../hook/useFilter'
import CategorySidebarSkeleton from '@/components/ui/skeletons/CategorySidebarSkeleton'
import useGetCategories from '../hook/useGetCategories'

interface CategoryType {
    slug: string
    name: string
    url: string
}

export default function LeftFilterBar() {
    const { data, isLoading } = useGetCategories()
    const { handleFilter, category } = useFilter()
    const [showMore, setShowMore] = useState(false)

    const categories = [{ name: 'Tất cả sản phẩm', slug: null }, ...(data ?? [])]
    console.log(categories)

    if (isLoading) return <CategorySidebarSkeleton />

    return (
        <nav>
            <span className="pb-4 font-semibold text-xl flex items-center h-12.5 border-b-2 border-gray-200 mr-10">
                Tất cả danh mục
            </span>
            <ul
                className={`${showMore ? 'h-auto' : 'overflow-auto'} mt-4 h-50 overflow-hidden`}
            >
                {categories.map((item: CategoryType, i: number) => {
                    return (
                        <li
                            key={i}
                            onClick={() => {
                                handleFilter(item.slug)
                            }}
                            className={`${item.slug === category ? 'text-primary' : 'text-black'} px-4 relative select-none cursor-pointer font-semibold mb-3 text-[14px] flex`}
                        >
                            <span className="absolute centerdiv left-0">
                                {item.slug === category && (
                                    <ArrowRight className={'w-4'} />
                                )}
                            </span>
                            {item.name}
                        </li>
                    )
                })}
            </ul>
            {
                <div
                    onClick={() => setShowMore(!showMore)}
                    className="cursor-pointer font-semibold px-4 text-[14px]"
                >
                    {!showMore ? (
                        'Xem thêm ▾'
                    ) : (
                        <span className="flex items-center">
                            Ẩn bớt <ArrowUpSolidIcon className="w-4 h-4 ml-1" />
                        </span>
                    )}

                    <span className="block border-b-2 border-gray-200 mt-4"></span>
                </div>
            }
        </nav>
    )
}
