import { settings } from "../settings/ask.js"

let status = {}

import axios from "axios"

import { readyToRun } from "../helpers/commandHandler.js"
// import OpenAI from "openai"

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// })

// export async function ask(chatClient, channel, user, msg, args) {
//     readyToRun(settings, status, channel, user, msg)
//         .then(async () => {
//             const q = args.join(" ")

//             const safe = await openai.moderations.create({
//                 mode: "text-moderation-latest",
//                 input: q,
//             })

//             if (safe.results[0].flagged) {
//                 chatClient.saySafe(channel, "Don't be weird Dudge")
//                 return
//             }

//             let actorPrompt =
//                 "You are a funny chatbot that either replies with accurate responses or sarcasm. Keep responses short when possible"
//             let questionPrompt = q

//             if (q.includes("a:") && q.includes("q:")) {
//                 actorPrompt = q.split("a:")[1].split("q:")[0]
//                 questionPrompt = q.split("q:")[1]
//             }

//             const completion = await openai.chat.completions.create({
//                 messages: [
//                     { role: "system", content: actorPrompt },
//                     { role: "user", content: questionPrompt },
//                 ],
//                 model: "gpt-3.5-turbo",
//                 temperature: 1,
//                 max_tokens: 120,
//                 top_p: 1,
//                 frequency_penalty: 0,
//                 presence_penalty: 0,
//             })

//             chatClient.saySafe(channel, completion.choices[0].message.content)
//         })
//         .catch((error) => {})
// }

const key = process.env.RAPIDAPI_KEY

export async function ask(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(async () => {
            const q = args.join(" ")

            let actorPrompt =
                "You are a funny chatbot that either replies with accurate responses or sarcasm. Keep responses short when possible"
            let questionPrompt = q

            if (q.includes("a:") && q.includes("q:")) {
                actorPrompt = q.split("a:")[1].split("q:")[0]
                questionPrompt = q.split("q:")[1]
            }

            try {
                const response = await axios.request({
                    method: "POST",
                    url: "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions",
                    headers: {
                        "content-type": "application/json",
                        "X-RapidAPI-Key": key,
                        "X-RapidAPI-Host":
                            "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
                    },
                    data: {
                        messages: [
                            { role: "system", content: actorPrompt },
                            { role: "user", content: questionPrompt },
                        ],
                        model: "gpt-4-turbo-preview",
                        temperature: 1,
                        max_tokens: 120,
                        top_p: 1,
                        frequency_penalty: 0,
                        presence_penalty: 0,
                    },
                })

                chatClient.saySafe(
                    channel,
                    response.data.choices[0].message.content
                )
            } catch (error) {
                chatClient.saySafe(
                    channel,
                    "Tell Stydevz to fix me SeriousSloth"
                )
            }
        })
        .catch((error) => {})
}
