import { useMutation } from '@tanstack/react-query'
import { updateCheckoutPreview } from '../checkout.service'

export default function useUpdateCheckout() {
    const { mutateAsync } = useMutation({
        mutationFn: (checkoutList: { productId: any; quantity: number }[]) =>
            updateCheckoutPreview(checkoutList),
    })

    return { mutateAsync }
}
