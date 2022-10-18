import { permissions } from "../helpers/constants.js"

export const settings = {
    description: "Ask a question and Stybot will try to answer it either with a truthfull answer or with sarcasm.",
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 120,
    userDelay: 300,
}
