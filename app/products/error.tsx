'use client'

import { useEffect } from 'react'

export default function Error({ reset }: { reset: () => void }) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-900 px-4 text-white">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100 text-center">
                <div className="mb-4 text-5xl">⚠️</div>

                <h2 className="mb-2 text-2xl font-semibold text-gray-800">Có lỗi xảy ra</h2>

                <p className="mb-6 text-sm text-gray-500">
                    Mất kết nối tạm thời hoặc server đang gặp sự cố. Vui lòng thử lại.
                </p>

                <button
                    onClick={() => reset()}
                    className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-[0.98]"
                >
                    Thử lại
                </button>
            </div>
        </div>
    )
}
