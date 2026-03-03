import { productsInstance } from '@/lib/axios'

export const getProducts = async () => {
    const res = await productsInstance.get(`/products`)

    const products = res.data.products
    return products
}

export const getProductsCategory = async () => {
    const res = await productsInstance.get(`/products/categories`)
    return res.data
}
