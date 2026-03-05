import { useForm } from 'react-hook-form'
import { CloseIcon } from '@/public/icons'
import { useModal } from '../../../context/modal.context'
import { RegisterFormData } from '../auth.types'
import useRegister from '../hooks/useRegister'

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<RegisterFormData>()

    const { mutate, isPending } = useRegister()
    const { closeModal, openModal } = useModal()
    const onSubmit = async (data: RegisterFormData) => {
        mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="z-10 bg-white rounded-sm flex flex-col p-4 px-8 w-100 pb-10">
            <span onClick={() => closeModal()}>
                <CloseIcon className="w-10 h-10 ml-auto text-gray-300 cursor-pointer hover:text-gray-400" />
            </span>
            <div className="text-center text-[50px] text-primary font-normal">Đăng ký</div>
            <div className="flex flex-col">
                <label className="mt-4" htmlFor="">
                    Email
                </label>
                <input
                    {...register('email', {
                        required: 'Email không được để trống',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Email không hợp lệ',
                        },
                    })}
                    className="border-none outline-none bg-gray-100 rounded-[2px] px-2 h-10"
                    type="text"
                    placeholder="Địa chỉ email e.x: abc@gmail.com"
                    name="email"
                    id=""
                />
                <span className="h-4 text-red-400">{errors?.email && errors?.email?.message}</span>
            </div>
            <div className="flex flex-col">
                <label className="mt-4" htmlFor="">
                    Mật khẩu
                </label>
                <input
                    {...register('password', {
                        required: 'Vui lòng nhập mật khẩu',
                        minLength: {
                            value: 6,
                            message: 'Mật khẩu phải chứa ít nhất 6 ký tự',
                        },
                    })}
                    className="border-none outline-none bg-gray-100 rounded-[2px] px-2 h-10"
                    type="password"
                    placeholder="Mật khẩu"
                    name="password"
                    id=""
                />
                <span className="h-4 text-red-400">{errors?.password && errors?.password?.message}</span>
            </div>
            <div className="flex flex-col">
                <label className="mt-4" htmlFor="">
                    Nhập lại mật khẩu
                </label>
                <input
                    {...register('confirmPassword', {
                        required: 'Vui lòng nhập lại mật khẩu',
                        minLength: {
                            value: 6,
                            message: 'Mật khẩu phải chứa ít nhất 6 ký tự',
                        },
                        validate: (value) => value === getValues('password') || 'Mật khẩu không khớp',
                    })}
                    className="border-none outline-none bg-gray-100 rounded-[2px] px-2 h-10"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    name="confirmPassword"
                    id=""
                />
                <span className="h-4 text-red-400">{errors?.confirmPassword && errors?.confirmPassword?.message}</span>
            </div>
            <button
                disabled={isPending}
                type="submit"
                className="p-2 bg-primary text-white rounded-[4px] mt-10 hover:opacity-80 cursor-pointer"
            >
                {isPending ? '... đang đăng ký' : 'Đăng ký'}
            </button>
            <div className="mt-2">
                Đã có tài khoản? -{' '}
                <span onClick={() => openModal('login')} className="text-primary cursor-pointer hover:underline">
                    Đăng nhập
                </span>
            </div>
        </form>
    )
}
