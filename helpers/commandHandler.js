export function readyToRun(settings, status, channel, user) {
    return new Promise((resolve, reject) => {
        if (!settings.enabled) return reject("function is disabled")

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
            }, settings.globalDelay)
        }

        if (settings?.userDelay > 0) {
            if (!status[channel].delayUsers.includes(user)) {
                status[channel].delayUsers.push(user)

                setTimeout(() => {
                    const index = status[channel].delayUsers.indexOf(user)
                    if (index > -1) {
                        status[channel].delayUsers.splice(index, 1)
                    }
                }, settings.userDelay)
            }
        }

        resolve(true)
    })
}
