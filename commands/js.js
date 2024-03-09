import { settings } from "../settings/js.js"
import { promises as fs } from "fs"

let status = {}

import { readyToRun } from "../helpers/commandHandler.js"
import ivm from "isolated-vm"

export function js(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(() => {
            const q = args.join(" ")

            // Log the command input
            fs.writeFile(
                "./logs/js.log",
                "\n" +
                    `${msg.userInfo.userName}(${msg.userInfo.userId}) Input: ${q}`,
                { flag: "a" }
            )

            // Create a new isolate limited to 128MB
            const isolate = new ivm.Isolate({ memoryLimit: 128 })

            // Create a new context within this isolate.
            const context = isolate.createContextSync()

            // Get a Reference{} to the global object within the context.
            const jail = context.global

            // This makes the global object available in the context as `global`.
            jail.setSync("global", jail.derefInto())

            // Create a new ivm.Reference to an object with a `value` property in the parent context
            let output = new ivm.Reference({ value: "" })

            // We will create a basic `log` function for the new isolate to use.
            const logFn = new ivm.Reference(function (...args) {
                // Append the output to the `value` property of the object in the parent context
                output.deref().value += args.join(" ") + "\n"
            })

            jail.setSync("log", function (...args) {
                return logFn.applySync(undefined, args, { reference: true })
            })

            // Execute the code in the `q` variable in the isolated context,
            // if the result is an object, convert it to a string, and store the result
            context.evalSync(
                `
                let result = eval(${JSON.stringify(q)});
                if (typeof result === 'object' && result !== null) {
                    result = JSON.stringify(result);
                }
                `,
                { timeout: 500 }
            )

            // Log the result
            context.evalSync("log(result)")

            // Output the value of the `value` property of the object in the parent context
            chatClient.saySafe(
                channel,
                `@${user} Output: ${output.deref().value}`
            )
        })
        .catch((error) => {
            console.log(error)
        })
}
