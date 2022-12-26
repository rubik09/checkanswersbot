import 'dotenv/config';
import { NewMessage } from 'telegram/events/index';
import client from './clientAuth';
import eventPrint from './eventPrint';

async function autoReply() {
  try {
    client.addEventHandler(eventPrint, new NewMessage({}));
  } catch (error) {
    console.log(error);
  }
}

autoReply();

// async function eventPrint(event) {
//   client.setParseMode('html');

//   const dialogsClient = await client.getDialogs({});
//   const dialogs = dialogsClient[0];
//   const chatId = dialogs.id;

//   const messageId = event.message.id;
//   const msg = event.message.message;
//   const json = fs.readJsonSync('./db/auto_reply.json');
//   const jsonReply = Object.values(json)[0];

//   if (msg === 'Привет') {
//     setTimeout(async () => {
//       await client.sendMessage(chatId, { message: jsonReply, replyTo: messageId });
//     }, 6000);
//   }
// }
