export function hasNonAlphanumeric(input) {
    return !/^[a-zA-Z0-9]*$/.test(input)
}

export function removeNonAlphanumeric(input) {
    return input.replace(/[^a-zA-Z]/g, "")
}

export function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis))
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export function convertSecondsToMiliseconds(seconds) {
    return seconds * 1000
}

export function filterSlurs(message) {
    const slurs = ["child fucker", "cunt", "fag", "kys", "nigga", "nigger"]
    const filteredMessage = slurs.reduce((acc, slur) => {
        const regex = new RegExp(`\\b\\w*${slur}\\w*\\b`, "gi")
        return acc.replace(regex, (match) => "*".repeat(match.length))
    }, message)
    return filteredMessage
}

const MAX_RETRY_ATTEMPTS = 5
const RETRY_DELAY_MS = 10000
export async function retryOnDnsFailure(action, retryAttempts = 1) {
    try {
        return await action()
    } catch (error) {
        if (retryAttempts >= MAX_RETRY_ATTEMPTS) {
            throw error
        }
        fs.writeFile(
            "./logs/notice.log",
            "\n" + `Retry number: ${retryAttempts}`,
            { flag: "a" }
        )

        if (error.code.includes("EAI_AGAIN")) {
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
            return retryOnDnsFailure(action, retryAttempts + 1)
        }

        throw error
    }
}
