import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "myrank",
    description: "Get a random rank for you.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 0,
    userDelay: 120,
    dailyLimit: 0,
}
