import fs from 'fs/promises';
import { Api } from 'telegram';
import { _parseMessageText } from 'telegram/client/messageParse';
import client from './clientAuth';
import user from './models/users';
import clientInvoke from './clientInvoke';

async function eventPrint(event) {
  client.setParseMode('html');

  const dialogsClient = await client.getDialogs({});
  const dialogs = dialogsClient[0];
  const chatId = dialogs.id;
  const userId = await user.getUserId(chatId);

  if(!userId.length) {

    await clientInvoke(chatId);
    await client.sendMessage(chatId, { message : `Hello my friend👋`, schedule: (12 + (Date.now() / 1000))});
    await client.sendMessage(chatId, { message : `We play Aviator- I give you signals, you bet and win.`,  schedule: (18 + (Date.now() / 1000))});
    await client.sendMessage(chatId, { message : `I offer you good opportunity to make money - for the minimum deposit (500rs) i provide you with my personal predicator channel which gives you signals - you bet and win money.`,  schedule: (28 + (Date.now() / 1000))});
    await client.sendMessage(chatId, { message : `And for my help i ask to give me 10 percent of your winnings`, schedule: (38 + (Date.now() / 1000))});
    await client.sendMessage(chatId, { message : `If you're interested, we can continue`, schedule: (48 + (Date.now() / 1000))});

    await user.addUser(chatId, dialogs.entity.username);
  }
  const messageId = event.message.id;
  const msg = event.message.message;
  console.log(msg)
  const msgLowerCase = msg.toLowerCase();
  console.log(msgLowerCase)

  if (msgLowerCase === 'ok' || msgLowerCase === 'kk' || msgLowerCase === 'okay' || msgLowerCase === 'go' || msgLowerCase === 'ready' || msgLowerCase === '+') {
    const checkStage = await user.checkStage1(chatId);
    console.log(checkStage);
    console.log(checkStage[0].stage1);
    if(checkStage[0].stage1 === '-') {
      await clientInvoke(chatId);
      await client.sendMessage(chatId, { message: 'All you need to do is', schedule: (12 + (Date.now() / 1000)), replyTo: messageId });
      await client.sendMessage(chatId, { message: `Register NEW Account Here - https://referencemen.live/ktVmDV?c=0234-GtmaFsM5Oe90ff3b8b1c9c949&utm_campaign=Jeny`, schedule: (22 + (Date.now() / 1000)), parseMode: 'html' });
      await client.sendMessage(chatId, { message: `My predicator works only with my link 👆 so register only with my link ❗️`, schedule: (32 + (Date.now() / 1000)), parseMode: 'html' });
      await user.changeStage1Status(chatId);
    }
  }

  if(msgLowerCase === 'nice job 🤑') {
    const checkStage = await user.checkStage2(chatId);
    console.log(checkStage[0].stage2);
    if(checkStage[0].stage2 === '-') {
      await clientInvoke(chatId);
      await client.sendMessage(chatId, { message: 'There is still one final step to prepare the account for earning. Make deposit and write to me. We can start', schedule: (12 + (Date.now() / 1000))});
      await client.sendMessage(chatId, { message: `Deposit options📈\n\n🔥If deposit 500 rs - earn 2900 rs daily\n\n🔥If deposit 950 RS - you earn 4,000 daily\n\n🔥If deposit 1,700 RS - you earn 6,500 daily\n\n🔥If deposit 2,350 RS - you earn 7,800 daily\n\n🔥If deposit 3,900 RS - you earn 12,000 daily\n\n🔥IF DEPOSIT 5,500 RS - YOU GET VIP ACCOUNT AND EARN 18,000 and more daily 🔥🔥🔥`, schedule: (25 + (Date.now() / 1000))});
      await client.sendMessage(chatId, { message: ` I recommend depositing from 400 rupees for a greater chance of winning.`, schedule: (32 + (Date.now() / 1000))});
      await client.sendMessage(chatId, { message: ` After depositing money into account send me a screenshot, and then I will add you to my team where I will give the latest signals for earning real money`, schedule: (42 + (Date.now() / 1000))});
      await user.changeStage2Status(chatId);
    }
  }

  if(msgLowerCase === 'ok bro 🥳') {
    const checkStage = await user.checkStage3(chatId);
    console.log(checkStage[0].stage3);
    if(checkStage[0].stage3 === '-') {
      await clientInvoke(chatId);
      await client.sendMessage(chatId, { message: 'Nicely done', schedule: (12 + (Date.now() / 1000))});
      await client.sendMessage(chatId, { message: `Good job man, now if you have questions here are my private messages @aviatorvipl, all further work we will have in there.*\n\n👇👇👇\n\n@aviatorvipl`, schedule: (22 + (Date.now() / 1000))});
      await client.sendMessage(chatId, { message: `THIS NEXT TEXT IS ALL ABOUT SIGNALS READ CAREFULLY`, schedule: (32 + (Date.now() / 1000))});
      await client.sendMessage(chatId, { message: `So signals will come on our channel daily at 3:30 PM\n\nChannel Link: [https://t.me/](https://t.me/+z2iy0tO8wnM2Yzhi*)ХХХХХХХХХХХХ\n\nGame Name: Aviator\n\nYou have to follow the signals very carefully and you have to act quickly when signal comes. If you bet late then you will lose the bet. Signals come daily at 3:30 in afternoon. Just follow them and bet quickly.\n\nBet in both slots in every round (5% of your balance in each slot)\n\nExample: If you have 300 rs balance then bet 15 rs in each slot so total 30 Rs bet per round\n\n1st Bet - Auto Cashout (We give auto cashout number before every game)\n\n2nd Bet - Manual Cashout between 2x-4x depending upon your risk capacity\n\nThe "Aviator" game is very simple. When you place a bet, you guess multiplier. If the Aviator hits your multiplier you earn money.\n\n🔴*BET - Means you need to make two bets immediately (when I give signal, means coefficient in this round will be high)*\n\n✅ *Means coefficient I cashed out this round\n\n ♻️ - Means insurance bet cashed out successfully\n\n❎ - Means bet lost\n\n👉 If you are new here and playing for the first time, I recommend you to start cashing out on a low coefficient, like 1.20 and practic with just 1-2 rs 👈`, schedule: (60 + (Date.now() / 1000))});
      await user.changeStage3Status(chatId);
    }
  }
}

export default eventPrint;
