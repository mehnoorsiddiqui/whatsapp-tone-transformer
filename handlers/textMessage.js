const { createChatcompletion } = require("../services/OpenAIService");
const { sendMessage } = require("../services/WhatsAppCloudService");

async function handleTextMessage(from, message, userObj) {
    const textBody = message.text?.body;
    const messageTone = userObj.getTone();

    try {
        const translatePromptToEnglish = await createChatcompletion(textBody, false);
        const changePromptTone = await createChatcompletion(translatePromptToEnglish, true, messageTone);
        const regex = /"([^"]*)"/;
        const match = regex.exec(changePromptTone);
        const gptPrompt = match ? match[1] : changePromptTone;
        await sendMessage(from, "text", gptPrompt);
    } catch (error) {
        console.log(error)
        await sendMessage(from, "text", " Sorry, we could not complete your request at this time. Please try again later or contact support if the problem persists.");
    }

}

module.exports = handleTextMessage;
