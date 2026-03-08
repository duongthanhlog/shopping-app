import { useEffect, useState } from 'react'

export default function useDebounce(value: any) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const debounce = setTimeout(() => {
            setDebouncedValue(value)
        }, 600)

        return () => clearTimeout(debounce)
    }, [value])

    return debouncedValue
}
