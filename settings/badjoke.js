import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "badjoke",
    description: "Tell a frequently bad joke.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 1,
    userDelay: 60,
    dailyLimit: 0,
}
