import { useQuery } from '@tanstack/react-query'
import { fetchSuggest } from '../services/search.service'
import { QUERY_KEYS } from '@/contants/queryKeys'
import useDebounce from '@/hooks/useDebounce'

export function useSearchSuggest(keyword: string) {
    const debouncedValue = useDebounce(keyword)

    const { data: dropDownList, isFetching } = useQuery({
        queryKey: QUERY_KEYS.SEARCHSUGGEST(debouncedValue),
        queryFn: () => fetchSuggest(debouncedValue),
        enabled: !!debouncedValue,
    })

    return { dropDownList, isFetching }
}
