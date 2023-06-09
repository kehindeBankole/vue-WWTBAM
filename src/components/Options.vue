<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Question } from 'types';
import audioSound from 'assets/Answer_Selection.mp3';
import rightSound from 'assets/Right_Sound.mp3';
import wrongSound from 'assets/Wrong_Answer.mp3';
var props = defineProps<{
  questions: Question;
  selectWrongAnswer: () => void;
  next: () => void;
}>();

const trapezium = ref();
const trapezium2 = ref();
const isSelecting = ref(false);
function playSound(sound: string, next?: () => void) {
  var audio = new Audio(sound);
  audio.play();
  audio.addEventListener('ended', () => next?.());
  return audio;
}
function selectedCorrect(index: number) {
  isSelecting.value = true;
  trapezium.value[index].classList.add('winner');
  trapezium2.value[index].classList.add('winner');
}
function removeClass(index: number) {
  trapezium.value[index].classList.remove('winner');
  trapezium2.value[index].classList.remove('winner');
  isSelecting.value = false;
}

function selectedWrong(index: number) {
  isSelecting.value = true;
  trapezium.value[index].classList.add('loser');
  trapezium2.value[index].classList.add('loser');
}
</script>

<template>
  <div class="grid lg:grid-cols-2 lg:gap-10 gap-4">
    <div
      class="relative overflow-hidden"
      v-for="(items, index) in questions.options"
    >
      <button
        class="inset-0 absolute w-full z-[9]"
        :disabled="isSelecting"
        @click="
          () => {
            playSound(audioSound).addEventListener('ended', () => {
              if (items.isCorrect) {
                playSound(rightSound, props.next).addEventListener(
                  'ended',
                  () => removeClass(index)
                );
              } else {
                playSound(wrongSound).addEventListener('ended', () =>
                  props.selectWrongAnswer()
                );
              }
            });
            if (items.isCorrect) {
              selectedCorrect(index);
            } else {
              selectedWrong(index);
            }
          }
        "
      ></button>
      <div
        class="trapezoid text-white relative grid place-items-center"
        ref="trapezium"
      >
        <p
          class="lg:translate-y-10 translate-y-7 z-[9] capitalize lg:text-lg text-sm"
        >
          {{ items.text }}
        </p>
      </div>
      <div class="inverted-trapezoid" ref="trapezium2"></div>
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
    border-bottom: 40px solid orange;
  }

  25% {
    border-bottom: 40px solid black;
  }

  50% {
    border-bottom: 40px solid orange;
  }

  75% {
    border-bottom: 40px solid black;
  }

  100% {
    border-bottom: 40px solid green;
  }
}

@keyframes bg-loser {
  0% {
    border-bottom: 40px solid orange;
  }

  25% {
    border-bottom: 40px solid black;
  }

  50% {
    border-bottom: 40px solid orange;
  }

  75% {
    border-bottom: 40px solid black;
  }

  100% {
    border-bottom: 40px solid red;
  }
}

@media (min-width: 1024px) {
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
}
</style>
