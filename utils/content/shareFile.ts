export const shareOnWhatsApp = (url: string, text: string = '') => {
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`
  window.open(whatsappUrl, '_blank')
}

export const shareOnTelegram = (url: string, text: string = '') => {
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  window.open(telegramUrl, '_blank')
}

export const shareUsingWebShareAPI = (
  url: string,
  text: string = '',
  title: string = '',
) => {
  if (navigator.share) {
    navigator
      .share({
        title,
        text,
        url,
      })
      .catch((error) => console.error('Error sharing', error))
  } else {
    alert('Web Share API is not supported in your browser.')
  }
}
