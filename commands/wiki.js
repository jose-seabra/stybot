const settings = {
    enabled: true,
    // permission: 50, // TODO
    globalDelay: 30000,
    userDelay: 120000,
}

let status = {}

import wtf from "wtf_wikipedia"

import { readyToRun } from "../helpers/commandHandler.js"

export async function wiki(chatClient, channel, user, args) {
    readyToRun(settings, status, channel, user)
        .then(async () => {
            const q = args.join(" ")

            const doc = await wtf.fetch(q)

            chatClient.say(channel, doc.text().substring(0, 495) + "(...)")
        })
        .catch((error) => {})
}
