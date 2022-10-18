import { permissions } from "../helpers/constants.js"

export const settings = {
    description: "Get the current weather for a specific location.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 1,
    userDelay: 30,
}
