'use client'
import { useForm } from 'react-hook-form'
import { LoginFormData } from '../auth.types'
import { login as loginApi } from '../auth.service'
import { CloseIcon } from '@/public/icons'
import { useModal } from '../../../context/modal.context'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../auth.context'
import { useToast } from '../../toast/toast.context'
import Spinner from '@/components/ui/Spinner'
import { queryClient } from '@/lib/query-client'
import useLogin from '../hooks/useLogin'

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>()

    const { mutate, isPending } = useLogin()
    const { closeModal, openModal } = useModal()

    const onSubmit = async (data: LoginFormData) => {
        mutate(data)
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="z-10 bg-white rounded-sm flex flex-col p-4 px-8 w-100 pb-10 select-none"
        >
            <div onClick={() => closeModal()}>
                <CloseIcon className="w-10 h-10 ml-auto text-gray-300 cursor-pointer hover:text-gray-400" />
            </div>
            <div className="text-center text-[50px] text-primary font-normal ">
                Đăng nhập
            </div>
            <div className="flex flex-col">
                <label className="mt-4" htmlFor="">
                    Email
                </label>
                <input
                    {...register('email', {
                        required: 'Vui lòng nhập email',
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
                <span className="h-4 text-red-400">
                    {errors.email && errors.email.message}
                </span>
            </div>
            <div className="flex flex-col">
                <label className="mt-4" htmlFor="">
                    Mật khẩu
                </label>
                <input
                    {...register('password', {
                        required: 'Vui lòng nhập mật khẩu',
                    })}
                    className="border-none outline-none bg-gray-100 rounded-[2px] px-2 h-10"
                    type="password"
                    placeholder="Mật khẩu"
                    name="password"
                    id=""
                />
                <span className="h-4 text-red-400">
                    {errors.password && errors.password.message}
                </span>
            </div>
            <button
                disabled={isPending}
                type="submit"
                className="p-2 bg-primary centerdiv w-full h-12 text-white rounded-[4px] mt-8 hover:opacity-80 cursor-pointer"
            >
                {isPending ? <Spinner /> : 'Đăng nhập'}
            </button>
            <div className="mt-2">
                Chưa có tài khoản? -{' '}
                <span
                    onClick={() => openModal('register')}
                    className="text-primary cursor-pointer hover:underline"
                >
                    Đăng ký
                </span>
            </div>
        </form>
    )
}
