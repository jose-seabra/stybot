import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "js",
    description: "Evaluate JS code running on an isolated environment.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 0,
    userDelay: 0,
    dailyLimit: 0,
}
