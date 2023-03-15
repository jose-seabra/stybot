import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "excuse",
    description: "Get a random excuse for you.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 0,
    userDelay: 5,
    dailyLimit: 0,
}
