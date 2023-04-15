<script setup lang="ts">
import { ref } from 'vue';
import Score from './Score.vue';
import Options from './Options.vue';
import WrongAnswer from './WrongAnswer.vue';
import { questions } from 'data';
import { scores } from 'data';
const count = ref(0);
const isFailed = ref(false);
function selectWrongAnswer() {
  isFailed.value = true;
}
function next(){
  if (count.value === questions?.length - 1) {
      alert(`congratulations you won ${scores[count.value]}`);
    } else {
      count.value += 1;
    }
}
</script>

<template>
  <div v-if="!isFailed" class="grid grid-cols-12 h-screen">
    <div class="bg-red-500 col-span-10 grid grid-rows-[6fr_6fr]">
      <div class="bg-white grid place-items-center">
        <p v-if="count - 1 >= 0">{{ scores[count - 1] }}</p>
      </div>
      <div class="bg-blue-900">
        <div class="mt-[-3rem]">
          <div class="trapezoid text-white relative grid place-items-center">
            <p class="translate-y-10 z-[99] text-xl">
              {{ questions[count].text }}
            </p>
          </div>
          <div class="inverted-trapezoid"></div>
        </div>
        <div class="mt-10">
          <Options
            :questions="questions[count]"
            :select-wrong-answer="selectWrongAnswer"
            :next="next"
          />
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
  <div v-if="isFailed">
    <WrongAnswer :info="count>0 ? `you won only ${scores[count-1]} ` : 'you did not win any money, go home'"/>
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
