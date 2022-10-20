<script setup>
const props = defineProps({
    url: {
        type: String,
        required: true
    }
})
</script>

<template>
    <img :src="props.url">
</template>

<style scoped>
    img {
        padding: 0 4px;
    }
</style>
