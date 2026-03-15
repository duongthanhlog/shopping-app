'use client'
import { QUERY_KEYS } from '@/contants/queryKeys'
import useGetUser from '@/feartures/auth/hooks/useGetUser'
import { getUserOrder } from '@/feartures/auth/order.service'
import { useQuery } from '@tanstack/react-query'

export const useGetOrder = () => {
    const { user } = useGetUser()
    const userId = user?.id
    const { data: order } = useQuery({
        queryKey: QUERY_KEYS.ORDER(userId),
        queryFn: getUserOrder,
    })
    return { order }
}
