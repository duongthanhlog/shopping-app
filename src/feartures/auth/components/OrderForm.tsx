import Button from '@/components/ui/Button'
import { useState } from 'react'

export default function ModalForm() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        address: '',
        type: 'home',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="space-y-4 bg-white z-10 p-6">
            {/* name + phone */}
            <h1 className="text-2xl font-medium">Cập nhật địa chỉ </h1>
            <div className="flex gap-3">
                <input
                    name="name"
                    placeholder="Họ và tên"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 w-1/2 rounded"
                />

                <input
                    name="phone"
                    placeholder="Số điện thoại"
                    value={form.phone}
                    onChange={handleChange}
                    className="border p-2 w-1/2 rounded"
                />
            </div>

            {/* province */}
            <select
                name="province"
                value={form.province}
                onChange={handleChange}
                className="border p-2 w-full rounded"
            >
                <option>Chọn tỉnh / thành phố</option>
                <option>Hà Nội</option>
                <option>TP HCM</option>
            </select>

            {/* district */}
            <select
                name="district"
                value={form.district}
                onChange={handleChange}
                className="border p-2 w-full rounded"
            >
                <option>Chọn quận / huyện</option>
            </select>

            {/* ward */}
            <select
                name="ward"
                value={form.ward}
                onChange={handleChange}
                className="border p-2 w-full rounded"
            >
                <option>Chọn phường / xã</option>
            </select>

            {/* detail address */}
            <input
                name="address"
                placeholder="Địa chỉ cụ thể (số nhà, đường...)"
                value={form.address}
                onChange={handleChange}
                className="border p-2 w-full rounded"
            />

            {/* address type */}
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => setForm({ ...form, type: 'home' })}
                    className={`px-4 py-2 border rounded cursor-pointer ${
                        form.type === 'home' ? 'border-primary text-primary' : ''
                    }`}
                >
                    Nhà riêng
                </button>

                <button
                    type="button"
                    onClick={() => setForm({ ...form, type: 'office' })}
                    className={`px-4 py-2 border rounded cursor-pointer ${
                        form.type === 'office' ? 'border-primary text-primary' : ''
                    }`}
                >
                    Văn phòng
                </button>
                <Button active className="ml-auto hover:bg-red-600">
                    Hoàn thành
                </Button>
            </div>
        </div>
    )
}
