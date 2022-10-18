# Permissions

Commands are subject to a validation of the user's permissions.
Currently this is done solely by the user permission in the current channel (no cross channel permissions except for the owner).

## Reference
Permission levels are the following:
<script setup>
import { permissions } from "../../helpers/constants.js"
</script>

<div v-for="(permission, index) in permissions">
{{ index }}: <code>{{ permission }}</code>
</div>
