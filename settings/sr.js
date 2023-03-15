import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "sr",
    description: "Get a random SR value for you. Based on OW1 SR system.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 0,
    userDelay: 120,
    dailyLimit: 0,
}
