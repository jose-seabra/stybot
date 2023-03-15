import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "trivia",
    description: "Get a random trivia question.",
    enabled: true,
    permission: permissions.MOD,
    globalDelay: 0,
    userDelay: 0,
    optionsTimeoutDuration: 6,
    questionTimeoutDuration: 60,
    dailyLimit: 0,
}
