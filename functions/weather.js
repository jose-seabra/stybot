import axios from "axios"

async function getWeather(q) {
    const key = process.env.WEATHER_API_KEY

    return axios
        .get(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${q}`)
        .then((response) => {
            return response
        })
        .catch((error) => {
            console.log(error)
        })
}

async function getTimezone(q) {
    const key = process.env.WEATHER_API_KEY

    return axios
        .get(`https://api.weatherapi.com/v1/timezone.json?key=${key}&q=${q}`)
        .then((response) => {
            return response
        })
        .catch((error) => {
            console.log(error)
        })
}

export { getWeather, getTimezone }
