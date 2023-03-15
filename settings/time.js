import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "time",
    description: "Get the current time for a specific location.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 0,
    userDelay: 10,
    dailyLimit: 0,
}
