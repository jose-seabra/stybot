import { permissions } from "../helpers/constants.js"

export const settings = {
    description: "Get a wiki article for a specific topic.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 30,
    userDelay: 120,
}
