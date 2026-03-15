import { useMutation } from '@tanstack/react-query'
import { updateCheckoutPreview } from './checkout.service'

export default function useUpdateCheckout() {
    const { mutateAsync, data } = useMutation({
        mutationFn: (checkoutList: { productId: string; quantity: number }[]) =>
            updateCheckoutPreview(checkoutList),
    })

    return { mutateAsync, data }
}
