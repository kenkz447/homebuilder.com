export const toCurrency = (number: number = 0) => {
    const converted = number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', })
    return converted.substr(1, converted.length)
}