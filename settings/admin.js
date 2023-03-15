import { permissions } from "../helpers/constants.js"

export const settings = {
    name: "admin",
    description: "Stybot admin commands.",
    enabled: true,
    permission: permissions.SUPERUSER,
    globalDelay: 0,
    userDelay: 0,
    dailyLimit: 0,
}