'use client'
import { createContext, ReactNode, useContext, useRef, useState } from 'react'

type ModalType = 'login' | 'register' | 'confirm' | 'orders' | null

type ConfirmOption = {
    title: string
    onConfirm: () => void | Promise<void>
}

interface ModalContextType {
    open: boolean
    type: ModalType
    confirmOption: ConfirmOption
    openModal: (type: ModalType, confirmOptions?: ConfirmOption) => void
    closeModal: () => void
    openConfirm: (option: ConfirmOption) => void
}
const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false)
    const [type, setType] = useState<ModalType | null>(null)
    const [confirmOption, setConfirmOption] = useState<ConfirmOption | null>(null)

    const openModal = (type: ModalType, confirmOption?: ConfirmOption) => {
        setConfirmOption(confirmOption)
        setType(type)
        setOpen(true)
    }

    const openConfirm = (option: ConfirmOption) => {
        openModal('confirm', option)
    }

    const closeModal = () => {
        setOpen(false)
    }

    return (
        <ModalContext
            value={{
                openModal,
                closeModal,
                open,
                type,
                openConfirm,
                confirmOption,
            }}
        >
            {children}
        </ModalContext>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw Error('useModal must be used within ModalProvider')
    }
    return context
}
