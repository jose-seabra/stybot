import { permissions, emotes } from "../helpers/constants.js"

const settings = {
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 0,
    userDelay: 120000,
}

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"

export function sr(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(() => {
            const sr = Math.floor(Math.random() * 4850) + 1
            let emote
            let emoteset

            channel = channel.substring(1)

            emotes[channel]
                ? (emoteset = emotes[channel])
                : (emoteset = emotes["default"])

            if (sr <= 500) {
                emote = emoteset.dice1
            } else if (sr > 500 && sr <= 1000) {
                emote = emoteset.dice2
            } else if (sr > 1000 && sr <= 1500) {
                emote = emoteset.dice3
            } else if (sr > 1500 && sr <= 2000) {
                emote = emoteset.dice4
            } else if (sr > 2000 && sr <= 2500) {
                emote = emoteset.dice5
            } else if (sr > 2500 && sr <= 3000) {
                emote = emoteset.dice6
            } else if (sr > 3000 && sr <= 3500) {
                emote = emoteset.dice7
            } else if (sr > 3500 && sr <= 4000) {
                emote = emoteset.dice8
            } else if (sr > 4000 && sr <= 4500) {
                emote = emoteset.dice9
            } else if (sr > 4500) {
                emote = emoteset.dice10
            }
            chatClient.say(channel, `@${user} your SR is ${sr} ${emote}`)
        })
        .catch((error) => {})
}
