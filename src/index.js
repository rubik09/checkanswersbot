import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot('5985047743:AAH4vJy5RX9NBUmawsyxbhnIpCRoeHTjDmk', {
  polling: {
    params: {
      allowed_updates: true,
    },
  },
});

bot.on('message', async (msg) => {
      if (msg.text) {
        try {
          const keyboard = [];
          const textFromManager = msg.text.split(' ');
          const number = textFromManager.findIndex((item) => item === 'кнопки:');
          const buttons = textFromManager.slice(number + 1);
          textFromManager.splice(number);
          buttons.forEach((item) => {
            const arr = item.split(',');
            const buttonText = arr[0];
            const link = arr[1];
            keyboard.push([{
              text: buttonText,
              url: link,
            }]);
          });
          await bot.sendMessage(
            msg.from.id,
            textFromManager.join(' '),
            {
              parse_mode: 'HTML',
              reply_markup: JSON.stringify({
                inline_keyboard:
                keyboard,
              }),
            },
          );
        } catch (err) {
          await bot.sendMessage(msg.from.id, 'text message wrong');
          console.log(err.message);
        }
      }
      if (msg.photo) {
        try {
          const keyboard = [];
          const textFromManager = msg.caption.split(' ');
          const number = textFromManager.findIndex((item) => item === 'кнопки:');
          const buttons = textFromManager.slice(number + 1);
          textFromManager.splice(number);
          buttons.forEach((item) => {
            const arr = item.split(',');
            const buttonText = arr[0];
            const link = arr[1];
            keyboard.push([{
              text: buttonText,
              url: link,
            }]);
          });
          const photo = msg.photo.find((item) => item.file_id);
          await bot.sendPhoto(msg.from.id, photo.file_id, {
            parse_mode: 'HTML',
            caption: textFromManager.join(' '),
            reply_markup: JSON.stringify({
              inline_keyboard:
                  keyboard,
            }),
          });
        } catch (err) {
          await bot.sendMessage(msg.from.id, 'photo with text message wrong');
          console.log(err.message);
        }
      }
      if (msg.video) {
        try {
          const keyboard = [];
          const textFromManager = msg.caption.split(' ');
          const number = textFromManager.findIndex((item) => item === 'кнопки:');
          const buttons = textFromManager.slice(number + 1);
          textFromManager.splice(number);
          buttons.forEach((item) => {
            const arr = item.split(',');
            const buttonText = arr[0];
            const link = arr[1];
            keyboard.push([{
              text: buttonText,
              url: link,
            }]);
          });
          await bot.sendVideo(msg.from.id, msg.video.file_id, {
            parse_mode: 'HTML',
            caption: textFromManager.join(' '),
            reply_markup: JSON.stringify({
              inline_keyboard:
                  keyboard,
            }),
          });
        } catch (err) {
          await bot.sendMessage(msg.from.id, 'video with text message wrong');
          console.log(err.message);
        }
      }
      if (msg.video_note) {
        try {
          await bot.sendVideoNote(msg.from.id, msg.video_note.file_id);
        } catch (err) {
          await bot.sendMessage(msg.from.id, 'video note message wrong');
          console.log(err.message);
        }
      }
});