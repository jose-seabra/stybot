# badjoke

<script setup>
import { settings as s } from "../../settings/badjoke.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage example

Input: `!badjoke`

> Relationship Status: just tried to reach for my dog's paw and he pulled it away so I pretended I was reaching for the remote.

## Settings
<div v-for="(setting, index) in settings">
{{ index }}: <code>{{ setting }}</code>
</div>
