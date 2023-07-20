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

const createChatcompletion = async (promptMessage,isTranslatedMessage, messageTone) => {
  let prompt;

  if(isTranslatedMessage){
    if (messageTone === "default") {
      prompt = `${promptMessage}`;
    } else if (messageTone !== "default") {
      prompt = `convert [${promptMessage}] into [${messageTone}] tone. Do not add any descriptions or additional words. Answer in quotes.`;
    }
  } else{
    prompt = `translate [${promptMessage}]  to English. Do not write any explanation or additional words with the translation. Only Send the translation in the quotation not any other information. 
    If the message is already in English. Just send it in a quotation without explanation else send the translation. My first sentence/word is [${promptMessage} ].`;
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
