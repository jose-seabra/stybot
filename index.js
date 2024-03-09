import "./env.js"
import { RefreshingAuthProvider } from "@twurple/auth"
import { ChatClient } from "@twurple/chat"
import { promises as fs } from "fs"

import { enabledChannels, PREFIX } from "./helpers/constants.js"
import { filterSlurs, retryOnDnsFailure } from "./helpers/helper.js"

import * as commands from "./commands/index.js"
import { status as triviaStatus, end as triviaEnd } from "./commands/trivia.js"

import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import path from 'path'
import http from 'http'
import { fileURLToPath } from 'url'

async function main() {
    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLIENT_SECRET
    const userId = process.env.USER_ID
    const tokenData = JSON.parse(
        await fs.readFile(`./tokens.${userId}.json`, "UTF-8")
    )
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

    await authProvider.addUserForToken(tokenData, ["chat"])

    try {
        await retryOnDnsFailure(() => authProvider.addUserForToken(tokenData, ["chat"]))
    } catch (error) {
        fs.writeFile("./logs/error.log", "\n" + "Max retry attempts reached. Unable to complete the action." + "\n" + error, { flag: "a" })
        return
    }

    const chatClient = new ChatClient({
        authProvider,
        channels: enabledChannels,
    })

    chatClient.saySafe = (channel, text, attributes, rateLimiterOptions) => {
        const filteredMessage = filterSlurs(text)
        chatClient.say(channel, filteredMessage, attributes, rateLimiterOptions)
    }

    chatClient.connect()

    chatClient.onMessage((channel, user, text, msg) => {
        if (
            triviaStatus[channel]?.ongoing &&
            triviaStatus[channel].correct_answer &&
            triviaStatus[channel].correct_answer.toUpperCase() ===
                text.toUpperCase()
        ) {
            chatClient.saySafe(
                channel,
                `@${user} got it! Correct answer is ${triviaStatus[channel].correct_answer}`
            )
            triviaEnd(chatClient, channel)
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

    // captions
    const requestListener = function (req, res) {
        fs.readFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'embed.html'))
            .then(contents => {
                res.setHeader("Content-Type", "text/html")
                res.writeHead(200)
                res.end(contents)
            })
    }
    
    const server = http.createServer(requestListener)
    server.listen(1269, 'localhost', () => {
        console.log(`Server is running`)
    })

    ;(async () => {
        puppeteer.use(StealthPlugin())
    
        const browser = await puppeteer.launch({
            headless: 'new',
            executablePath: '/usr/bin/google-chrome'
        })
    
        const page = await browser.newPage()
        await page.goto(`http://localhost:1269/`)

        page.on('console', msg => {
            // ISSUES: find a better trigger word -> bot?
            // sometimes the trigger word is longer e.g. ends with an 's' -> maybe detect exact match instead of includes
            // need to batch the ...args so a command doesn't run immediately with 0 or 1 args
            
            if (msg.text().includes('bot')) {
                const afterCommand = msg.text().split('bot')[1].trim()
                const [command, ...args] = afterCommand.split(' ');
                // console.log("afterCommand: ", afterCommand)
                console.log("command: ", command)
                console.log("args: ", args)
                // console.log("msg: ", msg.text())
                commands[command]?.(chatClient, 'stydevz', 'stydevz', 'VOICE', args)
            } else {
                // console.log('no')
            }
        })
    
    })()

}

main()
