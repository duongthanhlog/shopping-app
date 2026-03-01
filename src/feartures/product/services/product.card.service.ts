import { productsInstance } from '@/lib/axios'
import { Card } from '../types/card.type'
import { randomCreatedAt } from '@/utils/randomCreatedAt'

export const getProducts = async () => {
    const res = await productsInstance.get('/products?limit=0')

    const products = res.data.products.map((p: Card) => {
        return {
            ...p,
            createdAt: randomCreatedAt(p),
        }
    })
    return products
}

export const getProductsCategory = async () => {
    const res = await productsInstance.get(`/products/categories`)
    return res.data
}
