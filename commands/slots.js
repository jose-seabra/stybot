const EMOTES = {
    default: {
        slot1: "OSFrog",
        slot2: "OhMyDog ",
        slot3: "CoolCat",
        slotsWin: "bttvNice",
        slotsLoss: "Jebasted",
        dice1: "PoroSad",
        dice2: "DansGame",
        dice3: "NinjaGrumpy",
        dice4: "CaitlynS",
        dice5: "GingerPower",
        dice6: "MVGame",
        dice7: "PotFriend",
        dice8: "Poooound",
        dice9: "PogChamp",
        dice10: "PogBones",
    },
}

import { permissions } from "../helpers/constants.js"

const settings = {
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 0,
    userDelay: 120000,
}

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"

export function slots(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(() => {
            const slotFaces = 3
            let emoteset
            let emotesArray = []

            channel = channel.substring(1)

            EMOTES[channel]
                ? (emoteset = EMOTES[channel])
                : (emoteset = EMOTES["default"])

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
