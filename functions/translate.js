import axios from "axios"

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
            return 404
        })
        .catch((error) => {
            console.log(error)
        })
}

async function getTranslation(
    q,
    sourceLanguageCode,
    targetLanguageCode = "en"
) {
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
            return (response = {
                q,
                sourceLanguageCode,
                targetLanguageCode,
                translatedText: response.data.translations[0].text,
            })
        })
        .catch((error) => {
            return error
        })
}

export { getTranslation, detectLanguage }
