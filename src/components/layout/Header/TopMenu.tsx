import useGetUser from '@/feartures/auth/hooks/useGetUser'
import useHeaderMenu from '../../../hooks/useHeaderMenu'
import MenuItem from './Menu'
import { menuLeft } from './const'

export default function TopMenu() {
    const { menuRight } = useHeaderMenu()
    const { user } = useGetUser()

    return (
        <ul className="text-white-500 flex justify-between w-full mx-auto items-center">
            <li className="flex">
                {menuLeft.map((item, index) => (
                    <MenuItem
                        userRole={user?.role}
                        item={item}
                        key={index}
                        className="text-sm  ml-3.5 cursor-pointer flex items-center"
                    />
                ))}
            </li>
            <li className="flex">
                {menuRight.map((item, index) => (
                    <MenuItem
                        userRole={user?.role}
                        item={item}
                        key={index}
                        className="text-sm  ml-3.5 cursor-pointer flex items-center"
                    />
                ))}
            </li>
        </ul>
    )
}
