# sr

<script setup>
import { settings as s } from "../../settings/sr.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage example

Input: `!sr`

> @{user} your SR is 4610 PogChamp 

## Settings
<div v-for="(setting, index) in settings">
{{ index }}: <code>{{ setting }}</code>
</div>
