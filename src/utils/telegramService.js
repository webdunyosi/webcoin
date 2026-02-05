// Telegram Bot Configuration
const BOT_TOKEN = "8040317680:AAH55ODJWx_6yI6iJz9Zp1FTSIONrFzcDeE"
const CHAT_ID = "5414733748"
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

export const sendCartToTelegram = async (studentName, cartItems) => {
  if (cartItems.length === 0) {
    return { success: false, error: "Savatcha bo'sh" }
  }

  try {
    // Format cart items
    let message = `📦 *Yangi sovg'a buyurtma*\n\n`
    message += `👤 *O'quvchi:* ${studentName}\n`
    message += `📅 *Vaqti:* ${new Date().toLocaleString("uz-UZ")}\n\n`
    message += `*Sovg'alar:*\n`

    let totalPrice = 0
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.title} - ${item.price} Coin\n`
      totalPrice += item.price
    })

    message += `\n💰 *Jami narx:* ${totalPrice} Coin`

    // Send to Telegram
    const response = await fetch(TELEGRAM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    const data = await response.json()

    if (data.ok) {
      return { success: true, message: "Buyurtma yuborildi!" }
    } else {
      return { success: false, error: "Xatolik yuz berdi" }
    }
  } catch (error) {
    console.error("Telegram send error:", error)
    return { success: false, error: error.message }
  }
}
