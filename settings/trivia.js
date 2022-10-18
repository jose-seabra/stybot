import { permissions } from "../helpers/constants.js"

export const settings = {
    description: "Get a random trivia question.",
    enabled: true,
    permission: permissions.MOD,
    globalDelay: 0,
    userDelay: 0,
    optionsTimeoutDuration: 6000,
    questionTimeoutDuration: 60000,
}
