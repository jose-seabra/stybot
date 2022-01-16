import axios from "axios"

async function getRandomJoke() {
    return axios
        .get("https://v2.jokeapi.dev/joke/Any?safe-mode")
        .then(function (response) {
            return (response = {
                type: response.data.type,
                joke: response.data.joke,
                setup: response.data.setup,
                delivery: response.data.delivery,
            })
        })
        .catch(function (error) {
            console.log(error)
        })
}

export { getRandomJoke }
