import { useState } from 'react'

export default function Button({ children, onClick, className, active, disabled }: any) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${active ? 'bg-primary text-white' : 'bg-white text-black'}  select-none rounded-sm cursor-pointer  px-4 py-1 font-semibold ${className}`}
        >
            {children}
        </button>
    )
}
