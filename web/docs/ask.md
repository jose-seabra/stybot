# ask

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/ask.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`{{ PREFIX }} ask what can you tell me about node.js?`

> Node.js is a JavaScript runtime environment that allows you to run JavaScript code on your server.

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
