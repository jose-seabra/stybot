import { permissions } from "../helpers/constants.js"

export const settings = {
    description: "Roll a dice. Defaults to a 6 sided dice.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 0,
    userDelay: 3,
}
