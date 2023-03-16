# time

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/time.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`{{ PREFIX }}time andorra`

> @{user} current time in Andorra La Vella/Andorra: 2022-10-18 19:03 

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
