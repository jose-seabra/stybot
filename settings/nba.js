import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "nba",
    description: "NBA related commands",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 30,
    userDelay: 30,
    dailyLimit: 70,
}
