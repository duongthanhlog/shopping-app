import { useRouter, useSearchParams } from 'next/navigation'

export default function usePanigate() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleChangePage = (num: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', num.toString())
        router.push(`${window.location.pathname}?${params.toString()}`)
    }

    return { handleChangePage }
}
