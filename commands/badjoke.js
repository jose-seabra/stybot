import axios from "axios"

import { sleep } from "../helpers/helper.js"

export async function badjoke(chatClient, channel, user, args) {
    const joke = await fetchJoke()

    if (joke.type === "single") {
        chatClient.say(channel, `${joke.joke}`)
    } else if (joke.type === "twopart") {
        chatClient.say(channel, `${joke.setup}`)
        sleep(5000).then(() => chatClient.say(channel, `${joke.delivery}`))
    }
}

async function fetchJoke() {
    return axios
        .get("https://v2.jokeapi.dev/joke/Any?safe-mode")
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            throw error
        })
}
