<script setup lang="ts">
defineProps<{
    info:string
}>()
</script>


<template>
    <div class="grid place-items-center h-screen">
<p class="text-lg">
    {{ info }}
</p>
    </div>
</template>


<style scoped>

</style>