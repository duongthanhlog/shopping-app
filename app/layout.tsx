'use client'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import AuthModal from '../src/feartures/auth/components/AuthModal'
import Providers from './providers'
import { useIsFetching } from '@tanstack/react-query'
import Toast from '../src/components/ui/Toast'
import Header from '@/components/layout/Header/Header'

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
    const isFetching = useIsFetching()
    if (!isFetching) return null
    return <div className="fixed top-0 left-0 w-full text-center bg-white text-black">Loading...</div>
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 min-h-[100vh]`}>
                <Providers>
                    <Header />
                    <Toast />
                    {children}
                    <AuthModal />
                    {/* <GlobalLoading /> */}
                </Providers>
            </body>
        </html>
    )
}
