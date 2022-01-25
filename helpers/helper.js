function hasNonAlphanumeric(input) {
    return !/^[a-zA-Z0-9]*$/.test(input)
}

export { hasNonAlphanumeric }
