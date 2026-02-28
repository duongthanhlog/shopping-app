'use client'
import { StarVote } from '@/public/icons'

export default function PercentRating(rateNum: number) {
    return (
        <>
            {[...Array(5)].map((_, index) => {
                const percent = Math.min(Math.max(rateNum - index, 0), 1) * 100
                return <StarVote key={index} percent={percent} />
            })}
        </>
    )
}
