import fs from 'fs/promises';
import TelegramBot from 'node-telegram-bot-api';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import input from 'input';
import { APIID, APIHASH , PHONENUMBER , BOTID} from './config';


const bot = new TelegramBot(BOTID, {
  polling: {
    params: {
      allowed_updates: true,
    },
  },
});
const session = await fs.readFile('./db/api.txt','utf-8');
const stringSession = new StringSession(session);
const client = new TelegramClient(stringSession, Number(APIID), APIHASH,  { connectionRetries: 5 });

await bot.setMyCommands([{command: '/start', description : 'Start process'}]);

bot.on('message', async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  if(text === '/start') {
    await client.connect();
    if (!await client.checkAuthorization()) {
      await client.start({

        phoneNumber: async () =>   await message(chatId,'Please enter you phone number'),
        password: async () => await message(chatId, 'Please enter your password'),
        phoneCode: async () => await message(chatId, 'Please enter telegram code you recieved'),
        onError: (err) => console.log(err.message),
    
      });
      const session = client.session.save();
      await fs.writeFile('./db/api.txt', session);
    }
  }
})

async function message(chatId, message) {
  return new Promise(async (res, rej) => {
    await bot.sendMessage(chatId, message);
    bot.on('message', async (msg) => {
      res(msg.text);
    })
  })

}

export default client;
