const { Client, MessagesController, MediaController } = require('whatsapp-cloud-apilib');
const fetch = require('node-fetch');
const token = process.env.WHATSAPP_ACCESS_TOKEN;

const client = new Client({
  timeout: 0,
  accessToken: token,
  version: 'v16.0'
});
const messagesController = new MessagesController(client);

const sendMessage = async (from, messageType, text) => {

  const phoneNumberID = process.env.WHATSAPP_PHONE_NUMBER_ID;

  let body = {
    messagingProduct: 'whatsapp',
    to: from
  };

  switch (messageType) {
    case 'text':
      body.type = "text";
      body.text = { body: text }
      break;
    case 'interactive_tone':
      body.type = "interactive";
      body.interactive = {
        action: {
          sections: [
            {
              title: "Select the Tone",
              rows: [
                {
                  id: "default",
                  title: "Default"
                },
                {
                  id: "professional",
                  title: "Professional"
                },
                {
                  id: "casual",
                  title: "Casual"
                },
                {
                  id: "friendly",
                  title: "Friendly"
                },
                {
                  id: "assertive",
                  title: "Assertive"
                }
              ]
            }
          ],
          button: "Tones"
        },
        body: {
          text: "Select the Tone"
        },
        type: "list"
      }
      break;
    default:
      console.log('This is not a known type');
      break;
  }
  try {
    await messagesController.sendMessage(phoneNumberID, body);

  } catch (error) {
    throw error;
  }
}


const mediaController = new MediaController(client);

const downloadAudio = async (mediaID) => {
  try {
    const { result } = await mediaController.retrieveMediaURL(mediaID);
    const audioURL = result.url;
    const config = { headers: { authorization: `Bearer ${token}` } };
    const audioBinary = await fetch(audioURL, config);
    return audioBinary;

  } catch (error) {
    throw error;
  }
}


module.exports = { sendMessage, downloadAudio };
