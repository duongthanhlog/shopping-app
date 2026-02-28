import useAuthLogin from '@/feartures/auth/auth.hook'
import useHeaderMenu from '../../../hooks/useHeaderMenu'
import { menuLeft } from './const'
import MenuItem from './Menu'

export default function TopMenu() {
    const { data, isLoading } = useAuthLogin()
    const { menuRight } = useHeaderMenu()
    return (
        <>
            <ul className="text-white-500 flex">
                {menuLeft.map((item, index) => {
                    const showDivider = index < menuLeft.length - 2
                    return (
                        <MenuItem
                            user={data}
                            loading={isLoading}
                            key={index}
                            item={item}
                            className={`cursor-pointer relative after:relative ${showDivider ? "after:content-['|']" : ''}
                                after:left-2 ${showDivider && 'after:pr-3'} after:opacity-40 text-sm pt-1 pr-1 flex items-center`}
                        />
                    )
                })}
            </ul>
            <ul className="text-white-500 flex">
                {menuRight.map((item, index) => (
                    <MenuItem
                        user={data}
                        loading={isLoading}
                        item={item}
                        key={index}
                        className="text-sm pt-1 ml-3.5 cursor-pointer flex items-center"
                    />
                ))}
            </ul>
        </>
    )
}
