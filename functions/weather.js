import axios from "axios"

async function getWeather(q) {
    const key = "57caeb088dd64effa1c01419220102"

    return axios
        .get(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${q}`)
        .then((response) => {
            return response
        })
        .catch((error) => {
            console.log(error)
        })
}

export { getWeather }
