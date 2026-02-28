import { useState } from 'react'

export default function Button({ children, onClick, className, active }: any) {
    return (
        <button
            onClick={onClick}
            className={`${active ? 'bg-primary text-white' : 'bg-white text-black'} cursor-pointer  px-4 py-1 font-semibold ${className}`}
        >
            {children}
        </button>
    )
}
