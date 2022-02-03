import wtf from "wtf_wikipedia"

async function getWikiArticle(args) {
    const q = args.join(" ")

    return wtf.fetch(q).then((doc) => {
        const response = doc.text().substring(0, 495) + "(...)"
        return response
    })
}

export { getWikiArticle }
