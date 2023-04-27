const fs = require("fs");
const { Client, OpenAIController, FileWrapper } = require("openai-apilib");

// Create OpenAI configuration
const client = new Client({
  timeout: 0,
  accessToken: process.env.OPENAI_API_KEY
});

// Create OpenAI API client
const openAIController = new OpenAIController(client);

//translate and transcribe audio into English
const createTranscription = async audioFilePath => {
  const file = new FileWrapper(fs.createReadStream(audioFilePath));
  const model = "whisper-1";
  const prompt = "English responses"
  const responseFormat = "json";
  const temperature = 0;
  const language = "en";
  try {
    const { result } = await openAIController.createTranscription(file, model, prompt, responseFormat, temperature, language);
    return result.text;
  } catch (error) {
    throw error;
  }
};

const createChatcompletion = async (promptMessage, messageTone) => {
  let prompt;

  if (messageTone === "default") {
    prompt = `${promptMessage}`;
  } else if (messageTone !== "default") {
    prompt = `convert [${promptMessage}] into [${messageTone}] tone. Do not add any descriptions or additional words. Answer in quotes.`;
  }
  try {
    const { result } = await openAIController.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `${prompt}` }
      ],
      temperature: 0.5,
      max_tokens: 500,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2
    });
    return result.choices[0].message.content;
  } catch (error) {
    throw error;
  }
};

module.exports = { createTranscription, createChatcompletion };
