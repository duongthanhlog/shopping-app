// 'use client'
// import { useState } from 'react'
// import { ArrowDownIcon } from '@/public/icons'

// export default function NavBar({ className }) {
//     const [active, setActive] = useState(0)
//     const navMenu = [
//         { text: 'Top sản phẩm nổi bật' },
//         { text: 'Trời trang & phụ kiện' },
//         { text: 'Shopee siêu rẻ' },
//         { text: 'Deal giá sốc' },
//         { text: 'Shop yêu thích' },
//         { text: 'Điện tử & gia dụng' },
//         { text: 'Thêm', icon: <ArrowDownIcon className="w-5 h-5 mt-[3px]" /> },
//     ]
//     return (
//         <div className={`${className} bg-white`}>
//             <ul className="flex justify-between">
//                 {navMenu.map((t, i) => {
//                     return (
//                         <li
//                             key={i}
//                             onClick={() => setActive(i)}
//                             className={`cursor-pointer flex-1 flex justify-center py-3 flex items-center tracking-tight hover:text-primary `}
//                         >
//                             <span
//                                 className={`text-[16px] font-medium text-center ${t.icon ? 'flex' : ''} ${active === i ? 'text-primary' : ''} ${i === 0 || i === navMenu.length - 1 ? 'normal-case' : 'uppercase'}`}
//                             >
//                                 {t.text} {t.icon}
//                             </span>
//                         </li>
//                     )
//                 })}
//             </ul>
//         </div>
//     )
// }
