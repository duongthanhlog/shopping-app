type Props = {
    size?: number
    border?: string
}
export default function Spinner({ size = 4, border = 'border-3' }: Props) {
    return (
        <div
            className={`w-${size} h-${size} ${border} border-gray-100 border-t-primary rounded-full animate-spin`}
        ></div>
    )
}
