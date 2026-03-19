export default function Tooltip({
    children,
    className,
}: {
    children: React.ReactNode
    className: string
}) {
    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
            }}
            className={`${className} select-none group:hover-block absolute after:content[''] after:w-full after:h-4 after:bg-transparent after:absolute after:top-[-12px] `}
        >
            <div className="absolute top-[-10px] right-4 w-0 h-0 border-l-10 border-r-10 border-b-10 border-l-transparent border-r-transparent border-b-white"></div>
            {children}
        </div>
    )
}
