import { ArrowRight, ArrowUpSolidIcon, CheckIcon, StarVote } from '@/public/icons'
import { useState } from 'react'
import useFilter from '../hook/useFilter'
import CategorySidebarSkeleton from '@/components/ui/skeletons/CategorySidebarSkeleton'
import useGetCategories from '../hook/useGetCategories'
import Button from '@/components/ui/Button'
import BottomLine from '@/components/ui/BottomLine'

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
        <nav className=" mr-6">
            <span className="mr-10 flex h-12.5 items-center pb-4 text-xl font-semibold">
                Bộ lọc tìm kiếm
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
                            className={`${item.slug === category ? 'text-primary' : 'text-black'} hover:text-primary relative flex cursor-pointer px-4 pb-3 text-[14px] font-semibold select-none`}
                        >
                            <span className="centerdiv absolute left-0">
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
                className="cursor-pointer px-4 text-[14px] font-semibold select-none"
            >
                {!showMore ? (
                    'Xem thêm ▾'
                ) : (
                    <span className="flex items-center">
                        Ẩn bớt <ArrowUpSolidIcon className="ml-1 h-4 w-4" />
                    </span>
                )}
            </div>
            <BottomLine />
            <div className="mr-6">
                <h3 className="my-2 font-semibold">Đánh giá</h3>
                {ratings.map((rating, i) => (
                    <div
                        onClick={() => {
                            handleGetRating(rating)
                        }}
                        key={rating}
                        className={`${ratingParam === rating && 'bg-gray-200'} p-1 flex cursor-pointer items-center gap-1 rounded-xl pl-3 select-none`}
                    >
                        {[...Array(5)].map((_, index) => (
                            <StarVote
                                size={4}
                                key={index}
                                percent={index < rating ? 100 : 0}
                            />
                        ))}
                        {rating !== 5 && (
                            <span className="text-gray-600 text-[16px] leading-none">
                                trở lên
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <BottomLine />

            <div className="space-y-3">
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
                        className="focus:border-primary w-full rounded border border-gray-300 px-2 py-1 text-sm outline-none"
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
                        className="focus:border-primary w-full rounded border border-gray-300 px-2 py-1 text-sm outline-none"
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
            <Button
                onClick={handleResetFilter}
                className="mt-4 hover:bg-gray-300 bg-gray-200"
            >
                Xóa tất cả bộ lọc
            </Button>
        </nav>
    )
}
