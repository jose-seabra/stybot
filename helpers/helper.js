function hasNonAlphanumeric(input) {
    return !/^[a-zA-Z0-9]*$/.test(input)
}

function removeNonAlphanumeric(input) {
    return input.replace(/[^a-zA-Z]/g, "")
}

function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis))
}

export { hasNonAlphanumeric, removeNonAlphanumeric, sleep }
