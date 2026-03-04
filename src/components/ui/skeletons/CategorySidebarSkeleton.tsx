export default function CategorySidebarSkeleton() {
    return (
        <div className="w-55 bg-gray-50 p-4 animate-pulse">
            {/* Title */}
            <div className="h-5 bg-gray-300 rounded w-2/3 mb-6" />

            {/* Main category */}
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />

            {/* Category list */}
            <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-4 bg-gray-200 rounded w-2/3"
                    />
                ))}
            </div>

            {/* Xem thêm */}
            <div className="h-4 bg-gray-200 rounded w-1/3 mt-6" />
        </div>
    )
}
