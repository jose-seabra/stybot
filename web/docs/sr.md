# sr

<script setup>
import { settings as s } from "../../settings/sr.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`!sr`

> <div style="display: flex;">@{user} your SR is 4610&nbsp<img src="https://static-cdn.jtvnw.net/emoticons/v2/305954156/default/dark/1.0"></div>

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
