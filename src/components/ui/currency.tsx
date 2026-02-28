interface Props {
    bottom: number
    right?: number
    size?: number
}

export default function Currency({ bottom, right, size }: Props) {
    return (
        <span
            style={{
                bottom: `${bottom}px`,
                right: `${right}px`,
                fontSize: `${size}px`,
            }}
            className={`relative text-[10px] ml-[2px] underline `}
        >
            đ
        </span>
    )
}
