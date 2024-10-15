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

const apiProviders = [
    {
        name: "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api",
        url: "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions",
        headerHost:
            "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
        data: {
            model: "gpt-4o",
            max_tokens: 120,
            temperature: 0.9,
        },
    },
    {
        name: "chatgpt-best-price",
        url: "https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions",
        headerHost: "chatgpt-best-price.p.rapidapi.com",
        data: {
            model: "gpt-4o-mini",
        },
    },
    {
        name: "chat-gpt26",
        url: "https://chat-gpt26.p.rapidapi.com/",
        headerHost: "chat-gpt26.p.rapidapi.com",
        data: {
            model: "gpt-3.5-turbo",
        },
    },
    {
        name: "open-ai21",
        url: "https://open-ai21.p.rapidapi.com/conversationgpt35",
        headerHost: "open-ai21.p.rapidapi.com",
        data: {
            web_access: false,
            system_prompt: "",
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 120,
        },
    },
]

let currentApiIndex = 0
let attempts = 0

export async function ask(
    chatClient,
    channel,
    user,
    msg,
    args,
    bypassDelay = false
) {
    readyToRun(settings, status, channel, user, msg, bypassDelay)
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
                const currentApi = apiProviders[currentApiIndex]
                const options = {
                    method: "POST",
                    url: currentApi.url,
                    headers: {
                        "content-type": "application/json",
                        "X-RapidAPI-Key": key,
                        "X-RapidAPI-Host": currentApi.headerHost,
                    },
                    data: {
                        messages: [
                            { role: "system", content: actorPrompt },
                            { role: "user", content: questionPrompt },
                        ],
                        ...currentApi.data,
                    },
                }

                const response = await axios.request(options)

                chatClient.saySafe(
                    channel,
                    response.data.choices?.[0].message.content ||
                        response.data.result
                )
            } catch (error) {
                currentApiIndex = (currentApiIndex + 1) % apiProviders.length
                attempts++
                if (attempts >= apiProviders.length) {
                    attempts = 0
                    chatClient.saySafe(channel, "All API providers failed")
                    throw new Error(
                        "All API providers have reached their quota"
                    )
                }
                ask(chatClient, channel, user, msg, args, (bypassDelay = true))
            }
        })
        .catch((error) => {})
}
