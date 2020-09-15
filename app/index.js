const TelegramBot = require("node-telegram-bot-api");
const env = require("../config");
const bot = new TelegramBot(env.bot_token, { polling: true });

// Send Changes To Myself
bot.on("message", (msg) => {
  bot.sendMessage(env.my_telegram_chatId, `Original message JSON : ${JSON.stringify(msg)}`);

  if (msg.chat.title === env.telegram_group || env.telegram_group_1) {
    const date = msg.date;
    const memberId = msg.from.id;
    const memberFirstName = msg.from.first_name;
    const memberUsername = msg.from.username;

    if (msg.left_chat_member) {
      bot.sendMessage(
        env.my_telegram_chatId,
        `${memberFirstName}(Username:${memberUsername} ID:${memberId}) left ${msg.chat.title} on ${date}`
      );
    }

    if (msg.new_chat_member) {
      bot.sendMessage(
        env.my_telegram_chatId,
        `${memberFirstName}(Username:${memberUsername} ID:${memberId}) joined ${msg.chat.title} on ${date}`
      );
    }
  }
});

// Simple test messages
bot.on("message", (msg) => {
  console.log(msg);
  const message = msg.text.toLowerCase();
  bot.sendMessage(msg.chat.id, "Hello! If you want to start using this bot, contact the owner @Gxxin");

  if (message === "hello") {
    bot.sendMessage(msg.chat.id, "Hello!");
  } else if (message === "i love you") {
    bot.sendMessage(msg.chat.id, "I love you too");
  }
});
