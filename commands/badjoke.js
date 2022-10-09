import { permissions } from "../helpers/constants.js"

const settings = {
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 1000,
    userDelay: 60000,
}

let status = {}

import axios from "axios"

import { sleep } from "../helpers/helper.js"
import { readyToRun } from "../helpers/commandHandler.js"

export async function badjoke(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(async () => {
            const joke = await fetchJoke()

            if (joke.type === "single") {
                chatClient.say(channel, `${joke.joke}`)
            } else if (joke.type === "twopart") {
                chatClient.say(channel, `${joke.setup}`)
                sleep(5000).then(() =>
                    chatClient.say(channel, `${joke.delivery}`)
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
