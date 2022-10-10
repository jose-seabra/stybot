import { permissions } from "../helpers/constants.js"
import { exec } from "child_process"

const settings = {
    enabled: true,
    permission: permissions.SUPERUSER,
    globalDelay: 0,
    userDelay: 0,
}

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"

export function sb(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(() => {
            if (callables[args[0]]) {
                callables[args[0]](chatClient, channel, user, msg, args)
            }
        })
        .catch((error) => {})
}

function restart(chatClient, channel, user, msg, args) {
    chatClient.say(channel, `restarting peepoStroke`)
    const [command, option] = args

    exec("pm2 restart stybot", (error, stdout, stderr) => {
        if (error || stderr) {
            let errorMessage
            switch (option) {
                case "-v":
                    errorMessage = `${error} monkaStop`
                    break;
            
                default:
                    errorMessage = `something went wrong monkaStop`
                    break;
            }
            
            chatClient.say(channel, errorMessage)
            return
        }
    })
}

const callables = {
    restart
}
