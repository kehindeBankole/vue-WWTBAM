<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Question } from 'types';
import audioSound from 'assets/Answer_Selection.mp3';
import rightSound from 'assets/Right_Sound.mp3';
import wrongSound from 'assets/Wrong_Answer.mp3';
var props = defineProps<{
  questions: Question;
  log: (item: string) => void;
  selectWrongAnswer:()=>void
}>();

const picture = ref();
const picture2 = ref();

function playSound(sound:string) {
  var audio = new Audio(sound); // path to file
  audio.play();
}
function selectedCorrect(index: number) {
  setTimeout(() => playSound(rightSound), 5000);
  picture.value[index].classList.add('winner');
  picture2.value[index].classList.add('winner');
}
function removeClass(index: number) {
  setTimeout(() => {
    picture.value[index].classList.remove('winner');
    picture2.value[index].classList.remove('winner');
  }, 5500);
}
function selectedWrong(index: number) {
  setTimeout(() => playSound(wrongSound), 5000);
  picture.value[index].classList.add('loser');
  picture2.value[index].classList.add('loser');
  setTimeout(() =>  props.selectWrongAnswer(), 9000);

}
</script>

<template>
  <div class="grid grid-cols-2 gap-10">
    <div class="relative" v-for="(items, index) in questions.options">
      <button
        class="inset-0 absolute w-full z-[99]"
        @click="
          () => {
            playSound(audioSound);
            if (items.isCorrect) {
              selectedCorrect(index);
              removeClass(index);
              props.log(items.text);
            } else {
              selectedWrong(index);
            }
          }
        "
      ></button>
      <div
        class="trapezoid text-white relative grid place-items-center"
        ref="picture"
      >
        <p class="translate-y-10 z-50 capitalize text-lg">{{ items.text }}</p>
      </div>
      <div class="inverted-trapezoid" ref="picture2"></div>
    </div>
  </div>
</template>

<style scoped>
.winner {
  animation-name: bg-winner;
  animation-duration: 5s;
  animation-fill-mode: forwards;
  animation-timing-function: step-end;
}

.loser {
  animation-name: bg-loser;
  animation-duration: 5s;
  animation-fill-mode: forwards;
  animation-timing-function: step-end;
}

@keyframes bg-winner {
  0% {
    border-bottom: 50px solid orange;
  }

  25% {
    border-bottom: 50px solid black;
  }

  50% {
    border-bottom: 50px solid orange;
  }

  75% {
    border-bottom: 50px solid black;
  }

  100% {
    border-bottom: 50px solid green;
  }
}

@keyframes bg-loser {
  0% {
    border-bottom: 50px solid orange;
  }

  25% {
    border-bottom: 50px solid black;
  }

  50% {
    border-bottom: 50px solid orange;
  }

  75% {
    border-bottom: 50px solid black;
  }

  100% {
    border-bottom: 50px solid red;
  }
}
</style>
