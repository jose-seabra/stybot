import { settings } from "../settings/badjoke.js"

let status = {}

import axios from "axios"

import { sleep } from "../helpers/helper.js"
import { readyToRun } from "../helpers/commandHandler.js"

export async function badjoke(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(async () => {
            const joke = await fetchJoke()

            if (joke.type === "single") {
                chatClient.saySafe(channel, `${joke.joke}`)
            } else if (joke.type === "twopart") {
                chatClient.saySafe(channel, `${joke.setup}`)
                sleep(5000).then(() =>
                    chatClient.saySafe(channel, `${joke.delivery}`)
                )
            }
        })
        .catch((error) => {})
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
