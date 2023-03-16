# translate

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/translate.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`{{ PREFIX }}translate おはよう！`

> @{user} lang:ja "Good morning!"

`{{ PREFIX }}translate to:es hi, how are you? `

> @{user} lang:en "Hola, ¿qué tal?"

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
