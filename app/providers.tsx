'use client'

import QueryProvider from '@/lib/query-client'
import { ModalProvider } from '../src/context/modal.context'
import ToastProvider from '../src/feartures/toast/toast.context'

export default function Providers({ children }) {
    return (
        <>
            <QueryProvider>
                <ToastProvider>
                    <ModalProvider>{children}</ModalProvider>
                </ToastProvider>
            </QueryProvider>
        </>
    )
}
