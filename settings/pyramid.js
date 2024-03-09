import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "pyramid",
    description: "Stybot will use your choosen emote and form a pyramid with it.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 5,
    userDelay: 60,
    dailyLimit: 0,
}
