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
    sillentstriker: {
        slot1: "HYPERCHIPS",
        slot2: "chipsaWETH",
        slot3: "chipsaWazow",
        slotsWin: "POGGERS",
        slotsLoss: "docSmash",
        dice1: "ChuSay",
        dice2: "DOCING",
        dice3: "PEEPEES",
        dice4: "TANTIES",
        dice5: "AAUGH",
        dice6: "ChugChamp",
        dice7: "batPls",
        dice8: "GAMING",
        dice9: "forsenBased",
        dice10: "CatChamp",
    },
    bellaboo: {
        slot1: "pikaSpin",
        slot2: "Avacatospin",
        slot3: "TrollSpin",
        slotsWin: "POGGERS",
        slotsLoss: "NOOOO",
        dice1: "catSad",
        dice2: "Smadge",
        dice3: "TrollDespair",
        dice4: "monkaStop",
        dice5: "pokiBrow",
        dice6: "LebronSilly",
        dice7: "BoneZone",
        dice8: "xqcL",
        dice9: "lizardRave",
        dice10: "BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT",
    },
}

function getSR(channel) {
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
    return {
        sr,
        emote,
    }
}

function playSlots(channel) {
    const slotFaces = 3
    let response
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

    if (slotsArray[0] === slotsArray[1] && slotsArray[1] === slotsArray[2]) {
        response = "And won " + emoteset.slotsWin
    } else {
        response = "Better luck next time " + emoteset.slotsLoss
    }

    emotesArray.push(response)
    return emotesArray
}

export { getSR, playSlots }
