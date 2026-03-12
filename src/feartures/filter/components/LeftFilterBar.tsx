import { ArrowRight, ArrowUpSolidIcon, CheckIcon, StarVote } from '@/public/icons'
import { useState } from 'react'
import useFilter from '../hook/useFilter'
import CategorySidebarSkeleton from '@/components/ui/skeletons/CategorySidebarSkeleton'
import useGetCategories from '../hook/useGetCategories'
import Button from '@/components/ui/Button'

interface CategoryType {
    slug: string
    name: string
    url: string
}
export default function LeftFilterBar() {
    const { data, isLoading } = useGetCategories()
    const {
        handleFilter,
        category,
        handleGetRating,
        handleFilterPrice,
        handleResetFilter,
        rating: ratingParam,
    } = useFilter()
    const [showMore, setShowMore] = useState(false)

    const [minPrice, setMinPrice] = useState<string | ''>('')
    const [maxPrice, setMaxPrice] = useState<string | ''>('')

    const categories = [{ name: 'Tất cả sản phẩm', slug: null }, ...(data ?? [])]
    const ratings = [5, 4, 3, 2]

    if (isLoading) return <CategorySidebarSkeleton />

    return (
        <nav>
            <span className="pb-4 font-semibold text-xl flex items-center h-12.5 mr-10">
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
            <div
                onClick={() => setShowMore(!showMore)}
                className="cursor-pointer font-semibold px-4 text-[14px] select-none"
            >
                {!showMore ? (
                    'Xem thêm ▾'
                ) : (
                    <span className="flex items-center">
                        Ẩn bớt <ArrowUpSolidIcon className="w-4 h-4 ml-1" />
                    </span>
                )}
            </div>
            <span className="block border-b-2 border-gray-200 my-4 mr-6"></span>
            <div className="mr-6 ">
                <h3 className="font-semibold my-2">Đánh giá</h3>
                {ratings.map((rating, i) => (
                    <div
                        onClick={() => {
                            handleGetRating(rating)
                        }}
                        key={rating}
                        className={`${ratingParam === rating && 'bg-gray-200'} p-1 pl-3 rounded-xl flex  items-center gap-1 cursor-pointer  select-none`}
                    >
                        {[...Array(5)].map((_, index) => (
                            <StarVote
                                size={4}
                                key={index}
                                percent={index < rating ? 100 : 0}
                            />
                        ))}
                        {rating !== 5 && <span className="text-gray-600">trở lên</span>}
                    </div>
                ))}
            </div>
            <span className="block border-b-2 border-gray-200 my-4 mr-6"></span>

            <div className="space-y-3 mr-6">
                <p className="font-semibold text-gray-700">Khoảng Giá</p>

                <div className="flex items-center gap-2">
                    <input
                        value={minPrice}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '')
                            setMinPrice(value)
                        }}
                        type="text"
                        inputMode="numeric"
                        placeholder="₫ TỪ"
                        className="w-full border rounded px-2 py-1 text-sm outline-none focus:border-primary border-gray-300 "
                    />

                    <span className="text-gray-400">—</span>

                    <input
                        value={maxPrice}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '')
                            setMaxPrice(value)
                        }}
                        type="text"
                        inputMode="numeric"
                        placeholder="₫ ĐẾN"
                        className="w-full border rounded px-2 py-1 text-sm outline-none focus:border-primary border-gray-300 "
                    />
                </div>

                <Button
                    active
                    className="w-full py-2 text-[14px] hover:bg-red-600"
                    onClick={() => {
                        if (minPrice.trim() || maxPrice.trim()) {
                            handleFilterPrice(minPrice, maxPrice)
                        }
                    }}
                >
                    ÁP DỤNG
                </Button>
            </div>
            <Button onClick={handleResetFilter} className="mt-4 hover:bg-gray-300">
                Xóa tất cả bộ lọc
            </Button>
        </nav>
    )
}
