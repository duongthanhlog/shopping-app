import Button from '@/components/ui/Button'
import { useState } from 'react'
import useGetAddress from './hooks/useGetAddress'
import useUpdateAddress from './hooks/useUpdateAddress'
import { AddressFormType } from './checkout.type'
import { useModal } from '@/context/modal.context'

export default function CheckOutForm() {
    const [form, setForm] = useState<AddressFormType>({
        name: '',
        phone: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        type: 'home',
    })

    const [provinceId, setProvinceId] = useState('')
    const [districtId, setDistrictId] = useState('')
    const [wardId, setWardId] = useState('')

    const { provinces, districts, wards } = useGetAddress({ provinceId, districtId })
    const { mutate } = useUpdateAddress()
    const { closeModal } = useModal()

    const handleChange = (e) => {
        setForm((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    const handleChangeProvinces = (e) => {
        const province = e.target.options[e.target.selectedIndex].text
        setForm((prev) => ({
            ...prev,
            ward: '',
            district: '',
            province,
        }))

        setProvinceId(e.target.value)
        setDistrictId('')
        setWardId('')
    }

    const handleChangeDitricts = (e) => {
        const district = e.target.options[e.target.selectedIndex].text
        setForm((prev) => ({
            ...prev,
            district,
        }))
        setDistrictId(e.target.value)
    }

    const handleChangeWard = (e) => {
        const ward = e.target.options[e.target.selectedIndex].text
        setForm((prev) => ({
            ...prev,
            ward,
        }))
        setWardId(e.target.value)
    }

    const handleSubmit = () => {
        mutate(form)
        closeModal()
    }

    return (
        <div className="z-10 space-y-4 bg-white p-6">
            {/* name + phone */}
            <h1 className="text-2xl font-medium">Cập nhật địa chỉ </h1>
            <div className="flex gap-3">
                <input
                    value={form.name}
                    onChange={handleChange}
                    name="name"
                    placeholder="Họ và tên"
                    className="w-1/2 rounded border p-2"
                />

                <input
                    value={form.phone}
                    onChange={handleChange}
                    name="phone"
                    placeholder="Số điện thoại"
                    className="w-1/2 rounded border p-2"
                />
            </div>

            {/* province */}
            <select
                onChange={handleChangeProvinces}
                className="w-full rounded border p-2"
                name="provinces"
            >
                <option value="">Chọn tỉnh / thành phố</option>
                {provinces?.map((p) => {
                    return (
                        <option key={p.code} value={p.code}>
                            {p.name}
                        </option>
                    )
                })}
            </select>

            {/* district */}
            <select
                onChange={handleChangeDitricts}
                name="ditricts"
                className="w-full rounded border p-2"
            >
                <option>Chọn quận / huyện</option>
                {districts?.districts.map((d) => {
                    return (
                        <option key={d.code} value={d.code}>
                            {d.name}
                        </option>
                    )
                })}
            </select>

            {/* ward */}
            <select onChange={handleChangeWard} className="w-full rounded border p-2">
                <option>Chọn phường / xã</option>
                {wards?.wards.map((w) => {
                    return (
                        <option key={w.code} value={w.code}>
                            {w.name}
                        </option>
                    )
                })}
            </select>

            {/* detail address */}
            <input
                onChange={handleChange}
                name="address"
                placeholder="Địa chỉ cụ thể (số nhà, đường...)"
                value={form.address}
                className="w-full rounded border p-2"
            />

            {/* address type */}
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => setForm({ ...form, type: 'home' })}
                    className={`cursor-pointer rounded border px-4 py-2 ${
                        form.type === 'home' ? 'border-primary text-primary' : ''
                    }`}
                >
                    Nhà riêng
                </button>

                <button
                    type="button"
                    onClick={() => setForm({ ...form, type: 'office' })}
                    className={`cursor-pointer rounded border px-4 py-2 ${
                        form.type === 'office' ? 'border-primary text-primary' : ''
                    }`}
                >
                    Văn phòng
                </button>
                <Button
                    onClick={() => closeModal()}
                    className="ml-auto hover:bg-gray-200"
                >
                    Trở lại
                </Button>
                <Button onClick={handleSubmit} active className="hover:bg-red-600">
                    Hoàn thành
                </Button>
            </div>
        </div>
    )
}
