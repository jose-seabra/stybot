# dice

<script setup>
import { settings as s } from "../../settings/dice.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`!dice`

> @{user} rolled a 4

`!dice 100`

> @{user} rolled a 76

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
