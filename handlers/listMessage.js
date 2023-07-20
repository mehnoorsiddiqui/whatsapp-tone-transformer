const { sendMessage } = require("../services/WhatsAppCloudService");

async function handleListMessage(from, message, userObj) {
    const listReplyID = message?.interactive?.list_reply?.id;

    switch (listReplyID) {
        case "default":
            userObj.setTone("default");
            await sendMessage(from, "text", "You'll receive all your transcribed messages in the original tone from now on.");
            break;
        case "professional":
            userObj.setTone("professional");
            await sendMessage(from, "text", "Awesome! From now on, we'll transcribe all your messages in a professional tone");
            break;
        case "casual":
            userObj.setTone("casual");
            await sendMessage(from, "text", "Cool choice! From now on, we'll transcribe all your messages in a casual tone to make sure they sound relaxed and easy-going.");
            break;
        case "friendly":
            userObj.setTone("friendly");
            await sendMessage(from, "text", "Cool choice! From now on, we'll transcribe all your messages in a friendly tone to make sure they sound welcoming and approachable.");
            break;
        case "assertive":
            userObj.setTone("assertive");
            await sendMessage(from, "text", "Great choice! From now on, we'll transcribe all your messages in an assertive tone to ensure that they sound confident, clear and impactful.");
            break;
        default:
            break;
    }
}

module.exports = handleListMessage;