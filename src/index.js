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
