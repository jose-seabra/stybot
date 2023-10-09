import { settings } from "../settings/nba.js"

let status = {}

import axios from "axios"

import { readyToRun } from "../helpers/commandHandler.js"

const key = process.env.RAPIDAPI_KEY

export function nba(chatClient, channel, user, msg, args) {
    if (!callables[args[0]]) {
        chatClient.saySafe(
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
            chatClient.saySafe(channel, `@${user} ${error}`)
        })
}

async function stats(chatClient, channel, user, msg, args) {
    const [command, ...team] = args
    const { season } = initDates()
    const teamId = getTeamIdByName(team.join(" "))

    if (teamId === undefined) {
        chatClient.saySafe(channel, `@${user} Invalid team name`)
        return
    }

    const options = {
        method: "GET",
        url: "https://api-basketball.p.rapidapi.com/statistics",
        params: {
            league: 12,
            season: season,
            team: teamId,
        },
        headers: {
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
        },
    }

    const response = await axios.request(options)

    let output = `
    Stats for ${response.data.response.team.name} ${emojiByTeam(
        response.data.response.team.name
    )}⠀
    ${response.data.response.games.wins.all.total}W ${
        response.data.response.games.loses.all.total
    }L
    - ${Math.round(response.data.response.games.wins.all.percentage * 100)}% ${
        response.data.response.games.wins.all.percentage < 0.5
            ? "LUL"
            : "PogChamp"
    } 
    Avg. Points For/Against - ${
        response.data.response.points.for.average.all
    }/${response.data.response.points.against.average.all}
    `

    chatClient.saySafe(channel, output)
}

async function games(chatClient, channel, user, msg, args) {
    const { date, season } = initDates()

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

    chatClient.saySafe(channel, output)
}

function initDates() {
    const date = new Date(
        new Date().toLocaleString("en", { timeZone: "America/Los_Angeles" })
    )

    const season =
        date.getMonth() > 6
            ? `${date.getFullYear()}-${date.getFullYear() + 1}`
            : `${date.getFullYear() - 1}-${date.getFullYear()}`

    return { date, season }
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
    } ${emojiByGameStatus(game.status.short)} ⠀`
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

function emojiByTeam(teamName) {
    switch (teamName) {
        case "Atlanta Hawks":
            return "🦅"
        case "Boston Celtics":
            return "🍀"
        case "Brooklyn Nets":
            return "🕸"
        case "Charlotte Hornets":
            return "🐝"
        case "Chicago Bulls":
            return "🐂"
        case "Cleveland Cavaliers":
            return "🏇"
        case "Dallas Mavericks":
            return "🐴"
        case "Denver Nuggets":
            return "⚒"
        case "Detroit Pistons":
            return "🏀"
        case "Golden State Warriors":
            return "🌉"
        case "Houston Rockets":
            return "🚀"
        case "Indiana Pacers":
            return "🏀"
        case "Los Angeles Clippers":
            return "📎"
        case "Los Angeles Lakers":
            return "🏆"
        case "Memphis Grizzlies":
            return "🐻"
        case "Miami Heat":
            return "🔥"
        case "Milwaukee Bucks":
            return "🦌"
        case "Minnesota Timberwolves":
            return "🐺"
        case "New Orleans Pelicans":
            return "🐔"
        case "New York Knicks":
            // return "🗽"
            return "🗑️"
        case "Oklahoma City Thunder":
            return "⚡"
        case "Orlando Magic":
            return "☄"
        case "Philadelphia 76ers":
            return "🏀"
        case "Phoenix Suns":
            return "🌞"
        case "Portland Trail Blazers":
            return "🌲"
        case "Sacramento Kings":
            return "👑"
        case "San Antonio Spurs":
            return "🌵"
        case "Toronto Raptors":
            return "🦖"
        case "Utah Jazz":
            return "🎺"
        case "Washington Wizards":
            return "🧙"
        default:
            break
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

function getTeamIdByName(name) {
    switch (name) {
        case "atlanta hawks":
        case "atl":
        case "atlanta":
        case "hawks":
            return 132
        case "boston celtics":
        case "bos":
        case "boston":
        case "celtics":
            return 133
        case "brooklyn nets":
        case "bkn":
        case "brooklyn":
        case "nets":
            return 134
        case "charlotte hornets":
        case "cha":
        case "charlotte":
        case "hornets":
            return 135
        case "chicago bulls":
        case "chi":
        case "chicago":
        case "bulls":
            return 136
        case "cleveland cavaliers":
        case "cle":
        case "cleveland":
        case "cavaliers":
            return 137
        case "dallas mavericks":
        case "dal":
        case "dallas":
        case "mavericks":
            return 138
        case "denver nuggets":
        case "den":
        case "denver":
        case "nuggets":
            return 139
        case "detroit pistons":
        case "det":
        case "detroit":
        case "pistons":
            return 140
        case "golden state warriors":
        case "gsw":
        case "golden state":
        case "warriors":
            return 141
        case "houston rockets":
        case "hou":
        case "houston":
        case "rockets":
            return 142
        case "indiana pacers":
        case "ind":
        case "indiana":
        case "pacers":
            return 143
        case "los angeles clippers":
        case "lac":
        case "los angeles":
        case "clippers":
            return 144
        case "los angeles lakers":
        case "lal":
        case "lakers":
            return 145
        case "memphis grizzlies":
        case "mem":
        case "memphis":
        case "grizzlies":
            return 146
        case "miami heat":
        case "mia":
        case "miami":
        case "heat":
            return 147
        case "milwaukee bucks":
        case "mil":
        case "milwaukee":
        case "bucks":
            return 148
        case "minnesota timberwolves":
        case "min":
        case "minnesota":
        case "timberwolves":
            return 149
        case "new orleans pelicans":
        case "nop":
        case "new orleans":
        case "pelicans":
            return 150
        case "new york knicks":
        case "nyk":
        case "new york":
        case "knicks":
            return 151
        case "oklahoma city thunder":
        case "okc":
        case "oklahoma city":
        case "thunder":
            return 152
        case "orlando magic":
        case "orl":
        case "orlando":
        case "magic":
            return 153
        case "philadelphia 76ers":
        case "phi":
        case "philadelphia":
        case "76ers":
            return 154
        case "phoenix suns":
        case "phx":
        case "phoenix":
        case "suns":
            return 155
        case "portland trail blazers":
        case "por":
        case "portland":
        case "trail blazers":
            return 156
        case "sacramento kings":
        case "sac":
        case "sacramento":
        case "kings":
            return 157
        case "san antonio spurs":
        case "sas":
        case "san antonio":
        case "spurs":
            return 158
        case "toronto raptors":
        case "tor":
        case "toronto":
        case "raptors":
            return 159
        case "utah jazz":
        case "uta":
        case "utah":
        case "jazz":
            return 160
        case "washington wizards":
        case "was":
        case "washington":
        case "wizards":
            return 161
        default:
            return undefined
    }
}

const callables = {
    games,
    stats,
}
