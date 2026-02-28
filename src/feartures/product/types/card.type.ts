export interface Card {
    id: string
    title: string
    slug: string
    description: string
    category: string
    brand: string
    price: number
    discountPercentage: number
    rating: number
    sold: number
    quantity: number
    minimumOrderQuantity: number
    thumbnail: string
    stock: number
    tags: string[]
    createdAt: string
}
