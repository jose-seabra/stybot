import { exec } from "child_process"
import { settings } from "../settings/admin.js"

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"

export function admin(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(() => {
            if (callables[args[0]]) {
                callables[args[0]](chatClient, channel, user, msg, args)
            }
        })
        .catch((error) => {})
}

function restart(chatClient, channel, user, msg, args) {
    chatClient.saySafe(channel, `restarting peepoStroke`)
    const [command, option] = args

    exec("pm2 restart stybot", (error, stdout, stderr) => {
        if (error || stderr) {
            let errorMessage
            switch (option) {
                case "-v":
                    errorMessage = `${error} monkaStop`
                    break

                default:
                    errorMessage = `something went wrong monkaStop`
                    break
            }

            chatClient.saySafe(channel, errorMessage)
            return
        }
    })
}

function update(chatClient, channel, user, msg, args) {
    chatClient.saySafe(channel, `updating borpaSpin`)
    const [command, option] = args

    exec("git pull", (error, stdout, stderr) => {
        if (!!error && error.message) {
            let errorMessage
            switch (option) {
                case "-v":
                    errorMessage = `${error} monkaStop`
                    break

                default:
                    errorMessage = `something went wrong monkaStop`
                    break
            }

            chatClient.saySafe(channel, errorMessage)
            return
        }
        chatClient.saySafe(channel, `successful update bttvNice`)
    })
}

const callables = {
    restart,
    update,
}
