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

export function sr(chatClient, channel, user, args) {
    const sr = Math.floor(Math.random() * 4850) + 1
    let emote
    let emoteset

    channel = channel.substring(1)

    EMOTES[channel]
        ? (emoteset = EMOTES[channel])
        : (emoteset = EMOTES["default"])

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
}
