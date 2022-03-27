import axios from "axios"

let active = true
let delay = 15000

async function getWeather(q) {
    if (active) {
        active = false
        setTimeout(() => {
            active = true
        }, delay)

        const key = process.env.WEATHER_API_KEY

        return axios
            .get(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${q}`)
            .then((response) => {
                return response
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        return ''
    }
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
