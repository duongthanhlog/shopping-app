import Modal from '@/components/ui/Modal'
import useGetUser from '../hooks/useGetUser'
import { Adresses } from '../auth.types'
import { MapIcon } from '@/public/icons'
import { useModal } from '@/context/modal.context'

export default function AddressList() {
    const { user } = useGetUser()
    const { openModal, closeModal } = useModal()
    const addressList = user?.addresses || []
    return (
        <Modal>
            <div className="z-10 flex flex-col gap-4 bg-white">
                <h1 className="text-xl font-semibold">Địa chỉ của tôi</h1>
                {addressList?.map((item: Adresses) => {
                    console.log(item)
                    return (
                        <div key={item._id} className="flex gap-2 text-[14px]">
                            <div className="flex flex-col items-center">
                                {/* <div className="bg-primary h-7 w-7 rounded-full"></div> */}
                                <MapIcon className="text-primary mt-auto w-4 pb-1" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold text-black">
                                    {item.fullName}
                                </span>
                                <span className="text-gray-500">
                                    Số điện thoại: {item.phone}
                                </span>
                                <span className="text-gray-500">
                                    Địa chỉ : {item.address} {item.ward}- {item.district}-
                                    {item.province}
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    openModal('address')
                                }}
                                className="text-primary mb-auto ml-auto cursor-pointer text-lg font-semibold"
                            >
                                Thay đổi
                            </button>
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}
