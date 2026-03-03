import { useQuery } from '@tanstack/react-query'
import { keepPreviousData } from '@tanstack/react-query'
import ProductCard from './ProductCard'
import { useFilter } from '@/feartures/filter/contexts/filter.context'
import { getFilteredProducts } from '@/feartures/filter/services/filter.service'
import BottomPaginationNav from '@/feartures/filter/BottomPaginationNav'
import usePaginate from '@/feartures/filter/hook/usePaginate'
import { useEffect } from 'react'

export default function ProductList() {
    const { category, order, sortBy } = useFilter()
    const { page, limit, skip, handleChangePage } = usePaginate()

    useEffect(() => {
        handleChangePage(1)
    }, [category])

    const { data, isFetching, isLoading } = useQuery({
        queryKey: ['filterd-product', category, order, limit, skip, sortBy],
        queryFn: () =>
            getFilteredProducts(category, order, limit, skip, sortBy),
        refetchOnWindowFocus: false,
        staleTime: 0,
        placeholderData: keepPreviousData,
    })

    const totalPage = Math.ceil(data?.totalProduct / limit)

    if (isLoading && !data) return <div>Skeleton loading</div>
    return (
        <>
            <ul
                className={`${isFetching ? 'opacity-50' : 'opacity-100'} mt-2 grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4`}
            >
                {data?.products.map((card) => {
                    return (
                        <ProductCard
                            href={`/product/${card.id}`}
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
