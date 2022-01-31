import axios from "axios"

async function getTranslation(q, sourceLanguageCode, targetLanguageCode = 'en') {
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
        .then(function (response) {
            return (response = {
                q,
                sourceLanguageCode,
                targetLanguageCode,
                translatedText: response.data.translations[0].text,
            })
        })
        .catch(function (error) {
            console.log(error)
        })
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
        .then(function (response) {
            for (const language of response.data.data.detections) {
                if (language.isReliable === true) {
                    return language.language
                }
            }
            return 'I couldn\'t detect the language'
        })
        .catch(function (error) {
            console.log(error)
        })
}

export { getTranslation, detectLanguage }
