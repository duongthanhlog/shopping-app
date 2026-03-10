import ProductCard from './ProductCard'

import { Product } from '../types/product.type'
import useFilter from '@/feartures/filter/hook/useFilter'
import usePanigate from '@/hooks/usePanigate'
import TopFilterBar from '@/feartures/filter/components/TopFilterBar'
import useGetProducts from '../hooks/useGetProducts'
import BottomPaginationNav from '@/feartures/filter/components/BottomPaginationNav'
import ProductCardSkeleton from '@/components/ui/skeletons/ProductCardSkeleton'

export default function ProductList() {
    const { data, isLoading, isFetching } = useGetProducts()
    const { page } = useFilter()
    const { handleChangePage } = usePanigate()

    const products = data?.products || []
    const totalPages = data?.totalPages

    if (!products.length && !isLoading)
        return <div className="centerdiv text-gray-500">Không có sản phẩm nào</div>

    return (
        <>
            <TopFilterBar
                isFetching={isFetching}
                totalPages={totalPages}
                onChange={handleChangePage}
            />
            <ul
                className={`${isFetching ? 'opacity-60 transition' : ''} mt-4 grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4`}
            >
                {isLoading
                    ? Array.from({ length: 10 }).map((_, i) => (
                          <ProductCardSkeleton key={i} />
                      ))
                    : products.map((card: Product) => {
                          return (
                              <ProductCard
                                  href={`/products/${card._id}`}
                                  key={card._id}
                                  card={card}
                              />
                          )
                      })}
            </ul>
            {totalPages > 1 && (
                <BottomPaginationNav
                    page={page}
                    onChange={handleChangePage}
                    totalPages={totalPages}
                />
            )}
        </>
    )
}
