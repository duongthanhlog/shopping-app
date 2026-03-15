export const formatCurrency = (number: number) => {
    const formated = new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number * 26000)
    return formated
}
export const parseCurrencyToApi = (value: any) => {
    const number = Number(value.replace(/\./g, ''))
    return (number / 26000).toFixed(2)
}
