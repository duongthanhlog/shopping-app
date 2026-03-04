import { ArrowRight, ArrowUpSolidIcon } from '@/public/icons'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProductsCategory } from '../../product/services/product.card.service'
import { useState } from 'react'
import useFilter from '../hook/useFilter'
import CategorySidebarSkeleton from '@/components/ui/skeletons/CategorySidebarSkeleton'

interface CategoryType {
    slug: string
    name: string
    url: string
}

export default function LeftFilterBar() {
    const { data, isLoading } = useQuery<CategoryType[]>({
        queryKey: ['categories'],
        queryFn: getProductsCategory,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    })

    const { handleFilter, category, removeFilter } = useFilter()
    const [showMore, setShowMore] = useState(false)

    const categories = [
        { name: 'Tất cả sản phẩm', slug: null },
        ...(data ?? []),
    ]

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

            {/* <h2 className="my-2 font-semibold">Thương hiệu</h2>
            <ul className="flex flex-col">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" className="peer hidden text-white" />

                    <div
                        className="w-4 h-4 border border-gray-400 bg-white
                                        peer-checked:bg-primary
                                        peer-checked:border-primary"
                    >
                        <CheckIcon className="text-white" />
                    </div>

                    <span>Thống nhất</span>
                </label>
            </ul> */}
        </nav>
    )
}
