import { useQuery } from '@tanstack/react-query'
import ProductCard from './ProductCard'
import { Card } from '../types/card.type'
import { useFilter } from '@/feartures/filter/filter.context'
import { getCategoryFiltered } from '@/feartures/filter/services/filter.service'

export default function ProductList() {
    const { filterSlug, SortWith } = useFilter()

    const { data, isLoading } = useQuery<Card[]>({
        queryKey: ['filterd-product', { filterSlug, SortWith }],
        queryFn: () => getCategoryFiltered(filterSlug, SortWith),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    })

    if (isLoading) return <div>Skeleton loading</div>

    return (
        <ul className="mt-2 grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4">
            {data.map((card) => {
                return (
                    <ProductCard
                        href={`/product/${card.id}`}
                        key={card.id}
                        card={card}
                    />
                )
            })}
        </ul>
    )
}
