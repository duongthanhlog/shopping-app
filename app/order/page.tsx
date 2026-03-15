'use client'

import { useGetOrder } from '@/feartures/order/useGetOrder'

export default function OrderPage() {
    const { order } = useGetOrder()
    return <div>{JSON.stringify(order)}</div>
}
