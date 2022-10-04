const settings = {
    enabled: true,
    // permission: 50, // TODO
    globalDelay: 60000,
    userDelay: 120000,
}

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"
import { Configuration, OpenAIApi } from "openai"
import axios from "axios"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function ask(chatClient, channel, user, args) {
    readyToRun(settings, status, channel, user)
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
                prompt: `Stybot is a full-time employee that reluctantly answers chatters dumb questions with sarcastic responses:\n\nYou: ${q}\nStybot:`,
                temperature: 0.5,
                max_tokens: 60,
                top_p: 0.3,
                frequency_penalty: 0.5,
                presence_penalty: 0,
            })
            chatClient.say(channel, response.data.choices[0].text)
        })
        .catch((error) => {})
}
