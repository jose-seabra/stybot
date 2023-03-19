# nba

<script setup>
import { PREFIX } from "../../helpers/constants.js"
import { settings as s } from "../../settings/nba.js"
const { description, ...settings } = s
</script>

{{ description }}

## Usage

`{{ PREFIX }}nba games`

> NBA Games Today (UTC-8) 🕒 ⠀DET - DEN - 16:00 🗓 ⠀BKN - SAC - 16:30 🗓 ⠀TOR - OKC - 16:30 🗓 ⠀MIL - IND - 17:00 🗓 ⠀PHX - ORL - 19:00 🗓

`{{ PREFIX }}nba stats [team]`

> Stats for Washington Wizards 🧙 ⠀ 33W 42L - 44% LUL Avg. Points For/Against - 111.9/112.9 
## Settings
<div v-for="(setting, index) in settings">
{{ index }} - <code>{{ setting }}</code>
</div>
