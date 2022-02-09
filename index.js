const fs = require('fs-extra');
const { TelegramClient, Api } = require('telegram');
const { StoreSession } = require('telegram/sessions/index.js');
const { NewMessage } = require('telegram/events/index.js');
const input = require('input');

async function auto_reply() {

    try {


        if (fs.existsSync('./db') === false ){

            fs.mkdirSync('./db', { recursive: true });
          
        }
        
        if (fs.existsSync('./db/api.json') === false ){

            let apiid = await input.text("Please enter your Api ID: ");
            let apihash = await input.text("Please enter your Api Hash: ");
            
            fs.writeJsonSync('./db/api.json', {api_id: Number(apiid) , api_hash: apihash});
          
        }

        if (fs.existsSync('./db/auto_reply.json') === false ){

            fs.writeJsonSync('./db/auto_reply.json', {});
          
        }

        const jsonapi = await fs.readJson('./db/api.json').catch(() => console.log("The User1.json file has been created"));
        const apiId = jsonapi.api_id;
        const apiHash = jsonapi.api_hash;
        const storesession = new StoreSession('Session');
        const client = new TelegramClient(storesession, apiId, apiHash);
        await client.connect();

        if (!await client.checkAuthorization()) {

            await client.start({
          
              phoneNumber: async () => await input.text("Please enter your number: "),
              password: async () => await input.text("Please enter your password: "),
              phoneCode: async () => await input.text("Please enter the code you received: "),
              onError: (err) => console.log(err.message),
            
            });
      
        }

        async function eventPrint(event) {

            client.setParseMode("html");
    
            let dialogs_client = await client.getDialogs({})
            let getReply = await event.message.getReplyMessage();
            let dialogs = dialogs_client[0];
            let chat_id = dialogs.id; 
           // let from_id = event.message.fromId !== null ? event.message.fromId.userId : event.message.peerId.userId ? event.message.peerId.userId : null;
           // let getEntity = from_id !== null ? await client.getEntity(from_id) : null;
           // let username = getEntity !== null && getEntity.username !== null ? getEntity.username.toLowerCase() : '' ;
            let body = event.message.text !== '' ? event.message.text : false;
            let message_id = event.message.id
            let json = fs.readJsonSync('./db/auto_reply.json');
            let json_array =  Object.keys(json);

            if (json_array.includes(body)) {

                let reply = json[body].reply
                let msg = reply[Math.floor(Math.random() * reply.length)]
                await client.sendMessage(chat_id, {message: msg, replyTo: message_id})
 
            }

            else if (getReply && getReply.media === null) {

                let reply = getReply.message !== '' ? getReply.message : false;
                let body = event.message.text !== '' ? event.message.text : false;

                if (reply && body) {

                    let httpx = body.includes('http') === false && reply.includes('http') === false;

                    if (body.length <= 150 && reply.length <= 150 && reply.length >= 5 && httpx && body.includes('@') === false && reply.includes('@') === false) {

                        await sleep(2000);
                        let json = fs.readJsonSync('./db/auto_reply.json');
                        let json_array =  Object.keys(json);
                       // await sleep(2000);

                        if (json_array.includes(reply) === false) {
                        
                            await fs.writeJson('./db/auto_reply.json', Object.assign({}, json, { [reply]: { "reply": [body]} }), { spaces: '\t' });

                        }
        
                        else if (json_array.includes(reply) === true) {
        
                            if (json[reply].reply.includes(body) === false) {
        
                                json[reply].reply.push(body);
                                await fs.writeJson('./db/auto_reply.json', json, { spaces: '\t' });
                                
                            }
                            
                        }
                        
                    }
                    
                }
                
            }
    
        }

        client.addEventHandler(eventPrint, new NewMessage({}));

        
    } catch (error) {

        console.log(error);
        
    }
    
}


auto_reply()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
