import { useToast } from './toast.context'
import { FailIcon, SuccessIcon, WarningIcon } from '@/public/icons'

export default function Toast() {
    const { toast } = useToast()
    if (!toast) return null
    return (
        <>
            {
                <div
                    className={`bg-white flex items-center rounded-md z-1000 ${toast && toast.type ? 'opacity-100  p-3  select-none' : 'opacity-0 select-none p-0'}   transition-opacity ease-in shadow-[0_10px_30px_-3px,0_4px_6px_-2px] fixed top-2 left-1/2 -translate-x-1/2 `}
                >
                    <>
                        {toast.type === 'success' && <SuccessIcon className="w-8 text-green-400" />}
                        {toast.type === 'warning' && <WarningIcon className="w-8 text-yellow-400" />}
                        {toast.type === 'error' && <FailIcon className="w-8 text-red-400" />}
                    </>
                    {<span className="ml-1">{toast.message}</span>}
                </div>
            }
        </>
    )
}
