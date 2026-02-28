'use client'
import Button from '@/components/ui/Button'
import { useState } from 'react'

export default function TopFilterBar() {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex bg-gray-200 text-[15px] px-4">
            <div className="flex gap-3 p-3 pl-0 items-center">
                <span className="font-semibold">Sắp xếp theo</span>
                <Button active={true}>Phổ biến</Button>
                <Button>Mới nhất</Button>
                <Button>Bán chạy</Button>
                <div className="relative inline-block group">
                    <Button
                        className="w-50 relative flex justify-between "
                        onClick={() => setOpen(!open)}
                    >
                        Giá
                        <span>▾</span>
                    </Button>

                    {open && (
                        <div className="absolute left-0 font-semibold w-full bg-white shadow-md hidden group-hover:block">
                            <div className=" px-4 py-2 hover:bg-gray-100 cursor-pointer w-full">
                                Giá: Thấp đến Cao
                            </div>
                            <div className=" px-4 py-2 hover:bg-gray-100 cursor-pointer w-full">
                                Giá: Cao đến Thấp
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="ml-auto flex items-center">
                <span className="mr-4">
                    <span className="text-primary">1</span>/9
                </span>
                <button className="cursor-pointer bg-white w-10 h-10 border border-gray-200">
                    {'<'}
                </button>
                <button className="cursor-pointer bg-white w-10 h-10 border border-gray-200">
                    {'>'}
                </button>
            </div>
        </div>
    )
}
