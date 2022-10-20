# wiki

<script setup>
import { settings as s } from "../../settings/wiki.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`!wiki sun`

> The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core. The Sun radiates this energy mainly as light, ultraviolet, and infrared radiation, and is the most important source of energy for life on Earth.The Sun's radius is about 695,000 km, or 109 times that of Earth. Its mass is about 330,000 times that of Earth, comprising about 99.86% of the total mass of the Solar System. Roughly th(...) 

## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
