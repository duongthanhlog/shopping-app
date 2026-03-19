'use client'
export default function CategorySidebarSkeleton() {
    return (
        <div className="w-55 animate-pulse bg-gray-50 p-4">
            {/* Title */}
            <div className="mb-6 h-5 w-2/3 rounded bg-gray-300" />

            {/* Main category */}
            <div className="mb-4 h-4 w-3/4 rounded bg-gray-300" />

            {/* Category list */}
            <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-4 w-2/3 rounded bg-gray-200" />
                ))}
            </div>

            {/* Xem thêm */}
            <div className="mt-6 h-4 w-1/3 rounded bg-gray-200" />
        </div>
    )
}
