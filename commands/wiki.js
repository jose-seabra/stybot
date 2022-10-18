import { settings } from "../settings/wiki.js"

let status = {}

import wtf from "wtf_wikipedia"

import { readyToRun } from "../helpers/commandHandler.js"

export async function wiki(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(async () => {
            const q = args.join(" ")

            const doc = await wtf.fetch(q)

            chatClient.say(channel, doc.text().substring(0, 495) + "(...)")
        })
        .catch((error) => {})
}
