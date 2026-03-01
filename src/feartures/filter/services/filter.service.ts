import { getProducts } from '@/feartures/product/services/product.card.service'
import { Card } from '@/feartures/product/types/card.type'
import { productsInstance } from '@/lib/axios'
import { SortWith } from '../types'
import { sortProducts } from '@/utils/sortProducts'
import { randomCreatedAt } from '@/utils/randomCreatedAt'

export const getCategoryFiltered = async (
    category: string,
    SortWith: SortWith
) => {
    let products: Card[]

    if (category) {
        const res = await productsInstance.get(`/products/category/${category}`)

        products = res.data.products.map((p: Card) => {
            return {
                ...p,
                createdAt: randomCreatedAt(p),
            }
        })
    } else {
        products = await getProducts()
    }
    console.log(products)

    return sortProducts(products, SortWith)
}
