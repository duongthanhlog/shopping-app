import { useModal } from '../../context/modal.context'

export default function ConfirmModal() {
    const { closeModal, confirmOption, type } = useModal()

    const handleConfirm = () => {
        if (!confirmOption) return
        confirmOption.onConfirm()
    }

    if (type !== 'confirm') return null

    return (
        <>
            <div className="flex flex-col bg-white z-100 p-4 rounded-[8px] w-[400px] ">
                <span
                    className="text-[18px] tracking-wide select-none
            "
                >
                    {confirmOption?.title}
                </span>
                <div className="flex shrink-0 ml-auto mt-10">
                    <button
                        onClick={handleConfirm}
                        className="cursor-pointer hover:bg-red-700 bg-primary text-white rounded-md p-2 px-3 mr-2"
                    >
                        Xác nhận
                    </button>
                    <button
                        onClick={closeModal}
                        className="cursor-pointer hover:bg-gray-400  bg-gray-300 p-2 px-3 text-gray-500  rounded-md"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </>
    )
}
