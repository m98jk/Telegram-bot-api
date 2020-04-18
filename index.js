const express = require("express");
const app = express();
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const TOKEN = process.env.TOKEN;
const url = "https://nabeel-bot.herokuapp.com/";
const options = {
  webHook: { port: process.env.PORT },
};

// CREATING THE BOT
let bot;
if (process.env.NODE_ENV === "production") {
  bot = new TelegramBot(TOKEN);
  bot.setWebHook(process.env.HEROKU_URL + bot.TOKEN);
} else {
  bot = new TelegramBot(TOKEN, { polling: true });
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
      keyboard: [["FUCK THEM"], ["Hack them"]],
    },
  });
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});

// bot.setWebHook(process.env.HEROKU_URL + bot.TOKEN);
// bot.setWebHook(`${url}/${TOKEN}`);

app.listen(process.env.PORT);

app.post("/" + bot.TOKEN, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
