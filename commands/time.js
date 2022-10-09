import { permissions } from "../helpers/constants.js"

const settings = {
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 0,
    userDelay: 10000,
}

let status = {}

import axios from "axios"

import { readyToRun } from "../helpers/commandHandler.js"

export async function time(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(async () => {
            const key = process.env.WEATHER_API_KEY

            const q = args.join(" ")

            try {
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/timezone.json?key=${key}&q=${q}`
                )
                chatClient.say(
                    channel,
                    `@${user} current time in ${response.data.location.name}/${response.data.location.country}: ${response.data.location.localtime}`
                )
            } catch (error) {
                console.log(error)
            }
        })
        .catch((error) => {
            console.log(error)
        })
}
