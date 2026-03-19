'use client'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import AuthModal from '../src/feartures/auth/components/AuthModal'
import Providers from './providers'
import Toast from '../src/feartures/toast/Toast'
import Header from '@/components/layout/Header/Header'
import FullScreenSpinner from '@/components/ui/FullScreenSpinner'
import useGetUser from '@/feartures/auth/hooks/useGetUser'
import { useLogout } from '@/feartures/auth/hooks/useLogout'
import { useIsMutating } from '@tanstack/react-query'
import useLogin from '@/feartures/auth/hooks/useLogin'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export interface RootLayoutProps {
    children: ReactNode
}

export function GlobalLoading() {
    const isMutating = useIsMutating({
        mutationKey: ['auth'],
    })

    if (isMutating === 0) return null

    return <FullScreenSpinner />
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 min-h-screen`}
            >
                <Providers>
                    <Toast />
                    {children}
                    <GlobalLoading />
                    <AuthModal />
                </Providers>
            </body>
        </html>
    )
}
