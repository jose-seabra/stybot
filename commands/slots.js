import { emotes } from "../helpers/constants.js"
import { settings } from "../settings/slots.js"

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"

export function slots(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(() => {
            const slotFaces = 3
            let emoteset
            let emotesArray = []

            channel = channel.substring(1)

            emotes[channel]
                ? (emoteset = emotes[channel])
                : (emoteset = emotes["default"])

            let slotsArray = [
                Math.floor(Math.random() * slotFaces) + 1,
                Math.floor(Math.random() * slotFaces) + 1,
                Math.floor(Math.random() * slotFaces) + 1,
            ]

            for (let i = 0; i < slotsArray.length; i++) {
                switch (slotsArray[i]) {
                    case 1:
                        emotesArray.push(emoteset.slot1)
                        break
                    case 2:
                        emotesArray.push(emoteset.slot2)
                        break
                    case 3:
                        emotesArray.push(emoteset.slot3)
                        break
                }
            }

            if (
                slotsArray[0] === slotsArray[1] &&
                slotsArray[1] === slotsArray[2]
            ) {
                chatClient.say(
                    channel,
                    `@${user} rolled | ${emotesArray[0]} | ${emotesArray[1]} | ${emotesArray[2]} | And won ${emoteset.slotsWin}`
                )
            } else {
                chatClient.say(
                    channel,
                    `@${user} rolled | ${emotesArray[0]} | ${emotesArray[1]} | ${emotesArray[2]} | Better luck next time ${emoteset.slotsLoss}`
                )
            }
        })
        .catch((error) => {})
}
