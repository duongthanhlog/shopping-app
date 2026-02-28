import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'

import { ToastContextType, ToastState, ToastType } from './toast.types'

const ToastContext = createContext<ToastContextType | null>(null)

export default function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<ToastState | null>(null)

    useEffect(() => {
        if (!toast?.type) return

        const timer = setTimeout(() => {
            hideToast()
        }, 2000)

        return () => clearTimeout(timer)
    }, [toast?.type])

    const showToast = (type: ToastType, message: string) => {
        setToast({ type, message })
    }

    const hideToast = () => {
        setToast(null)
    }

    return (
        <ToastContext.Provider value={{ toast, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    )
}
export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw Error('useToast must be used within ModalProvider')
    }
    return context
}
