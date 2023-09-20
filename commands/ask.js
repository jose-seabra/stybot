import { settings } from "../settings/ask.js"

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function ask(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(async () => {
            const q = args.join(" ")

            const safe = await openai.moderations.create({
                mode: "text-moderation-latest",
                input: q,
            })

            if (safe.results[0].flagged) {
                chatClient.say(channel, "Don't be weird Dudge")
                return
            }

            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a funny chatbot that either replies with accurate responses or sarcasm" },
                    { role: "user", content: q },
                ],
                model: "gpt-3.5-turbo",
            })

            chatClient.say(channel, completion.choices[0].message.content)
        })
        .catch((error) => {})
}
