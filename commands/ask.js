import { settings } from "../settings/ask.js"

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function ask(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(async () => {
            const q = args.join(" ")

            const safe = await openai.createModeration({
                mode: "text-moderation-latest",
                input: q,
            })

            if (safe.data.results[0].flagged) {
                chatClient.say(channel, "Don't be weird Dudge")
                return
            }

            const response = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: `Stybot is a chatbot that answers questions with funny and controversial responses:\n\nYou: ${q}\nStybot:`,
                temperature: 1,
                max_tokens: 120,
                top_p: 0.5,
                frequency_penalty: 0.5,
                presence_penalty: 0,
            })
            chatClient.say(channel, response.data.choices[0].text)
        })
        .catch((error) => {})
}
