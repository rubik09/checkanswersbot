import fs from 'fs-extra';
import { TelegramClient } from 'telegram';
import { StoreSession } from 'telegram/sessions';
import { NewMessage } from 'telegram/events/index';
import input from 'input';

async function autoReply() {
  try {
    if (fs.existsSync('./db') === false) {
      fs.mkdirSync('./db', { recursive: true });
    }

    if (fs.existsSync('./db/api.json') === false) {
      const apiid = await input.text('Please enter your Api ID: ');
      const apihash = await input.text('Please enter your Api Hash: ');

      fs.writeJsonSync('./db/api.json', { api_id: Number(apiid), api_hash: apihash });
    }

    if (fs.existsSync('./db/auto_reply.json') === false) {
      fs.writeJsonSync('./db/auto_reply.json', {"Привет" : "Я не дома"});
    }

    const jsonapi = await fs.readJson('./db/api.json').catch(() => console.log('The User1.json file has been created'));
    const apiId = jsonapi.api_id;
    const apiHash = jsonapi.api_hash;
    const storesession = new StoreSession('Session');
    const client = new TelegramClient(storesession, apiId, apiHash);
    await client.connect();

    if (!await client.checkAuthorization()) {
      await client.start({

        phoneNumber: await input.text('Please enter your number: '),
        password: await input.text('Please enter your password: '),
        phoneCode: await input.text('Please enter the code you received: '),
        onError: (err) => console.log(err.message),

      });
    }

    async function eventPrint(event) {
      client.setParseMode('html');

      const dialogsClient = await client.getDialogs({});
      const dialogs = dialogsClient[0];
      const chatId = dialogs.id;

      const messageId = event.message.id;
      const msg = event.message.message;
      const json = fs.readJsonSync('./db/auto_reply.json');
      const jsonReply = Object.values(json)[0];

      if (msg === 'Привет') {
        setTimeout(async () => {
          await client.sendMessage(chatId, { message: jsonReply, replyTo: messageId });
        }, 6000);
      }
    }

    client.addEventHandler(eventPrint, new NewMessage({}));
  } catch (error) {
    console.log(error);
  }
}

autoReply();
