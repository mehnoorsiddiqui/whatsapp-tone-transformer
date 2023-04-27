const User = require("./User");
const handleAudioMessage = require("./handlers/audioMessage");
const handleListMessage = require("./handlers/listMessage");
const handleTextMessage = require("./handlers/textMessage");
const { sendMessage } = require("./services/WhatsAppCloudService");
const getMessageType = require("./utils/getMessageType");

const users = [];

function findUser(number) {
  return users.find(user => user.getNumber() === number);
}

function getUserOrCreate(number) {
  let user = findUser(number);
  if (!user) {
    user = new User(number);
    users.push(user);
  }
  return user;
}


async function processWhatsAppPostWebhook(message) {
  try {
    const MAX_MESSAGE_AGE_MINUTES = 12;

    //Ignore ibound notifications / messages  older than 12 min
    const recentMessages = message?.entry[0]?.changes[0]?.value?.messages?.filter(
      message => message.timestamp > (Date.now() - 1000 * 60 * MAX_MESSAGE_AGE_MINUTES) / 1000
    );

    const msg = recentMessages?.[0];

    if (!msg) {
      return;
    }

    const from = msg.from;
    let user = getUserOrCreate(from);
    const messageType = getMessageType(msg);

    switch (messageType) {
      case "tone":
        await sendMessage(from, "interactive_tone");
        break;
      case "list":
        await handleListMessage(from, msg, user);
        break;
      case "audio":
        await handleAudioMessage(from, msg, user);
        break;
      case "text":
        await handleTextMessage(from);
        break;
      default:
        break;
    }

  } catch (error) {
    console.log(error)
  }

}


module.exports = processWhatsAppPostWebhook;
