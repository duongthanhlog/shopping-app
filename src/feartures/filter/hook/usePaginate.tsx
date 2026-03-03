import { useRouter, useSearchParams } from 'next/navigation'

export default function usePaginate() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const limit = Number(searchParams.get('limit')) || 10
    const page = Number(searchParams.get('page')) || 1
    const skip = (page - 1) * limit

    const handleChangePage = (num: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', num.toString())
        router.push(`?${params.toString()}`)
    }
    return { page, limit, skip, handleChangePage }
}
