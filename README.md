# 🎙️ WhatsApp Tone Transformer
![WhatsApp Tone Transformer](./public/working.gif)

## How it works

WhatsApp tone transformer can convert the an audio message transcription into different tones created with APIMatic auto-generated SDKs for [WhatsApp API ](https://www.apimatic.io/apidocs/whatsapp-api/v/1_0#/http/guides/send-a-message),['ChatGPT API ](https://www.apimatic.io/api-docs/whisper-api) API and ['Whisper API ](https://www.apimatic.io/api-docs/whisper-api) API.

## 🔧 How to Run Locally

### Cloning the repository the local machine.

```bash
git clone https://github.com/mehnoorsiddiqui/whatsapp-tone-transformer.git
```

### Creating a account on Meta to get an API key.

1. Go to [Meta](https://developers.facebook.com/) to make a developer account.
2. Create an App by following the [getting started guide](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started).
3. You can find your Access token from the Meta for Developers site App `Dashboard > WhatsApp > Getting Started`.

### Setting up Webhook URL

To set up webhook on the Meta Developer portal (also enter matching verify token, `app`  in our case). You may use a service like [ngrok](https://ngrok.com/) to make your local app publicly accessible so this webhook can be registered with Whatsapp.
[![Webhook](./public/webhook.png)]

### Storing the API keys in .env
Replace the `WHATSAPP_TOKEN` with your token in the .env file.
Replace the `PHONE_NUMBER_ID` with yours in the .env file.

### Installing the dependencies.
1. Navigate to the OpenAI+Whisper+API directory and run 
```bash
npm install
```
2. Navigate to the WhatsApp+Cloud+API directory and run 
```bash
npm install
```
3. Navigate to the root folder and run 
```bash
npm install
```

### Running the application.

Then, run the application in the command line and it can be tested by sending an audio message to test number given in the developer account.

```bash
npm start
```

