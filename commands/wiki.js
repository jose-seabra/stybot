import wtf from "wtf_wikipedia"

export async function wiki(chatClient, channel, user, args) {
    const q = args.join(" ")

    const doc = await wtf.fetch(q)

    chatClient.say(channel, doc.text().substring(0, 495) + "(...)")
}
