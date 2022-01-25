function getSR(channel) {
    const channelName = channel.substring(1)
    const sr = Math.floor(Math.random() * 4850) + 1
    let emote

    if (!emotes[channelName]) return

    if (sr <= 500) {
        emote = emotes[channelName].dice1
    } else if (sr > 500 && sr <= 1000) {
        emote = emotes[channelName].dice2
    } else if (sr > 1000 && sr <= 1500) {
        emote = emotes[channelName].dice3
    } else if (sr > 1500 && sr <= 2000) {
        emote = emotes[channelName].dice4
    } else if (sr > 2000 && sr <= 2500) {
        emote = emotes[channelName].dice5
    } else if (sr > 2500 && sr <= 3000) {
        emote = emotes[channelName].dice6
    } else if (sr > 3000 && sr <= 3500) {
        emote = emotes[channelName].dice7
    } else if (sr > 3500 && sr <= 4000) {
        emote = emotes[channelName].dice8
    } else if (sr > 4000 && sr <= 4500) {
        emote = emotes[channelName].dice9
    } else if (sr > 4500) {
        emote = emotes[channelName].dice10
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
