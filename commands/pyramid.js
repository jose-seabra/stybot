import { permissions } from "../helpers/constants.js"

const settings = {
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 5000,
    userDelay: 60000,
}

let status = {}

import { hasNonAlphanumeric } from "./../helpers/helper.js"
import { readyToRun } from "../helpers/commandHandler.js"

export function pyramid(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(() => {
            let emote = args[0]
            if (args[0] === undefined) return
            if (hasNonAlphanumeric(emote) || emote.length >= 20) {
                return
            }
            chatClient.say(
                channel,
                ` ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ${emote} ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ${emote} ${emote} ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ${emote} ${emote} ${emote} ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ${emote} ${emote} ${emote} ${emote} ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ${emote} ${emote} ${emote} ${emote} ${emote}`
            )
        })
        .catch((error) => {})
}
