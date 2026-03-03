import { Card } from '@/feartures/product/types/card.type'
import { productsInstance } from '@/lib/axios'
import { OrderType } from '../types'

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
    return {
        products: res.data.products,
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
