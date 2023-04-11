<script setup lang="ts">
import { scores } from 'data';
var props = defineProps<{
  currentPosition: number
}>();
</script>

<template>
  <div class="flex-col-reverse flex gap-6 items-start">
    <div v-for="(item, index ) in scores" class="font-semibold text-white text-lg w-full rounded-md p-2"
      :class="{ 'bg-red-500': index === props.currentPosition - 1 }">
      {{ item }}
    </div>
  </div>
</template>

<style scoped></style>
