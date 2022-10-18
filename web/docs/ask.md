# Ask

<script setup>
import { settings as s } from "../../settings/ask.js"
const { description, ...settings } = s
</script>

{{ description }}
<!-- {{ settings }} -->
<!-- {{ settings.description }} -->
## Settings:
<div v-for="(setting, index) in settings">
{{ index }} - {{ setting }}
</div>
