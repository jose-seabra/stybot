# sr

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/sr.js"
const { description, ...settings } = s
import Emote from "./components/Emote.vue"
const emote = "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_30050f4353aa4322b25b6b044703e5d1/default/dark/1.0"
</script>

{{ description }}

## Usage

`{{ PREFIX }}myrank`

> <span style="display: flex;">@{user} your rank is Grandmaster 2 <Emote :url=emote /></span>

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
