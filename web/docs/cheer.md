# cheer

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/cheer.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`{{ PREFIX }} cheer`

> @{user} You have the biggest heart. 

`{{ PREFIX }} cheer @someone`

> @{someone} You are the reason I smile every day.

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
