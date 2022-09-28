export function dice(chatClient, channel, user, args) {
    let maxNum
    isNaN(args[0]) ? (maxNum = 6) : (maxNum = args[0])
    chatClient.say(
        channel,
        `@${user} rolled a ${Math.floor(Math.random() * maxNum) + 1}`
    )
}
