export function cleanMobileNumber(mobileNumber: string) {
  const cleanedNumber = mobileNumber.replace(/[^0-9]/g, '')
  if (cleanedNumber.startsWith('7')) {
    return cleanedNumber.slice(1)
  }
  return cleanedNumber
}

export function removeCountryCode(phone: string) {
  return phone.replace('+7', '')
}
