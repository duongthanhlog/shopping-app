'use client'

import { useQuery } from '@tanstack/react-query'
import ProductCard from '../src/feartures/product/components/ProductCard'
import { getProducts } from '../src/feartures/product/services/product.card.service'
import { Card } from '../src/feartures/product/types/card.type'
import TopFilterBar from '@/feartures/filter/TopFilterBar'
import BottomPaginationNav from '@/feartures/filter/BottomPaginationNav'
import LeftFilterBar from '@/feartures/filter/LeftFilterBar'

export default function Home() {
    const { data } = useQuery<Card[]>({
        queryKey: ['products'],
        queryFn: getProducts,
    })

    if (!data) return null

    return (
        <div className="container grid grids-cols-2 gap 4">
            <div className="container mt-5 grid grid-cols-[1fr_4fr] ">
                <LeftFilterBar />
                <section>
                    <TopFilterBar />
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
                    <BottomPaginationNav />
                </section>
            </div>
        </div>
    )
}
