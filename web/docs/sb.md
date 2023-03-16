# sb

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/admin.js"
const { description, ...settings } = s
import Emote from "./components/Emote.vue"
const emote = "https://cdn.7tv.app/emote/60abf6a14ef7db1ec1dff6ed/1x"
</script>

{{ description }}

## Usage

`{{ PREFIX }} sb restart`

> <span style="display: flex;">restarting <Emote :url=emote /></span>

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
