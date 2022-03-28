const emotes = {
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

function getSR(channel) {
    const channelName = channel.substring(1)
    const sr = Math.floor(Math.random() * 4850) + 1
    let emote
    let emoteset

    if (!emotes[channelName]) {
        emoteset = emotes['default']
    } else {
        emoteset = emotes[channelName]
    }
    

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
    return {
        sr,
        emote,
    }
}

function playSlots(channel) {
    const slotFaces = 3
    let win = false
    let emotesArray = []

    console.log(channel)
    channel = channel.substring(1)

    let slotsArray = [
        Math.floor(Math.random() * slotFaces) + 1,
        Math.floor(Math.random() * slotFaces) + 1,
        Math.floor(Math.random() * slotFaces) + 1,
    ]

    for (let i = 0; i < slotsArray.length; i++) {
        switch (slotsArray[i]) {
            case 1:
                emotesArray.push(emotes[channel].slot1)
                break
            case 2:
                emotesArray.push(emotes[channel].slot2)
                break
            case 3:
                emotesArray.push(emotes[channel].slot3)
                break
        }
    }

    if (slotsArray[0] === slotsArray[1] && slotsArray[1] === slotsArray[2]) {
        win = true
    }

    if (win === true) {
        win = "And won " + emotes[channel].slotsWin
    } else {
        win = "Better luck next time " + emotes[channel].slotsLoss
    }

    emotesArray.push(win)
    return emotesArray
}

export { getSR, playSlots }
