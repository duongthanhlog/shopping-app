export const formatCurrency = (number: any) => {
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number * 26000)
}
export const parseCurrencyToApi = (value: any) => {
    const number = Number(value.replace(/\./g, ''))
    return (number / 26000).toFixed(2)
}
