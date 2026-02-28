import { productsInstance } from '@/lib/axios'
import { Card } from '../types/card.type'

export const getProducts = async () => {
    const res = await productsInstance.get('/products')
    const products = res.data.products.map((p: Card) => {
        return {
            ...p,
            createdAt: new Date(
                Date.now() - Math.random() * 10000000000 //dummyjson createdAt is a same date so I have to fake time here
            ).toISOString(),
        }
    })
    return products
}
