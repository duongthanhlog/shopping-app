import { useContext, useState, createContext } from 'react'
import { SortWith } from './types'

type SortContextType = {
    filterSlug: string
    SortWith: SortWith
    handleSort: (type: SortWith) => void
    handleFilter: (slug: string, SortWith: SortWith) => void
}

const FilterContext = createContext<SortContextType | null>(null)

export function FilterProvider({ children }) {
    const [SortWith, setSortType] = useState<SortWith | null>(null)
    const [filterSlug, setFilterSlug] = useState<string | null>(null)

    const handleSort = (SortWith: SortWith) => {
        setSortType(SortWith)
    }

    const handleFilter = (slug: string, SortWith: SortWith) => {
        setFilterSlug(slug)
        handleSort(SortWith)
    }

    return (
        <FilterContext.Provider
            value={{ SortWith, filterSlug, handleSort, handleFilter }}
        >
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => {
    const context = useContext(FilterContext)
    if (!context) {
        throw Error('useModal must be used within ModalProvider')
    }
    return context
}
