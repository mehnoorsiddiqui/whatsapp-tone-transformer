const { sendMessage } = require("../services/WhatsAppCloudService");

async function handleListMessage(from, message, userObj) {
    const listReplyID = message?.interactive?.list_reply?.id;

    switch (listReplyID) {
        case "default":
            userObj.setTone("default");
            await sendMessage(from, "text", "You can now send messages to generate images");
            break;
        case "professional":
            userObj.setTone("professional");
            await sendMessage(from, "text", "Thank you for selecting the professional tone. We'll respond to you in a formal and respectful manner");
            break;
        case "casual":
            userObj.setTone("casual");
            await sendMessage(from, "text", "Thanks for selecting the casual tone. We'll keep it chill.");
            break;
        case "friendly":
            userObj.setTone("friendly");
            await sendMessage(from, "text", "Thank you for choosing the friendly tone. We'll make sure to keep it welcoming.");
            break;
        case "assertive":
            userObj.setTone("assertive");
            await sendMessage(from, "text", "Thanks for selecting the assertive tone. We'll respond with an assertive tone to make sure we address your needs.");
            break;
        case "excited":
            userObj.setTone("excited");
            await sendMessage(from, "text", "You can now talk to this bot in English");
            break;
        default:
            break;
    }
}

module.exports = handleListMessage;