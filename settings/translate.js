import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "translate",
    description: "Translate a sentence from one language to another.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 2,
    userDelay: 0,
    dailyLimit: 0,
}
