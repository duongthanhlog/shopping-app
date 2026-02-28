'use client'

import { useModal } from '../../context/modal.context'

export default function Modal({ children }) {
    const { open, type, closeModal } = useModal()
    if (!open) return null
    if (!type) {
        return null
    }
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center">
            <div
                onClick={() => {
                    closeModal()
                }}
                className="bg-black opacity-20 absolute top-0 right-0 left-0 bottom-0"
            ></div>
            {children}
        </div>
    )
}
