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
    const slurs = ["child fucker", "cunt", "faggot", "kys", "nigga", "nigger"]
    const filteredMessage = slurs.reduce((acc, slur) => {
        const regex = new RegExp(`\\b${slur}\\b`, "gi")
        return acc.replace(regex, "*".repeat(slur.length))
    }, message)
    return filteredMessage
}
