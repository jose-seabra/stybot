import axios from "axios"

export async function time(chatClient, channel, user, args) {
    const key = process.env.WEATHER_API_KEY

    const q = args.join(" ")

    return axios
        .get(`https://api.weatherapi.com/v1/timezone.json?key=${key}&q=${q}`)
        .then((response) => {
            chatClient.say(
                channel,
                `@${user} current time in ${response.data.location.name}/${response.data.location.country}: ${response.data.location.localtime}`
            )
        })
        .catch((error) => {
            console.log(error)
        })
}
