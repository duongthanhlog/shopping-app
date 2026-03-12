import { apiDummy } from '@/lib/axios'
import { OrderType } from '../types'
import { ProductType } from '@/feartures/product/types/product.type'

type QueryParams = {
    limit?: number
    skip?: number
    order?: string
    sortBy?: string
    rating?: number
    minPrice?: string
    maxPrice?: string
}

export const getProductByCategory = async (category: string, params: QueryParams) => {
    const res = await apiDummy.get(`/products/category/${category}`, {
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
    sortBy?: string,
    rating?: number,
    minPrice?: string,
    maxPrice?: string
) => {
    let products: ProductType[] = []
    let totalProduct: number
    const params: QueryParams = {
        limit,
        skip,
        sortBy,
        rating,
        minPrice,
        maxPrice,
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
