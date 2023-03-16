import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "commands",
    description: "Displays a link to the full list of commands.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 60,
    userDelay: 0,
    dailyLimit: 0,
}
