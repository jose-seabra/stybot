# cheer

<script setup>
import { settings as s } from "../../settings/commands.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`!commands`

> @{user} a full list of commands can be found at https://tinyurl.com/stybot 

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
