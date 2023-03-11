import "./env.js"
import { RefreshingAuthProvider } from "@twurple/auth"
import { ChatClient } from "@twurple/chat"
import { promises as fs } from "fs"

import { enabledChannels } from "./helpers/constants.js"

import * as commands from "./commands/index.js"
import {
    status as triviaStatus,
    questionTimeout as triviaTimeout,
    optionsTimeout as triviaOptionsTimeout,
} from "./commands/trivia.js"

async function main() {
    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLIENT_SECRET
    const userId = process.env.USER_ID
    const tokenData = JSON.parse(await fs.readFile(`./tokens.${userId}.json`, 'UTF-8'))
    const authProvider = new RefreshingAuthProvider({
        clientId,
        clientSecret,
        onRefresh: async (userId, newTokenData) =>
            await fs.writeFile(
                `./tokens.${userId}.json`,
                JSON.stringify(newTokenData, null, 4),
                "UTF-8"
            ),
    })

    await authProvider.addUserForToken(
        tokenData,
        ["chat"]
    )

    const chatClient = new ChatClient({
        authProvider,
        channels: enabledChannels,
    })

    await chatClient.connect()

    const PREFIX = "!"

    chatClient.onMessage((channel, user, text, msg) => {
        if (
            triviaStatus[channel]?.ongoing &&
            triviaStatus[channel].correct_answer &&
            triviaStatus[channel].correct_answer.toUpperCase() ===
                text.toUpperCase()
        ) {
            chatClient.say(
                channel,
                `@${user} got it! Correct answer is ${triviaStatus[channel].correct_answer}`
            )
            triviaStatus[channel] = {
                ready: true,
                delayUsers: [],
            }
            clearTimeout(triviaTimeout[channel])
            clearTimeout(triviaOptionsTimeout[channel])
        }

        if (!text.startsWith(PREFIX)) {
            return
        }

        const [command, ...args] = text.slice(PREFIX.length).split(/ +/g)

        if (commands[command]) {
            commands[command](chatClient, channel, user, msg, args)
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
