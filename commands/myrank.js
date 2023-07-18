import { emotes } from "../helpers/constants.js"
import { settings } from "../settings/myrank.js"

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"

export function myrank(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(() => {
            const rank = Math.floor(Math.random() * 7) + 1
            const number = Math.floor(Math.random() * 5) + 1

            let emote
            let emoteset
            let rankname

            emotes[channel]
                ? (emoteset = emotes[channel])
                : (emoteset = emotes["default"])

            switch (rank) {
                case 1:
                    emote = emoteset.dice1
                    rankname = "Bronze"
                    break
                case 2:
                    emote = emoteset.dice2
                    rankname = "Silver"
                    break
                case 3:
                    emote = emoteset.dice4
                    rankname = "Gold"
                    break
                case 4:
                    emote = emoteset.dice6
                    rankname = "Platinum"
                    break
                case 5:
                    emote = emoteset.dice8
                    rankname = "Diamond"
                    break
                case 6:
                    emote = emoteset.dice9
                    rankname = "Master"
                    break
                case 7:
                    emote = emoteset.dice10
                    rankname = "Grandmaster"
                    break
            }
            chatClient.say(channel, `@${user} your rank is ${rankname} ${number} ${emote}`)
        })
        .catch((error) => {})
}
