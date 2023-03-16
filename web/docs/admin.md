# admin

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/admin.js"
const { description, ...settings } = s
import Emote from "./components/Emote.vue"
const peepoStrokeUrl = "https://cdn.7tv.app/emote/60abf6a14ef7db1ec1dff6ed/1x.webp"
const borpaSpinUrl = "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_447df256f3b1412b9fa0dfd3e9b6d84c/default/dark/1.0"
</script>

{{ description }}

## Usage

`{{ PREFIX }}admin restart`

> <span style="display: flex;">restarting <Emote :url=peepoStrokeUrl /></span>

`{{ PREFIX }}admin update`

> <span style="display: flex;">updating <Emote :url=borpaSpinUrl /></span>

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
