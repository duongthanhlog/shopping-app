import { useContext, useState, createContext } from 'react'
import { OrderType, SortByType } from '../types'
import { ORDER, SORTBY } from '../constant'

type SortContextType = {
    category: string
    order?: OrderType
    sortBy?: SortByType
    handleSort: (type: OrderType) => void
    handleFilter: (slug: string, order?: OrderType, sortBy?: SortByType) => void
}

const FilterContext = createContext<SortContextType | null>(null)

export function FilterProvider({ children }) {
    const [order, setOrder] = useState<OrderType>(ORDER.DESC)
    const [sortBy, setSortBy] = useState<SortByType>(SORTBY.CREATED_AT)
    const [category, setCategory] = useState<string>('beauty')

    const handleSort = (order: OrderType) => {
        setOrder(order)
    }

    const handleFilter = (
        slug: string,
        order?: OrderType,
        sortBy?: SortByType
    ) => {
        setCategory(slug)
        handleSort(order)
        setSortBy(sortBy)
    }

    return (
        <FilterContext.Provider
            value={{ order, sortBy, category, handleSort, handleFilter }}
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
