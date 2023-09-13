import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "forsen",
    description: "Say a random forsen quote",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 30,
    userDelay: 60,
    dailyLimit: 0,
}
