import { settings } from "../settings/nba.js"

let status = {}

import axios from "axios"

import { readyToRun } from "../helpers/commandHandler.js"

const key = process.env.RAPIDAPI_KEY

export function nba(chatClient, channel, user, msg, args) {
    if (!callables[args[0]]) {
        chatClient.say(
            channel,
            `@${user} Invalid command. Use one of the following arguments: 
            ${Object.keys(callables).join(" | ")}`
        )
        return
    }

    readyToRun(settings, status, channel, user, msg)
        .then(() => {
            if (callables[args[0]]) {
                callables[args[0]](chatClient, channel, user, msg, args)
            }
        })
        .catch((error) => {
            chatClient.say(
                channel,
                `@${user} ${error}`
            )
        })
}

async function games(chatClient, channel, user, msg, args) {
    const [command, option] = args

    const date = new Date(
        new Date().toLocaleString("en", { timeZone: "America/Los_Angeles" })
    )

    const season = date.getMonth() > 6
        ? `${date.getFullYear()}-${date.getFullYear()+1}`
        : `${date.getFullYear()-1}-${date.getFullYear()}`

    const options = {
        method: "GET",
        url: "https://api-basketball.p.rapidapi.com/games",
        params: {
            league: 12,
            date: date.toISOString().split("T")[0],
            timezone: "America/Los_Angeles",
            season: season,
        },

        headers: {
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
        },
    }

    const response = await axios.request(options)

    let output = "NBA Games Today (UTC-8) 🕒 ⠀"

    response.data.response.map((game) => {
        output += listGame(game)
    })

    chatClient.say(channel, output)
}

function listGame(game) {
    if (game.status.short === "NS") {
        return `${shortifyTeamName(game.teams.home.name)} - ${shortifyTeamName(
            game.teams.away.name
        )} - ${game.time} ${emojiByGameStatus(game.status.short)}⠀`
    }

    return `${shortifyTeamName(game.teams.home.name)} ${
        game.scores.home.total
    }-${game.scores.away.total} ${shortifyTeamName(game.teams.away.name)} - ${
        game.status.short
    } ${emojiByGameStatus(game.status.short)}⠀`
}

function emojiByGameStatus(status) {
    switch (status) {
        case "NS":
            return "🗓"
        case "Q1":
        case "Q2":
        case "Q3":
        case "Q4":
            return "🏀"
        case "OT":
            return "🏀"
        case "BT":
            return "🏀"
        case "HT":
            return "⏱"
        case "FT":
            return "FBtouchdown"
        case "AOT":
            return "FBtouchdown"
        case "POST":
        case "CANC":
        case "SUSP":
            return "❌"
        default:
            return "❓"
    }
}

function shortifyTeamName(fullTeamName) {
    switch (fullTeamName) {
        case "Los Angeles Lakers":
            return "LAL"
        case "Los Angeles Clippers":
            return "LAC"
        case "Golden State Warriors":
            return "GSW"
        case "Phoenix Suns":
            return "PHX"
        case "Sacramento Kings":
            return "SAC"
        case "Portland Trail Blazers":
            return "POR"
        case "San Antonio Spurs":
            return "SAS"
        case "Houston Rockets":
            return "HOU"
        case "Dallas Mavericks":
            return "DAL"
        case "Memphis Grizzlies":
            return "MEM"
        case "Minnesota Timberwolves":
            return "MIN"
        case "Oklahoma City Thunder":
            return "OKC"
        case "Denver Nuggets":
            return "DEN"
        case "Utah Jazz":
            return "UTA"
        case "New Orleans Pelicans":
            return "NOP"
        case "New York Knicks":
            return "NYK"
        case "Brooklyn Nets":
            return "BKN"
        case "Boston Celtics":
            return "BOS"
        case "Philadelphia 76ers":
            return "PHI"
        case "Toronto Raptors":
            return "TOR"
        case "Orlando Magic":
            return "ORL"
        case "Miami Heat":
            return "MIA"
        case "Washington Wizards":
            return "WAS"
        case "Chicago Bulls":
            return "CHI"
        case "Indiana Pacers":
            return "IND"
        case "Milwaukee Bucks":
            return "MIL"
        case "Cleveland Cavaliers":
            return "CLE"
        case "Detroit Pistons":
            return "DET"
        case "Atlanta Hawks":
            return "ATL"
        case "Charlotte Hornets":
            return "CHA"
        default:
            return "Unknown"
    }
}

const callables = {
    games,
}
