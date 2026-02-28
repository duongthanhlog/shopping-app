import { getProductById } from '@/feartures/product/services/product.details.service'

import ProductDetail from './Product.detail'

interface Props {
    params: Promise<{ id: string }>
}
export default async function ProductDetails({ params }: Props) {
    const { id } = await params
    const product = await getProductById(id)
    console.log(product)

    if (!product) return null

    return <ProductDetail product={product} />
}
