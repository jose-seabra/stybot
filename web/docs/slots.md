# slots

<script setup>
import { settings as s } from "../../settings/slots.js"
const { description, ...settings } = s
import Emote from "./components/Emote.vue"
const Kappa = "https://static-cdn.jtvnw.net/emoticons/v2/25/default/dark/1.0"
const PogChamp = "https://static-cdn.jtvnw.net/emoticons/v2/305954156/default/dark/1.0"
</script>

{{ description }}

## Usage

`!slots`

> <span style="display: flex;">@{user} rolled | <Emote :url=Kappa /> | <Emote :url=Kappa /> | <Emote :url=Kappa /> | And won <Emote :url=PogChamp /></span>

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
