'use client'
import TopMenu from '@/components/layout/Header/TopMenu'
import useGetUser from '@/feartures/auth/hooks/useGetUser'

export default function CartLayout({ children }) {
    const { isLoading } = useGetUser()
    return (
        <>
            <div className="bg-primary">
                <div
                    className=" text-white mx-auto flex h-[30px] w-full justify-between sm:max-w-[360px] md:max-w-[768px]
               lg:max-w-[1200px]"
                >
                    {!isLoading && <TopMenu />}
                </div>
            </div>
            {children}
        </>
    )
}
