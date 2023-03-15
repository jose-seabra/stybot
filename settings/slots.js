import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "slots",
    description: "Roll a slot machine with 3 different faces.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 0,
    userDelay: 120,
    dailyLimit: 0,
}
