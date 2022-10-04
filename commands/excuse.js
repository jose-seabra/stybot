const settings = {
    enabled: true,
    // permission: 50, // TODO
    globalDelay: 0,
    userDelay: 5000,
}

let status = {}

import axios from "axios"

import { readyToRun } from "../helpers/commandHandler.js"

export async function excuse(chatClient, channel, user, args) {
    readyToRun(settings, status, channel, user)
        .then(async () => {
            const excuse = await fetchExcuse()
            chatClient.say(channel, `${excuse}`)
        })
        .catch((error) => {})
}

async function fetchExcuse() {
    return axios
        .get("https://excuser.herokuapp.com/v1/excuse")
        .then(function (response) {
            return response.data[0].excuse
        })
        .catch(function (error) {
            throw error
        })
}
