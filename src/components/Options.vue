<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Question } from 'types';
var props = defineProps<{
  questions: Question;
  log: (item: string) => void
}>();

const picture = ref();
const picture2 = ref();

function selectedCorrect(index: number) {
  console.log('correct')
  picture.value[index].classList.add("winner")
  picture2.value[index].classList.add("winner")
}
function removeClass(index: number) {
  setTimeout(() => {
    picture.value[index].classList.remove("winner")
    picture2.value[index].classList.remove("winner")
  }, 2300)
}
function selectedWrong(index: number) {
  picture.value[index].classList.add("loser")
  picture2.value[index].classList.add("loser")
}

</script>

<template>
  <div class="grid grid-cols-2 gap-10">
    <div class="relative" v-for="(items, index ) in questions.options">
      <button class="inset-0 absolute w-full z-[99]" @click="() => {
        if (items.isCorrect) {
          selectedCorrect(index)
         removeClass(index)
          props.log(items.text)
        } else {
          selectedWrong(index)
        }

      }">
      </button>
      <div class="trapezoid text-white relative grid place-items-center" ref="picture">
        <p class="translate-y-10 z-50 capitalize text-lg">{{ items.text }}</p>
      </div>
      <div class="inverted-trapezoid" ref="picture2"></div>
    </div>
  </div>
</template>

<style scoped>
.winner {
  animation-name: bg-winner;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-timing-function: step-end;
}

.loser {
  animation-name: bg-loser;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-timing-function: step-end;
}

@keyframes bg-winner {

  0% {
    border-bottom: 50px solid yellow
  }

  25% {
    border-bottom: 50px solid black
  }

  50% {
    border-bottom: 50px solid yellow
  }

  75% {
    border-bottom: 50px solid black
  }

  100% {
    border-bottom: 50px solid green
  }

}

@keyframes bg-loser {

  0% {
    border-bottom: 50px solid yellow
  }

  25% {
    border-bottom: 50px solid black
  }

  50% {
    border-bottom: 50px solid yellow
  }

  75% {
    border-bottom: 50px solid black
  }

  100% {
    border-bottom: 50px solid red
  }

}
</style>
