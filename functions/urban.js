import axios from "axios"

const key = process.env.RAPIDAPI_KEY

async function getUrbanDictionary(args) {
    const q = args.join(" ")

    const options = {
        method: "GET",
        url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
        params: { term: q },
        headers: {
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host":
                "mashape-community-urban-dictionary.p.rapidapi.com",
        },
    }

    return axios
        .request(options)
        .then(function (response) {
            return response.data.list[0]
        })
        .catch(function (error) {})
}

export { getUrbanDictionary }
