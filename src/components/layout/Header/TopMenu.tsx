import useGetUser from '@/feartures/auth/hooks/useGetUser'
import useHeaderMenu from '../../../hooks/useHeaderMenu'
import MenuItem from './Menu'

export default function TopMenu() {
    const { menuRight } = useHeaderMenu()
    const { user } = useGetUser()

    return (
        <ul className="text-white-500 flex ml-auto">
            {menuRight.map((item, index) => (
                <MenuItem
                    userRole={user?.role}
                    item={item}
                    key={index}
                    className="text-sm pt-1 ml-3.5 cursor-pointer flex items-center"
                />
            ))}
        </ul>
    )
}
