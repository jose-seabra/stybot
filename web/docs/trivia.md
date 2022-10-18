# trivia

<script setup>
import { settings as s } from "../../settings/trivia.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage example

Input: `!trivia`

> Entertainment: Film 🎬 What was Dorothy's surname in 'The Wizard Of Oz'?

> Perkins | Day | Parker | Gale

Input: Gale

> @{user} got it! Correct answer is Gale 

## Settings
<div v-for="(setting, index) in settings">
{{ index }}: <code>{{ setting }}</code>
</div>
