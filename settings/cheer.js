import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "cheer",
    description: "Cheer a user with a message.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 0,
    userDelay: 0,
    dailyLimit: 0,
}
