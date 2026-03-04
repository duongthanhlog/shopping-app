'use client'
import LeftFilterBar from '@/feartures/filter/components/LeftFilterBar'
import ProductList from '@/feartures/product/components/ProductList'

export default function ProductsPage() {
    return (
        <div className="container grid grids-cols-2 gap 4">
            <div className="container mt-5 grid grid-cols-[1fr_4fr] ">
                <LeftFilterBar />
                <section>
                    <ProductList />
                </section>
            </div>
        </div>
    )
}
