<script setup lang="ts">
import { Question } from 'types';
var props = defineProps<{
  questions: Question;
  log:(item:string)=>void
}>();

</script>

<template>
  <div class="grid grid-cols-2 gap-10">
    <div class="relative" v-for="items in questions.options">
      <button
        class="inset-0 absolute w-full z-[99]"
        @click="() => props.log(items.text)"
      >
        h
      </button>
      <div class="trapezoid text-white relative grid place-items-center">
        <p class="translate-y-10 z-50 capitalize text-lg">{{ items.text }}</p>
      </div>
      <div class="inverted-trapezoid"></div>
    </div>
  </div>
</template>

<style scoped></style>
