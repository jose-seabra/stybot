# slots

<script setup>
import { settings as s } from "../../settings/slots.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`!slots`

> <div style="display: flex;">@{user} rolled |&nbsp<img src="https://static-cdn.jtvnw.net/emoticons/v2/25/default/dark/1.0">&nbsp|&nbsp<img src="https://static-cdn.jtvnw.net/emoticons/v2/25/default/dark/1.0">&nbsp|&nbsp<img src="https://static-cdn.jtvnw.net/emoticons/v2/25/default/dark/1.0">&nbsp| And won&nbsp<img src="https://static-cdn.jtvnw.net/emoticons/v2/305954156/default/dark/1.0"></div>

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
