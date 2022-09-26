function hasNonAlphanumeric(input) {
    return !/^[a-zA-Z0-9]*$/.test(input)
}

function removeNonAlphanumeric(input) {
    return input.replace(/[^a-zA-Z]/g, "")
}

function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis))
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export { hasNonAlphanumeric, removeNonAlphanumeric, sleep, shuffleArray }
