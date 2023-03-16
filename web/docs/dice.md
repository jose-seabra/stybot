# dice

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/dice.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`{{ PREFIX }}dice`

> @{user} rolled a 4

`{{ PREFIX }}dice 100`

> @{user} rolled a 76

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
