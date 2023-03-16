# pyramid

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/pyramid.js"
const { description, ...settings } = s
import Emote from "./components/Emote.vue"
const emoteUrl = "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_447df256f3b1412b9fa0dfd3e9b6d84c/default/dark/1.0"
</script>

{{ description }}

## Usage

<!-- Input: `!pyramid 🚀` -->

<div style="display: flex; align-items: baseline;"> <code style="display: flex; align-items: center;">{{ PREFIX }} pyramid <Emote :url=emoteUrl /></code> </div>


><template v-for="(n, index) in 5"><div style="display: flex; justify-content: center;"><Emote v-for="n in index + 1" :url=emoteUrl /></div></template>


## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
