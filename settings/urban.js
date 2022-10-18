import { permissions } from "../helpers/constants.js"

export const settings = {
    description: "Get an urban dictionary definition for a word/expression.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 0,
    userDelay: 15,
}
