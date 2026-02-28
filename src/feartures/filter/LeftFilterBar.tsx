import { ArrowRight, CheckIcon } from '@/public/icons'

export default function LeftFilterBar() {
    return (
        <nav>
            <span className="pb-4 font-semibold text-xl flex items-center h-[50px] border-b-2 border-gray-200 mr-10">
                Tất cả danh mục
            </span>
            <ul className="mt-4  border-b-2 border-gray-200">
                <li className="cursor-pointer font-semibold mb-3 text-[14px] text-primary flex">
                    <ArrowRight className={'w-4'} /> Làm đẹp
                </li>
                <li className="font-semibold mb-3 text-[14px]">
                    Mô tô, xe máy
                </li>
                <li className="font-semibold mb-3 text-[14px]">Mũ bảo hiểm</li>
                <li className="font-semibold mb-3 text-[14px]">
                    Phụ kiện xe đạp
                </li>
                <li className="font-semibold mb-3 text-[14px]">Nội thất</li>
                <li className="font-semibold mb-3 text-[14px]">
                    Phụ tùng ô tô
                </li>
            </ul>
            <h2 className="my-2 font-semibold">Thương hiệu</h2>
            <ul className="flex flex-col">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" className="peer hidden text-white" />

                    <div
                        className="w-4 h-4 border border-gray-400 bg-white
                                        peer-checked:bg-primary
                                        peer-checked:border-primary"
                    >
                        <CheckIcon className="text-white" />
                    </div>

                    <span>Thống nhất</span>
                </label>
            </ul>
        </nav>
    )
}
