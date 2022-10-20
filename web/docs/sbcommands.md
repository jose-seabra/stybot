# cheer

<script setup>
import { settings as s } from "../../settings/sbcommands.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`!sbcommands`

> @{user} a full list of commands can be found at https://tinyurl.com/stybot 

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
