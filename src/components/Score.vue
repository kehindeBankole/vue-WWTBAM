<script setup lang="ts">
import { scores } from 'data';
</script>

<template>
  <div class="space-y-10 flex flex-col items-start">
    <div v-for="item in scores" class="font-semibold text-white text-lg">
      {{ item }}
    </div>
  </div>
</template>

<style scoped></style>
