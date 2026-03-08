export default function CartSkeleton() {
    return (
        <div className="bg-gray-100 ">
            {/* Title */}
            <div className="container py-8">
                <div className="h-8 w-60 bg-gray-300 rounded animate-pulse mb-6" />
            </div>

            {/* Header row */}
            <div className="bg-white">
                <div className="container py-4">
                    <div className="grid grid-cols-[3fr_2fr_2fr_2fr_2fr] gap-4">
                        {Array(5)
                            .fill(0)
                            .map((_, i) => (
                                <div key={i} className="h-5 bg-gray-200 rounded animate-pulse" />
                            ))}
                    </div>
                </div>
            </div>

            {/* Cart items */}
            <div className="bg-white mt-4">
                <div className="container">
                    {Array(2)
                        .fill(0)
                        .map((_, index) => (
                            <div key={index} className="grid grid-cols-[3fr_2fr_2fr_2fr_2fr] gap-4 py-6 items-center">
                                {/* Product column */}
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                                </div>

                                {/* Price */}
                                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mx-auto" />

                                {/* Quantity */}
                                <div className="h-10 w-28 bg-gray-200 rounded animate-pulse mx-auto" />

                                {/* Total */}
                                <div className="h-5 w-28 bg-gray-200 rounded animate-pulse mx-auto" />

                                {/* Action */}
                                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse mx-auto" />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
