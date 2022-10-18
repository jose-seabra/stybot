# sb

<script setup>
import { settings as s } from "../../settings/admin.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage example

Input: `!sb restart`

> restarting.

## Settings
<div v-for="(setting, index) in settings">
{{ index }}: <code>{{ setting }}</code>
</div>
