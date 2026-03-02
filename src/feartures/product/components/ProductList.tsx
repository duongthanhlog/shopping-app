import { useQuery } from '@tanstack/react-query'
import ProductCard from './ProductCard'
import { useFilter } from '@/feartures/filter/contexts/filter.context'
import { getFilteredProducts } from '@/feartures/filter/services/filter.service'
import BottomPaginationNav from '@/feartures/filter/BottomPaginationNav'
import usePaginate from '@/feartures/filter/hook/usePaginate'
import { useEffect } from 'react'

export default function ProductList() {
    const { filterSlug, order, sortBy } = useFilter()
    const { page, limit, skip, handleChangePage } = usePaginate()

    useEffect(() => {
        handleChangePage(1)
    }, [filterSlug])

    const { data, isLoading } = useQuery({
        queryKey: ['filterd-product', filterSlug, order, limit, skip, sortBy],
        queryFn: () =>
            getFilteredProducts(filterSlug, order, limit, skip, sortBy),
        refetchOnWindowFocus: false,
        staleTime: 0,
    })

    const totalPage = Math.ceil(data?.totalProduct / limit)

    if (isLoading) return <div>Skeleton loading</div>
    if (!data) return <div>Có gì đó không đúng</div>
    return (
        <>
            <ul className="mt-2 grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4">
                {data.products.map((card) => {
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
