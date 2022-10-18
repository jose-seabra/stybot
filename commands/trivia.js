import { settings } from "../settings/trivia.js"

export let status = {}
export let optionsTimeout = {}
export let questionTimeout = {}

import axios from "axios"
import { shuffleArray, convertSecondsToMiliseconds } from "../helpers/helper.js"
import { readyToRun } from "../helpers/commandHandler.js"

export function trivia(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(async () => {
            if (status[channel].ongoing) {
                chatClient.say(
                    channel,
                    `@${user} there is already a trivia running!`
                )
                return
            }

            const options = {
                method: "GET",
                url: "https://opentdb.com/api.php?amount=1&encode=base64",
            }
            try {
                const response = await axios.request(options)
                const {
                    category,
                    type,
                    difficulty,
                    question,
                    correct_answer,
                    incorrect_answers,
                } = response.data.results[0]

                const categoryString = Buffer.from(category, "base64").toString(
                    "utf-8"
                )
                const typeString = Buffer.from(type, "base64").toString("utf-8")
                // const difficultyString = Buffer.from(
                //     difficulty,
                //     "base64"
                // ).toString("utf-8")
                const questionString = Buffer.from(question, "base64").toString(
                    "utf-8"
                )
                const correct_answerString = Buffer.from(
                    correct_answer,
                    "base64"
                ).toString("utf-8")
                const incorrect_answersString = incorrect_answers.map(
                    (answer) => {
                        return Buffer.from(answer, "base64").toString("utf-8")
                    }
                )
                const allAnswers = [
                    correct_answerString,
                    ...incorrect_answersString,
                ]

                if (typeString === "multiple") {
                    chatClient.say(
                        channel,
                        `
                        ${categoryString} 
                        ${categoryEmoji(categoryString)} 
                        ${questionString}
                        `
                    )
                    optionsTimeout[channel] = setTimeout(() => {
                        chatClient.say(
                            channel,
                            `${shuffleArray(allAnswers).join(" | ")}`
                        )
                    }, convertSecondsToMiliseconds(settings.optionsTimeoutDuration))
                } else if (typeString === "boolean") {
                    chatClient.say(
                        channel,
                        `
                        ${categoryString} 
                        ${categoryEmoji(categoryString)} 
                        ${questionString}
                        True or false?
                        `
                    )
                }

                // add correct answer to status
                status[channel] = {
                    ...status[channel],
                    correct_answer: correct_answerString,
                    ongoing: true,
                }

                questionTimeout[channel] = setTimeout(() => {
                    chatClient.say(
                        channel,
                        `No one got it right! The correct answer was ${correct_answerString}`
                    ),
                        ((status[channel].correct_answer = null),
                        (status[channel].ongoing = false))
                }, convertSecondsToMiliseconds(settings.questionTimeoutDuration))
            } catch (error) {}
        })
        .catch((error) => {})
}

function categoryEmoji(category) {
    let response
    switch (category) {
        case "General Knowledge":
            response = "🌎"
            break
        case "Entertainment: Books":
            response = "📚"
            break
        case "Entertainment: Film":
            response = "🎬"
            break
        case "Entertainment: Music":
            response = "🎵"
            break
        case "Entertainment: Musicals & Theatres":
            response = "🎭"
            break
        case "Entertainment: Television":
            response = "📺"
            break
        case "Entertainment: Video Games":
            response = "🎮"
            break
        case "Entertainment: Board Games":
            response = "🎲"
            break
        case "Science & Nature":
            response = "🌱"
            break
        case "Science: Computers":
            response = "💻"
            break
        case "Science: Mathematics":
            response = "🧮"
            break
        case "Mythology":
            response = "🔮"
            break
        case "Sports":
            response = "⚽"
            break
        case "Geography":
            response = "🌍"
            break
        case "History":
            response = "📜"
            break
        case "Politics":
            response = "🗳️"
            break
        case "Art":
            response = "🎨"
            break
        case "Celebrities":
            response = "👑"
            break
        case "Animals":
            response = "🐶"
            break
        case "Vehicles":
            response = "🚗"
            break
        case "Entertainment: Comics":
            response = "📰"
            break
        case "Science: Gadgets":
            response = "📱"
            break
        case "Entertainment: Japanese Anime & Manga":
            response = "🗡️"
            break
        case "Entertainment: Cartoon & Animations":
            response = "🐰"
            break
        default:
            response = "❓"
    }
    return response
}
