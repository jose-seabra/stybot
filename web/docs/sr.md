# sr

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/sr.js"
const { description, ...settings } = s
import Emote from "./components/Emote.vue"
const emote = "https://static-cdn.jtvnw.net/emoticons/v2/305954156/default/dark/1.0"
</script>

{{ description }}

## Usage

`{{ PREFIX }}sr`

> <span style="display: flex;">@{user} your SR is 4610 <Emote :url=emote /></span>

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
