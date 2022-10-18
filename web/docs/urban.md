# urban

<script setup>
import { settings as s } from "../../settings/urban.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage example

Input: `!urban no shot`

> Indicating that an action has no chance in happening whatsoever.

> Dude: When i grow up, i'm gonna be a successful millionaire. Other Dude: no shot 

## Settings
<div v-for="(setting, index) in settings">
{{ index }}: <code>{{ setting }}</code>
</div>
