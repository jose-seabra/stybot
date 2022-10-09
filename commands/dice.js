import { permissions } from "../helpers/constants.js"

const settings = {
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 0,
    userDelay: 1000,
}

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"

export function dice(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
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
