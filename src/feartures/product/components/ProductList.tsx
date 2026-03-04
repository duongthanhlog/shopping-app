import ProductCard from './ProductCard'

import { Card } from '../types/card.type'
import useFilter from '@/feartures/filter/hook/useFilter'
import usePanigate from '@/hooks/usePanigate'
import TopFilterBar from '@/feartures/filter/components/TopFilterBar'
import useGetProducts from '../hooks/useGetProducts'
import { useMemo } from 'react'
import BottomPaginationNav from '@/feartures/filter/components/BottomPaginationNav'
import ProductCardSkeleton from '@/components/ui/skeletons/ProductCardSkeleton'

export default function ProductList() {
    const { data, isLoading, isFetching } = useGetProducts()
    const { page, limit } = useFilter()
    const { handleChangePage } = usePanigate()

    const totalPage = useMemo(() => {
        return Math.ceil(data?.total / limit)
    }, [limit, data?.total])

    return (
        <>
            <TopFilterBar
                isFetching={isFetching}
                totalPage={totalPage}
                onChange={handleChangePage}
            />
            <ul
                className={`${isFetching ? 'opacity-60 transition' : ''} mt-4 grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4`}
            >
                {isLoading
                    ? Array.from({ length: 10 }).map((_, i) => (
                          <ProductCardSkeleton key={i} />
                      ))
                    : data?.products?.map((card: Card) => {
                          return (
                              <ProductCard
                                  href={`/products/${card.id}`}
                                  key={card.id}
                                  card={card}
                              />
                          )
                      })}
            </ul>
            {totalPage > 1 && (
                <BottomPaginationNav
                    page={page}
                    onChange={handleChangePage}
                    totalPage={totalPage}
                />
            )}
        </>
    )
}
