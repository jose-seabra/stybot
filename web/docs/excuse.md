# excuse

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/excuse.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`{{ PREFIX }} excuse`

> My brother can't pick up my in-laws at the airport, so I'll have to go in his place. 

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
