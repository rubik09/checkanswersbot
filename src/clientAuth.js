import fs from 'fs/promises';
import TelegramBot from 'node-telegram-bot-api';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { APIID, APIHASH, BOTID } from './config';

const bot = new TelegramBot(BOTID, {
  polling: {
    params: {
      allowed_updates: true,
    },
  },
});
const sessionClient = await fs.readFile('./session/api.txt', 'utf-8');
const stringSession = new StringSession(sessionClient);
const client = new TelegramClient(stringSession, Number(APIID), APIHASH, { connectionRetries: 5 });

async function messageAuth(chatId, message) {
  return new Promise(async (res) => {
    await bot.sendMessage(chatId, message);
    bot.on('message', async (msg) => {
      res(msg.text);
    });
  });
}

await bot.setMyCommands([{ command: '/start', description: 'Start process' }]);

bot.on('message', async (msg) => {
  const { text } = msg;
  const chatId = msg.chat.id;
  if (text === '/start') {
    await client.connect();
    if (!await client.checkAuthorization()) {
      await client.start({

        phoneNumber: async () => await messageAuth(chatId, 'Please enter you phone number'),
        password: async () => await messageAuth(chatId, 'Please enter your password'),
        phoneCode: async () => await messageAuth(chatId, 'Please enter telegram code you recieved'),
        onError: (err) => console.log(err.message),

      });
      const session = client.session.save();
      await fs.writeFile('./session/api.txt', session);
    }
  }
});

export default client;
