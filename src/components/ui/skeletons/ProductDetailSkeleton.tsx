export default function ProductDetailSkeleton() {
    return (
        <div className="bg-white mt-6 p-6 flex gap-10 animate-pulse">
            <div className="w-105 h-105 bg-gray-200 rounded-md" />

            <div className="flex-1 space-y-6">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />

                <div className="flex gap-6 items-center">
                    <div className="h-4 bg-gray-200 rounded w-20" />
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-4 bg-gray-200 rounded w-20" />
                </div>

                <div className="h-12 bg-gray-200 rounded w-1/3" />

                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-4 bg-gray-200 rounded w-20" />
                    <div className="h-10 w-32 bg-gray-200 rounded" />
                </div>

                <div className="flex gap-4 pt-4">
                    <div className="h-12 w-48 bg-gray-200 rounded-md" />
                    <div className="h-12 w-40 bg-gray-200 rounded-md" />
                </div>
            </div>
        </div>
    )
}
