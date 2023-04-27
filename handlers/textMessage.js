const { sendMessage } = require("../services/WhatsAppCloudService");

async function handleTextMessage(from) {
    try {
        await sendMessage(from, "text", "Bot only supports audio messages");
    } catch (error) {
        console.log(error, "text");
    }
}

module.exports = handleTextMessage;
