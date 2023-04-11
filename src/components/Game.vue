<script setup lang="ts">
import { ref } from 'vue';
import Score from './Score.vue';
import Options from './Options.vue';
import { questions } from 'data';
import { scores } from 'data';
const count = ref(0);
function log(item: string) {

  setTimeout(() => {
    if (count.value === questions?.length - 1) {
      alert(`congratulations you won ${scores[count.value]}`)
    } else {
      count.value += 1
    }
  }, 2000)
}
</script>

<template>
  <div class="grid grid-cols-12 h-screen">
    <div class="bg-red-500 col-span-10 grid grid-rows-[6fr_6fr]">
      <div class="bg-white"> {{ count }}</div>
      <div class="bg-yellow-500">

        <div class="mt-[-3rem]">
          <div class="trapezoid text-white relative grid place-items-center">
            <p class="translate-y-10 z-[99] text-xl">
              {{ questions[count].text }}
            </p>
          </div>
          <div class="inverted-trapezoid"></div>
        </div>
        <div class="mt-10">
          <Options :questions="questions[count]" :log="(e) => log(e)" />
        </div>
      </div>
    </div>
    <div class="bg-blue-500 col-span-2">
      <div class="grid grid-rows-[2fr_10fr]">
        <div class="bg-blue-800">
          <h1 class="text-white">LIFELINES</h1>
        </div>
        <div class="px-6">
          <Score :current-position="count" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.trapezoid {
  border-bottom: 50px solid black;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  height: 0;
  width: 100%;
}

.inverted-trapezoid {
  border-bottom: 50px solid black;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  height: 0;
  width: 100%;
  transform: rotate(180deg);
}
</style>
