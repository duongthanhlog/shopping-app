import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/contants/queryKeys'
import { AddressFormType } from '../checkout.type'
import { createUserAddress } from '@/feartures/auth/auth.service'

export default function useUpdateAddress() {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: (formAddress: AddressFormType) => createUserAddress(formAddress),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.USER,
            })
        },
    })

    return { mutate }
}
