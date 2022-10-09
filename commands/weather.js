import { permissions } from "../helpers/constants.js"

const settings = {
    enabled: true,
    permission: permissions.VIEWER,
    globalDelay: 1000,
    userDelay: 30000,
}

let status = {}

import axios from "axios"

import { readyToRun } from "../helpers/commandHandler.js"

export async function weather(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(async () => {
            const key = process.env.WEATHER_API_KEY

            const q = args.join(" ")

            try {
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/current.json?key=${key}&q=${q}`
                )
                const weather_emoji = getWeatherEmoji(
                    response.data.current.condition.text
                )

                chatClient.say(
                    channel,
                    `@${user} current weather for ${
                        response.data.location.name
                    }/${response.data.location.country}:
                    ${response.data.location.localtime.substring(11)} 🕐
                    ${response.data.current.condition.text} ${weather_emoji}
                    ${response.data.current.temp_c}ºC/${
                        response.data.current.temp_f
                    }ºF 🌡
                    ${response.data.current.wind_kph}KPH/${
                        response.data.current.wind_mph
                    }MPH 💨
                    ${
                        response.data.current.precip_mm !== 0
                            ? response.data.current.precip_mm + "mm 🌧"
                            : ""
                    }
                    `
                )
                return response
            } catch (error) {
                console.log(error)
            }
        })
        .catch((error) => {})
}

function getWeatherEmoji(text) {
    let response
    switch (text) {
        case "Sunny":
            response = "☀️"
            break
        case "Clear":
            response = "🌑"
            break
        case "Partly cloudy":
            response = "⛅"
            break
        case "Cloudy":
            response = "☁️"
            break
        case "Overcast":
            response = "☁️"
            break
        case "Mist":
            response = "🌫️"
            break
        case "Patchy rain possible":
            response = "🌦️"
            break
        case "Patchy snow possible":
            response = "🌨️"
            break
        case "Patchy sleet possible":
            response = "🌨️"
            break
        case "Patchy freezing drizzle possible":
            response = "🌨️"
            break
        case "Thundery outbreaks possible":
            response = "⛈️"
            break
        case "Blowing snow":
            response = "🌨️"
            break
        case "Blizzard":
            response = "🌨️"
            break
        case "Fog":
            response = "🌫️"
            break
        case "Freezing fog":
            response = "🌫️"
            break
        case "Patchy light drizzle":
            response = "🌦️"
            break
        case "Light drizzle":
            response = "🌦️"
            break
        case "Freezing drizzle":
            response = "🌨️"
            break
        case "Heavy freezing drizzle":
            response = "🌨️"
            break
        case "Patchy light rain":
            response = "🌦️"
            break
        case "Light rain":
            response = "🌦️"
            break
        case "Moderate rain at times":
            response = "🌧️"
            break
        case "Moderate rain":
            response = "🌧️"
            break
        case "Heavy rain at times":
            response = "🌧️"
            break
        case "Heavy rain":
            response = "🌧️"
            break
        case "Light freezing rain":
            response = "🌨️"
            break
        case "Moderate or heavy freezing rain":
            response = "🌨️"
            break
        case "Light sleet":
            response = "🌨️"
            break
        case "Moderate or heavy sleet":
            response = "🌨️"
            break
        case "Patchy light snow":
            response = "🌨️"
            break
        case "Light snow":
            response = "🌨️"
            break
        case "Patchy moderate snow":
            response = "🌨️"
            break
        case "Moderate snow":
            response = "🌨️"
            break
        case "Patchy heavy snow":
            response = "🌨️"
            break
        case "Heavy snow":
            response = "🌨️"
            break
        case "Ice pellets":
            response = "🌨️"
            break
        case "Light rain shower":
            response = "🌧️"
            break
        case "Moderate or heavy rain shower":
            response = "🌧️"
            break
        case "Torrential rain shower":
            response = "🌧️"
            break
        case "Light sleet showers":
            response = "🌨️"
            break
        case "Moderate or heavy sleet showers":
            response = "🌨️"
            break
        case "Light snow showers":
            response = "🌨️"
            break
        case "Moderate or heavy snow showers":
            response = "🌨️"
            break
        case "Light showers of ice pellets":
            response = "🌨️"
            break
        case "Moderate or heavy showers of ice pellets":
            response = "🌨️"
            break
        case "Patchy light rain in area with thunder":
            response = "⛈️"
            break
        case "Moderate or heavy rain in area with thunder":
            response = "⛈️"
            break
        case "Patchy light snow in area with thunder":
            response = "⛈️"
            break
        default:
            response = "🔭"
    }
    return response
}
