import { apiDummy } from '@/lib/axios'
import { AddressCheckoutType, AddressFormType, CheckoutType } from './checkout.type'
export const getProvinces = async () => {
    const res = await fetch('https://provinces.open-api.vn/api/v1/p/')
    const data = res.json()
    return data
}

export const getDistricts = async (provinceId: string) => {
    const res = await fetch(
        `https://provinces.open-api.vn/api/v1/p/${provinceId}?depth=2`
    )
    const data = res.json()
    return data
}

export const getWards = async (districtId: string) => {
    const res = await fetch(
        `https://provinces.open-api.vn/api/v1/d/${districtId}?depth=2`
    )
    const data = res.json()
    return data
}

export const updateCheckoutPreview = async (
    checkoutList: { productId: string; quantity: number }[]
) => {
    const res = await apiDummy.post('/api/checkout', {
        checkoutList,
    })
    return res.data.data
}
export const getCheckoutPreview = async () => {
    const res = await apiDummy.get(`/api/checkout`)
    const { totalPrice, subTotal, checkoutList, shippingFee } = res.data.data
    return {
        totalPrice,
        subTotal,
        checkoutList,
        shippingFee,
    }
}
