import "./env.js"
import { RefreshingAuthProvider } from "@twurple/auth"
import { ChatClient } from "@twurple/chat"
import { promises as fs } from "fs"

import { sleep } from "./helpers/helper.js"
import { enabledChannels } from "./helpers/channels.js"

import * as commands from "./commands/index.js"

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
        channels: enabledChannels,
    })

    await chatClient.connect()

    const PREFIX = "!"

    chatClient.onMessage((channel, user, message) => {
        if (!message.startsWith(PREFIX)) {
            return
        }

        const [command, ...args] = message.slice(PREFIX.length).split(/ +/g)

        if (commands[command]) {
            commands[command](chatClient, channel, user, args)
        }
    })

    chatClient.onSub((channel, user) => {
        commands.cheer(chatClient, channel, user, [user])
    })

    chatClient.onResub((channel, user, subInfo) => {
        commands.cheer(chatClient, channel, user, [user])
    })

    // const giftCounts = new Map()
    // chatClient.onCommunitySub((channel, user, subInfo) => {
    //     const previousGiftCount = giftCounts.get(user) ?? 0
    //     giftCounts.set(user, previousGiftCount + subInfo.count)
    //     chatClient.say(
    //         channel,
    //         `Thanks ${user} for gifting ${subInfo.count} subs to the community!`
    //     )
    // })

    // chatClient.onSubGift((channel, recipient, subInfo) => {
    //     const user = subInfo.gifter
    //     const previousGiftCount = giftCounts.get(user) ?? 0
    //     if (previousGiftCount > 0) {
    //         giftCounts.set(user, previousGiftCount - 1)
    //     } else {
    //         chatClient.say(
    //             channel,
    //             `Thanks ${user} for gifting a sub to ${recipient}!`
    //         )
    //     }
    // })
}

main()
