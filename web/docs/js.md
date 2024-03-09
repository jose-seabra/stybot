# js

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/js.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`{{ PREFIX }}js const arr = [1, 2, 3, 4, 5]; arr.reduce((acc, cur) => { return acc + cur })`

> @{user} Output: 15

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
