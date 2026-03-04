import { getProductById } from '@/feartures/product/services/product.details.service'

import ProductDetail from './Product.detail'

interface Props {
    params: Promise<{ id: string }>
}
export default async function ProductDetails({ params }: Props) {
    const { id } = await params

    const card = await getProductById(id)

    if (!card) return <div>Not Found</div>

    return <ProductDetail card={card} />
}
