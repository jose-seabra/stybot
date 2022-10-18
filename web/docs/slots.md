# slots

<script setup>
import { settings as s } from "../../settings/slots.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage example

Input: `!slots`

> @{user} rolled | Kappa | Kappa | Kappa | And won PogChamp

## Settings
<div v-for="(setting, index) in settings">
{{ index }}: <code>{{ setting }}</code>
</div>
