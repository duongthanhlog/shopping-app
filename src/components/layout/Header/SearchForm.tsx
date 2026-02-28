import { SearchIcon } from '@/public/icons'

export default function SearchForm() {
    return (
        <form
            action=""
            className=" rounded-xs p-1 bg-white flex items-center justify-center flex-1 leading-[1] h-11 min-w-10"
        >
            <input
                name="search"
                type="text"
                placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
                className="placeholder:text-gray-500 text-black pl-3 border-none outline-none flex-1 h-full"
            />
            <div className="hover:opacity-80 bg-primary w-15 rounded-xs h-full p-2 flex items-center justify-center text-black bg-red cursor-pointer text-lg">
                <SearchIcon className="text-white w-5 h-5 " />
            </div>
        </form>
    )
}
