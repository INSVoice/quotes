require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const quotes = require("./quotes");

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

const intro = "📢 *The Truth They Don't Want You to Hear...*";
const outro =
  "_We demand change not with chaos, but with truth, awareness, and accountability. The system must work for the people—not just the powerful._";

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

async function sendQuote() {
  const quote = getRandomQuote();
  const fullMessage = `${intro}\n\n"${quote}"\n\n${outro}`;

  try {
    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, fullMessage, {
      parse_mode: "Markdown",
      message_thread_id: parseInt(process.env.TELEGRAM_TOPIC_ID),
    });
    console.log(`[${new Date().toISOString()}] Quote sent.`);
  } catch (err) {
    console.error("Failed to send quote:", err.message);
  }
}

// Send immediately + every 8 hours
sendQuote();
setInterval(sendQuote, 8 * 60 * 60 * 1000);
