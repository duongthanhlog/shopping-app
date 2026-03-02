import { Card } from '@/feartures/product/types/card.type'
import { productsInstance } from '@/lib/axios'
import { OrderType } from '../types'
import { randomCreatedAt } from '@/utils/randomCreatedAt'
import { SORTBY } from '../constant'

type QueryParams = {
    limit?: number
    skip?: number
    order?: string
    sortBy?: string
}

export const getProductByCategory = async (
    category: string,
    params: QueryParams
) => {
    const res = await productsInstance.get(`/products/category/${category}`, {
        params,
    })
    const result = res.data.products.map((p: Card) => {
        return {
            ...p,
            createdAt: randomCreatedAt(),
        }
    })
    return {
        products: result,
        totalProduct: res.data.total,
    }
}

export const getFilteredProducts = async (
    category: string,
    order?: OrderType,
    limit?: number,
    skip?: number,
    sortBy?: string
) => {
    let products: Card[] = []
    let totalProduct: number
    const params: QueryParams = {
        limit,
        skip,
        sortBy,
    }

    if (order) {
        params.order = order
    }

    if (category) {
        const result = await getProductByCategory(category, params)
        products = result.products
        totalProduct = result.totalProduct
    }

    return { products, totalProduct }
}
