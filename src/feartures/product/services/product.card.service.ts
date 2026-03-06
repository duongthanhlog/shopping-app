import { apiDummy } from '@/lib/axios'

export const getProducts = async ({
    category,
    order,
    limit,
    skip,
    sortBy,
    page,
}: {
    category?: string
    order?: string
    limit?: number
    skip?: number
    sortBy?: string
    page?: number
}) => {
    let products: any = []
    const urlFilterParams = category ? `/products/category/${category}` : `/products`

    const params = {
        order,
        limit,
        skip,
        sortBy,
        page,
    }

    const res = await apiDummy.get(urlFilterParams, {
        params,
    })
    products = res.data

    return products
}

export const getProductsCategory = async () => {
    const res = await apiDummy.get(`/products/categories`)
    return res.data
}
