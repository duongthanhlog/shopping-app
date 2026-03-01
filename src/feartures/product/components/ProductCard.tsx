'use client'

import Image from 'next/image'
import { formatCurrency } from '../../../utils/formatNumber'
import Currency from '@/components/ui/currency'
import Link from 'next/link'
import PercentRating from '@/utils/canculateRating'

export default function ProductCard({ card, href }) {
    return (
        <Link href={href} className="bg-white cursor-pointer">
            <div className=" border border-gray-300">
                <Image
                    loading="eager"
                    width={200}
                    height={200}
                    className="w-full"
                    alt=""
                    src={card.thumbnail}
                />
            </div>
            <div className="p-3">
                <span className="line-clamp-2 leading-5 h-12">
                    {card.title}
                </span>
                <div>
                    <div className="flex mt-2 mb-0.3">
                        {PercentRating(card.rating)}
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="leading-tight line-through text-gray-300">
                                {formatCurrency(card.price)}
                                <Currency bottom={6} />
                            </span>
                            <span className="leading-tight text-[20px] text-primary font-medium">
                                {formatCurrency(
                                    card.price -
                                        (card.price * card.discountPercentage) /
                                            100
                                )}
                                <Currency bottom={8} />
                            </span>
                            <span className="text-sm text-gray-400">
                                Đã bán{' '}
                                {card.sold > 1000
                                    ? `${Math.round(card.sold) / 1000}k`
                                    : card.minimumOrderQuantity}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
