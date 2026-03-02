'use client'

import TopFilterBar from '@/feartures/filter/TopFilterBar'
import BottomPaginationNav from '@/feartures/filter/BottomPaginationNav'
import LeftFilterBar from '@/feartures/filter/LeftFilterBar'
import ProductList from '@/feartures/product/components/ProductList'

export default function Home() {
    return (
        <div className="container grid grids-cols-2 gap 4">
            <div className="container mt-5 grid grid-cols-[1fr_4fr] ">
                <LeftFilterBar />
                <section>
                    <TopFilterBar />
                    <ProductList />
                </section>
            </div>
        </div>
    )
}
