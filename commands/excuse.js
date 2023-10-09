import { settings } from "../settings/excuse.js"

let status = {}

import axios from "axios"

import { readyToRun } from "../helpers/commandHandler.js"

export async function excuse(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(async () => {
            const excuse = await fetchExcuse()
            chatClient.saySafe(channel, `${excuse}`)
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
