import { Api } from 'telegram';
import client from './clientAuth';

async function setTyping(chatId) {
  await client.invoke(
    new Api.messages.SetTyping({
      peer: chatId,
      action: new Api.SendMessageTypingAction({ action: '#16bf744e' }),
      // topMsgId: 43,
    }),
  );
}

export default setTyping;
