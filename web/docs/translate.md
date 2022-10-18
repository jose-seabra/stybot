# translate

<script setup>
import { settings as s } from "../../settings/translate.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage example

Input: `!translate おはよう！`

> @{user} lang:ja "Good morning!"

Input: `!translate to:es hi, how are you? `

> @{user} lang:en "Hola, ¿qué tal?"

## Settings
<div v-for="(setting, index) in settings">
{{ index }}: <code>{{ setting }}</code>
</div>
