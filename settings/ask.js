import { permissions } from "../helpers/constants.js"

export const settings = {
    description: "Ask Stybot a question and it will try to answer it",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 120000,
    userDelay: 300000,
}
