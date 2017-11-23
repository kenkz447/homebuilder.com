export const toCurrency = (number: number) => {
    const converted = number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND',  })
    return converted.substr(1, converted.length)
}