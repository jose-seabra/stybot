import { settings } from "../settings/commands.js"

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"

export function commands(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(() => {
            chatClient.say(
                channel,
                `@${user} a full list of commands can be found at https://tinyurl.com/stybot`
            )
        })
        .catch((error) => {})
}
