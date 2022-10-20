# sb

<script setup>
import { settings as s } from "../../settings/admin.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`!sb restart`

> <div style="display: flex;">restarting&nbsp<img src="https://cdn.7tv.app/emote/60abf6a14ef7db1ec1dff6ed/1x"></div>

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
