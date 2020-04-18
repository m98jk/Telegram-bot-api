const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();
require("dotenv").config();
const token = process.env.TOKEN;

// CREATING THE BOT
let bot;
if (process.env.NODE_ENV === "production") {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
  bot = new TelegramBot(token, { polling: true });
}

bot.on("message", (msg) => {
  var Hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.chat.id, "Hello dear user");
  }
  var bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  }
  bot.sendMessage(msg.chat.id, "Hi, do you want to travel?", {
    reply_markup: {
      keyboard: [["Press"], ["SEE them"]],
    },
  });
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});

app.listen(process.env.PORT);

app.post("/" + bot.token, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
