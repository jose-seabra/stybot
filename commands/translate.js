import { settings } from "../settings/translate.js"

let status = {}

import axios from "axios"

import { readyToRun } from "../helpers/commandHandler.js"

export async function translate(chatClient, channel, user, msg, args) {
    readyToRun(settings, status, channel, user, msg)
        .then(async () => {
            let text
            let targetLang
            if (args[0].startsWith("to:")) {
                text = args.slice(1).join(" ")
                targetLang = args[0].substring(3)
            } else {
                text = args.join(" ")
                targetLang = "en"
            }

            try {
                const detectedLanguage = await detectLanguage(text)
                const translation = await getTranslation(
                    text,
                    detectedLanguage,
                    targetLang
                )

                chatClient.saySafe(
                    channel,
                    `@${user} lang:${detectedLanguage} "${translation}"`
                )
            } catch (error) {}
        })
        .catch((error) => {})
}

async function detectLanguage(input) {
    return axios
        .post(
            "https://ws.detectlanguage.com/0.2/detect",
            {
                q: input,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.DETECT_LANGUAGE_API_KEY}`,
                },
            }
        )
        .then((response) => {
            for (const language of response.data.data.detections) {
                if (language.isReliable === true) {
                    return language.language
                }
            }
            throw new Error("Could not identify text language")
        })
        .catch((error) => {
            throw error
        })
}

async function getTranslation(q, sourceLanguageCode, targetLanguageCode) {
    return axios
        .post(
            "https://cloud.yandex.com/api/translate/translate",
            {
                sourceLanguageCode,
                targetLanguageCode,
                texts: [q],
            },
            {
                headers: {
                    Origin: "https://cloud.yandex.com",
                },
            }
        )
        .then((response) => {
            return response.data.translations[0].text
        })
        .catch((error) => {
            throw error
        })
}
