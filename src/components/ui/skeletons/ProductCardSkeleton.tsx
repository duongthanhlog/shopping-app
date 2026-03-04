export default function ProductCardSkeleton() {
    return (
        <div className="bg-white p-3 animate-pulse">
            {/* Image */}
            <div className="w-full h-48 bg-gray-200 rounded mb-3" />

            {/* Title */}
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />

            {/* Rating */}
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />

            {/* Price */}
            <div className="h-5 bg-gray-300 rounded w-1/2 mb-1" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
        </div>
    )
}
