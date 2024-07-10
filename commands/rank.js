import { emotes } from "../helpers/constants.js"
import { settings } from "../settings/rank.js"

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"

export function rank(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(() => {
            const rank =
                Math.ceil(Math.random() * 100) <= 2
                    ? 9
                    : Math.ceil(Math.random() * 8)

            let number = Math.ceil(Math.random() * 5)
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
                    emote = emoteset.dice5
                    rankname = "Platinum"
                    break
                case 5:
                    emote = emoteset.dice6
                    rankname = "Diamond"
                    break
                case 6:
                    emote = emoteset.dice7
                    rankname = "Master"
                    break
                case 7:
                    emote = emoteset.dice8
                    rankname = "Grandmaster"
                    break
                case 8:
                    emote = emoteset.dice9
                    rankname = "Champion"
                    break
                case 9:
                    emote = emoteset.dice10
                    rankname = "Top"
                    number = Math.ceil(Math.random() * 500)
                    break
            }
            chatClient.saySafe(
                channel,
                `@${user} your rank is ${rankname} ${number} ${emote}`
            )
        })
        .catch((error) => {})
}
