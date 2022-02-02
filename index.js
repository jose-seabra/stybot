import "./env.js"
import { RefreshingAuthProvider } from "@twurple/auth"
import { ChatClient } from "@twurple/chat"
import { promises as fs } from "fs"

import { getCompliment } from "./functions/compliment.js"
import { getRandomNumber } from "./functions/dice.js"
import { getSR, playSlots } from "./functions/sr.js"
import { pyramid } from "./functions/pyramid.js"
import { getRandomJoke } from "./functions/joke.js"
import { getTranslation, detectLanguage } from "./functions/translate.js"

async function main() {
    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLIENT_SECRET
    const tokenData = JSON.parse(await fs.readFile("./tokens.json"))
    const authProvider = new RefreshingAuthProvider(
        {
            clientId,
            clientSecret,
            onRefresh: async (newTokenData) =>
                await fs.writeFile(
                    "./tokens.json",
                    JSON.stringify(newTokenData, null, 4),
                    "UTF-8"
                ),
        },
        tokenData
    )

    const chatClient = new ChatClient({
        authProvider,
        channels: ["stybot2", "stydevz"],
    })

    await chatClient.connect()

    const PREFIX = "!"
    let wait = false

    chatClient.onMessage((channel, user, message) => {
        if (
            (!message.startsWith(PREFIX) &&
                !message.startsWith("stybot") &&
                !message.startsWith("@stybot")) ||
            wait
        ) {
            return
        }

        const [command, ...args] = message.slice(PREFIX.length).split(/ +/g)
        // : message.slice(message.indexOf("stybot")).trim().split(/ +/g)
        let output

        switch (command) {
            case "cheer":
                chatClient.say(
                    channel,
                    `${args[0] ?? user} ${getCompliment()} KPOPheart`
                )
                break
            case "dice":
                output = getRandomNumber(args[0])
                chatClient.say(channel, `@${user} rolled a ${output}`)
                break
            case "badjoke":
                getRandomJoke().then((output) => {
                    if (output.type === "single") {
                        chatClient.say(channel, `${output.joke}`)
                    } else if (output.type === "twopart") {
                        wait = true
                        chatClient.say(channel, `${output.setup}`)
                        setTimeout(() => {
                            chatClient.say(channel, `${output.delivery}`)
                            wait = false
                        }, 5000)
                    }
                })
                break
            case "pyramid":
                output = pyramid(args[0])
                if (output === undefined) break
                chatClient.say(channel, `${output}`)
                break
            case "sr":
                output = getSR(channel)
                chatClient.say(
                    channel,
                    `${user} your SR is ${output.sr} ${output.emote}`
                )
                break
            case "slots":
                output = playSlots(channel)
                chatClient.say(
                    channel,
                    `${user} rolled | ${output[0]} | ${output[1]} | ${output[2]} | ${output[3]}`
                )
                break
            case "translate":
                let text
                let targetLang
                if (args[0].startsWith("to:")) {
                    targetLang = args[0].substring(3)
                    text = message.substring(command.length + 8)
                } else {
                    text = message.substring(command.length + 2)
                }

                detectLanguage(text)
                    .then(
                        async (originLang) => {
                            if (originLang === 404) {
                                chatClient.say(
                                    channel,
                                    `@${user} sorry I couldn't detect the language`
                                )
                                return;
                            }
                        const response = await getTranslation(
                            text,
                            originLang,
                            targetLang
                        )
                        chatClient.say(
                            channel,
                            `@${user} lang:${response.sourceLanguageCode} "${response.translatedText}"`
                        )
                        }
                    )
                    .catch((error) => {
                        console.log("aoaiaioaiaia")
                    })
                break

        }
    })

    chatClient.onSub((channel, user) => {
        chatClient.say(
            channel,
            `Thanks to @${user} for subscribing to the channel!`
        )
    })

    chatClient.onResub((channel, user, subInfo) => {
        chatClient.say(
            channel,
            `Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`
        )
    })

    const giftCounts = new Map()
    chatClient.onCommunitySub((channel, user, subInfo) => {
        const previousGiftCount = giftCounts.get(user) ?? 0
        giftCounts.set(user, previousGiftCount + subInfo.count)
        chatClient.say(
            channel,
            `Thanks ${user} for gifting ${subInfo.count} subs to the community!`
        )
    })

    chatClient.onSubGift((channel, recipient, subInfo) => {
        const user = subInfo.gifter
        const previousGiftCount = giftCounts.get(user) ?? 0
        if (previousGiftCount > 0) {
            giftCounts.set(user, previousGiftCount - 1)
        } else {
            chatClient.say(
                channel,
                `Thanks ${user} for gifting a sub to ${recipient}!`
            )
        }
    })
}

main()
