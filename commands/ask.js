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
                chatClient.saySafe(channel, "Don't be weird Dudge")
                return
            }

            let actorPrompt =
                "You are a funny chatbot that either replies with accurate responses or sarcasm. Keep responses short when possible"
            let questionPrompt = q

            if (q.includes("a:") && q.includes("q:")) {
                actorPrompt = q.split("a:")[1].split("q:")[0]
                questionPrompt = q.split("q:")[1]
            }

            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: actorPrompt },
                    { role: "user", content: questionPrompt },
                ],
                model: "gpt-3.5-turbo",
                temperature: 1,
                max_tokens: 120,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            })

            chatClient.saySafe(channel, completion.choices[0].message.content)
        })
        .catch((error) => {})
}
