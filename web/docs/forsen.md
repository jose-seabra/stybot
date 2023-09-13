# forsen

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/forsen.js"
const { description, ...settings } = s
import Emote from "./components/Emote.vue"
const emoteUrl = "https://cdn.7tv.app/emote/6151148d20eaf897465a8bff/1x.webp"
</script>

{{ description }}

## Usage

<div style="display: flex; align-items: baseline;"> <code style="display: flex; align-items: center;">{{ PREFIX }}forsen</code> </div>

> <div style="display: flex; align-items: baseline; align-items: center;"> <Emote :url=emoteUrl />We good we chilling we gucci</div>

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
