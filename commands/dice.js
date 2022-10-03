const settings = {
    enabled: true,
    // permission: 50, // TODO
    globalDelay: 300,
    userDelay: 5000,
}

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"

export function dice(chatClient, channel, user, args) {
    readyToRun(settings, status, channel, user)
        .then(() => {
            let maxNum
            isNaN(args[0]) ? (maxNum = 6) : (maxNum = args[0])
            chatClient.say(
                channel,
                `@${user} rolled a ${Math.floor(Math.random() * maxNum) + 1}`
            )
        })
        .catch((error) => {})
}
