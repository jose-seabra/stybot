import { permissions } from "../helpers/constants.js"

import { convertSecondsToMiliseconds } from "../helpers/helper.js"

export function readyToRun(settings, status, channel, user, msg) {
    return new Promise((resolve, reject) => {
        if (!settings.enabled) return reject("function is disabled")

        if (settings.permission > userPermission(msg))
            return reject("user does not have permission")

        // if status is empty, create a new object for the channel
        if (!status[channel]) {
            status[channel] = {
                ready: true,
                delayUsers: [],
            }
        }

        if (!status[channel].ready) return reject("function is not ready")

        if (status[channel].delayUsers.includes(user))
            return reject("user is on cooldown")

        if (settings?.globalDelay > 0) {
            status[channel].ready = false
            setTimeout(() => {
                status[channel].ready = true
            }, convertSecondsToMiliseconds(settings.globalDelay))
        }

        if (settings?.userDelay > 0) {
            if (!status[channel].delayUsers.includes(user)) {
                status[channel].delayUsers.push(user)

                setTimeout(() => {
                    const index = status[channel].delayUsers.indexOf(user)
                    if (index > -1) {
                        status[channel].delayUsers.splice(index, 1)
                    }
                }, convertSecondsToMiliseconds(settings.userDelay))
            }
        }

        resolve(true)
    })
}

function userPermission(msg) {
    const { userId, isBroadcaster, isMod, isVip, isSubscriber } = msg.userInfo
    if (userId === process.env.TWITCH_UID) return permissions.SUPERUSER
    if (isBroadcaster) return permissions.BROADCASTER
    if (isMod) return permissions.MOD
    if (isVip) return permissions.VIP
    if (isSubscriber) return permissions.SUBSCRIBER
    return permissions.VIEWER
}