export default function ProductDetailSkeleton() {
    return (
        <div className="container mt-6">
            <div className="grid grid-cols-2 gap-8 bg-white p-6 rounded-sm">
                {/* LEFT - IMAGE */}
                <div className="animate-pulse">
                    <div className="w-full h-[420px] bg-gray-200 rounded-sm" />
                </div>

                {/* RIGHT - INFO */}
                <div className="space-y-4 animate-pulse">
                    {/* Title */}
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-6 bg-gray-200 rounded w-1/2" />

                    {/* Rating */}
                    <div className="flex gap-4 mt-2">
                        <div className="h-4 w-16 bg-gray-200 rounded" />
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                    </div>

                    {/* Price box */}
                    <div className="bg-gray-100 p-4 rounded mt-4">
                        <div className="h-8 w-40 bg-gray-300 rounded mb-2" />
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                    </div>

                    {/* Shipping */}
                    <div className="space-y-2 mt-4">
                        <div className="h-4 w-48 bg-gray-200 rounded" />
                        <div className="h-4 w-40 bg-gray-200 rounded" />
                    </div>

                    {/* Warranty */}
                    <div className="h-4 w-32 bg-gray-200 rounded mt-4" />

                    {/* Quantity */}
                    <div className="flex items-center gap-4 mt-6">
                        <div className="h-8 w-24 bg-gray-200 rounded" />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6">
                        <div className="h-12 w-40 bg-gray-300 rounded" />
                        <div className="h-12 w-40 bg-gray-300 rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}
