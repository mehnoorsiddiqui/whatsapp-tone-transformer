const Transcription = require("../Transcription");
const { createChatcompletion } = require("../services/OpenAIService");
const { sendMessage } = require("../services/WhatsAppCloudService");

async function handleAudioMessage(from, message, userObj) {

    const audioID = message?.audio.id;
    const messageTone = userObj.getTone();

    try {
        const transcriptedMessage = await Transcription(audioID);
        if (!transcriptedMessage) {
            await sendMessage(from, "text", "Sorry, we were unable to detect any audio in your message. Please make sure your microphone is enabled and try again.");
            return;
        }
        if (messageTone === "default") {
            await sendMessage(from, "text", transcriptedMessage);
        } else if (messageTone !== "default") {
            const chatGPTResponse = await createChatcompletion(transcriptedMessage,true, messageTone);
            const regex = /"([^"]*)"/;
            const match = regex.exec(chatGPTResponse);
            const gptPrompt = match ? match[1] : chatGPTResponse;
            await sendMessage(from, "text", gptPrompt);
        }
    } catch (error) {
        console.log(error)
        await sendMessage(from, "text", " Sorry, we could not complete your request at this time. Please try again later or contact support if the problem persists.");
    }
}

module.exports = handleAudioMessage;