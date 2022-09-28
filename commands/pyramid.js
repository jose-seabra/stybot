import { hasNonAlphanumeric } from "./../helpers/helper.js"

export function pyramid(chatClient, channel, user, args) {
    let emote = args[0]
    if (args[0] === undefined) return
    if (hasNonAlphanumeric(emote) || emote.length >= 20) {
        return
    }
    chatClient.say(
        channel,
        ` ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ${emote} ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ${emote} ${emote} ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ${emote} ${emote} ${emote} ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ${emote} ${emote} ${emote} ${emote} ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ${emote} ${emote} ${emote} ${emote} ${emote}`
    )
}
