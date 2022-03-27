import wtf from "wtf_wikipedia"

let active = true
let delay = 30000

async function getWikiArticle(args) {
    if (active) {
        active = false
        setTimeout(() => {
            active = true
        }, delay)

        const q = args.join(" ")

        return wtf
            .fetch(q)
            .then((doc) => {
                const response = doc.text().substring(0, 495) + "(...)"
                return response
            })
            .catch((error) => {
                return `Couldn't find an entry matching ${q}`
            })
    } else {
        return ''
    }
}

export { getWikiArticle }
