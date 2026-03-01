'use client'

import { FilterProvider } from '@/feartures/filter/filter.context'
import { ModalProvider } from '../src/context/modal.context'
import { AuthProvider } from '../src/feartures/auth/auth.context'
import ToastProvider from '../src/feartures/toast/toast.context'
import QueryProvider from '../src/lib/query-client'

export default function Providers({ children }) {
    return (
        <>
            <QueryProvider>
                <ToastProvider>
                    <AuthProvider>
                        <FilterProvider>
                            <ModalProvider>{children}</ModalProvider>
                        </FilterProvider>
                    </AuthProvider>
                </ToastProvider>
            </QueryProvider>
        </>
    )
}
