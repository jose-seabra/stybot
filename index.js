import "./env.js"
import { RefreshingAuthProvider } from "@twurple/auth"
import { ChatClient } from "@twurple/chat"
import { promises as fs } from "fs"
import knex from "knex"
import knexfile from "./database/knexfile.js"

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

    // const db = knex({
    //     client: "pg",
    //     connection: process.env.PG_CONNECTION_STRING,
    // })

    // const db = knex(knexfile[process.env.NODE_ENV])

    const PREFIX = "!"
    // const ADMIN = "stydevz"

    chatClient.onMessage((channel, user, message) => {
        if (!message.startsWith(PREFIX)) {
            return
        }

        const [command, ...args] = message.slice(PREFIX.length).split(/ +/g)

        if (commands[command]) {
            commands[command](chatClient, channel, user, args)
        }

        // if (command === "migrate" && user === ADMIN) {
        //     // console.log(db)
        //     // db("channels").insert({ name: "xd" }).returning("*").toString()
        //     db.schema
        //         .createTable("channels", (table) => {
        //             table.increments("id")
        //             table.string("name")
        //         })
        //         .createTable("commands", (table) => {
        //             table.increments("id")
        //             table.string("name")
        //         })
        //         .createTable("channel_command", (table) => {
        //             table.boolean("enabled")
        //             table.integer("channel_id").references("channels.id")
        //             table.integer("command_id").references("commands.id")
        //         })
        //         .then(() => chatClient.say(channel, "Migration successful"))
        // }
        // if (command === "drop" && user === ADMIN) {
        //     // console.log(db)
        //     // db("channels").insert({ name: "xd" }).returning("*").toString()
        //     db.schema
        //         .dropSchemaIfExists("channels", true)
        //         .dropSchemaIfExists("commands", true)
        //         .dropSchemaIfExists("channel_command", true)
        //         .then(() => chatClient.say(channel, "Drop successful"))
        //     // db.schema
        //     //     .dropTableIfExists("channels")
        //     //     .dropTableIfExists("commands")
        //     //     .dropTableIfExists("channel_command")
        //     //     .then(() => chatClient.say(channel, "Drop successful"))
        // }
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
