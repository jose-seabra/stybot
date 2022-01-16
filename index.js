import "./env.js"
import { RefreshingAuthProvider } from "@twurple/auth"
import { ChatClient } from "@twurple/chat"
import { promises as fs } from "fs"

import { getCompliment } from "./functions/compliment.js"
import { getRandomNumber } from "./functions/dice.js"
import { getSR } from "./functions/sr.js"
import { pyramid } from "./functions/pyramid.js"

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

    chatClient.onMessage((channel, user, message) => {
        function debug(output) {
            chatClient.say(channel, output)
        }

        if (
            !message.startsWith(PREFIX) &&
            !message.startsWith("stybot") &&
            !message.startsWith("@stybot")
        ) {
            return
        }

        const [command, ...args] = message.slice(PREFIX.length).split(/ +/g)
        // : message.slice(message.indexOf("stybot")).trim().split(/ +/g)
        let output

        switch (command) {
            case "dice":
                output = getRandomNumber(args[0])
                chatClient.say(channel, `@${user} rolled a ${output}`)
                break
            case "sr":
                output = getSR(channel)
                chatClient.say(
                    channel,
                    `${user} your SR is ${output.sr} ${output.emote}`
                )
                break
            case "compliment":
                chatClient.say(channel, `@${user} ${getCompliment()}`)
                break
            case "pyramid":
                output = pyramid(args[0])
                if (output === undefined) break
                chatClient.say(channel, `${output}`)
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

    chatClient.onSubGift((channel, user, subInfo) => {
        chatClient.say(
            channel,
            `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`
        )
    })
}

main()
