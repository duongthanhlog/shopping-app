'use client'

import Header from '@/components/layout/Header/Header'

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <div className="container">{children}</div>
        </>
    )
}
