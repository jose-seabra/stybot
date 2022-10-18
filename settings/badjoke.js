import { permissions } from "../helpers/constants.js"

export const settings = {
    description: "Tell a frequently bad joke.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 1,
    userDelay: 60,
}
