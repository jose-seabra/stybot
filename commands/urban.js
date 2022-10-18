import { settings } from "../settings/urban.js"

let status = {}

import axios from "axios"

import { sleep } from "../helpers/helper.js"
import { readyToRun } from "../helpers/commandHandler.js"

const key = process.env.RAPIDAPI_KEY

export async function urban(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(async () => {
            const q = args.join(" ")

            const options = {
                method: "GET",
                url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
                params: { term: q },
                headers: {
                    "X-RapidAPI-Key": key,
                    "X-RapidAPI-Host":
                        "mashape-community-urban-dictionary.p.rapidapi.com",
                },
            }

            const response = await axios.request(options)

            const definition = response.data.list[0].definition
                .replace(/\[/g, "")
                .replace(/\]/g, "")
                .replace(/\n/g, " ")
            const example = response.data.list[0].example
                .replace(/\[/g, "")
                .replace(/\]/g, "")
                .replace(/\n/g, " ")

            chatClient.say(channel, definition)

            sleep(500).then(() => chatClient.say(channel, example))
        })
        .catch((error) => {})
}
