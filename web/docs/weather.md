# weather

<script setup>
import { settings as s } from "../../settings/weather.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`!weather rome`

> @{user} current weather for Rome/Italy: 19:15 🕐 Clear 🌑 21ºC/69.8ºF 🌡 13KPH/8.1MPH 💨 

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
