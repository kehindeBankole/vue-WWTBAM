<script setup lang="ts">
import { ref } from 'vue';
import Score from './Score.vue';
import Options from './Options.vue';
import WrongAnswer from './WrongAnswer.vue';
import { questions } from 'data';
import { scores } from 'data';
const count = ref(0);
const isFailed = ref(false);
const data = ref(questions);
const lifeLinesUsed = ref({}) as Record<string, any>;
const audienceChoice = ref({}) as Record<string, any>;
const openModal = ref(false);
const windowWidth = window.innerWidth;
const openInfoBox = ref(window.innerWidth > 1023);

function toggleInfoBox() {
  openInfoBox.value = !openInfoBox.value;
}
function selectWrongAnswer() {
  isFailed.value = true;
}
function next() {
  if (count.value === questions?.length - 1) {
    alert(`congratulations you won ${scores[count.value]}`);
  } else {
    count.value += 1;
  }
}

function useLifeLine(type: '50/50' | 'AUD') {
  if (type === '50/50') {
    lifeLinesUsed.value[type] = type;
    const arr = data.value[count.value].options.filter(
      (item) => item.isCorrect === false
    );
    // Choose two random indices from the array
    let randomIndex1 = Math.floor(Math.random() * arr.length);
    let randomIndex2 = Math.floor(Math.random() * arr.length);

    // Make sure the two indices are different
    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * arr.length);
    }
    arr[randomIndex1].text = '';
    arr[randomIndex2].text = '';
  } else if (type === 'AUD') {
    openModal.value = true;
    lifeLinesUsed.value[type] = type;
    const answers = data.value[count.value].options;

    // Function to generate a random integer within a range
    function getRandomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to simulate an audience response
    function getAudienceResponse() {
      const correctAnswer = answers.find((answer) => answer.isCorrect) as {
        text: string;
        isCorrect: boolean;
      };
      const response = {
        [correctAnswer.text]: getRandomInt(50, 100),
      };
      let remainingPercent = 100 - response[correctAnswer.text];
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].isCorrect) {
          continue;
        }
        const percent = getRandomInt(0, remainingPercent);
        response[answers[i].text] = percent;
        remainingPercent -= percent;
      }
      return response;
    }

    const audienceResponse = getAudienceResponse();
    setTimeout(() => {
      audienceChoice.value = audienceResponse;
    }, 0);
  }
}
</script>

<template>
  <main>
    <div class="modal" v-if="openModal">
      <div class="bg-white lg:w-[50rem] w-[90%] p-10 rounded-xl space-y-10">
        <button
          @click="openModal = false"
          class="bg-blue-500 w-20 text-sm text-white h-20 rounded-full"
        >
          OKAY
        </button>
        <div class="grid grid-cols-4 space-x-4">
          <div
            v-for="items in data[count].options"
            class="h-[20rem] flex flex-col items-center"
          >
            <div
              class="relative bg-red-500 w-full h-full transition-all origin-bottom duration-1000"
              :style="{
                transform: `scaleY(${audienceChoice[`${items.text}`]}%)`,
              }"
            ></div>
            <p>{{ audienceChoice && audienceChoice[`${items.text}`] }}%</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isFailed" class="grid lg:grid-cols-12 h-screen relative">
      <div class="fixed p-5 right-0">
        <button
          class="w-10 h-10 rounded-full bg-blue-500 lg:hidden"
          @click="toggleInfoBox"
        >
          ⚠️
        </button>
      </div>
      <div class="bg-red-500 col-span-10 grid grid-rows-[6fr_6fr]">
        <div class="bg-white grid place-items-center">
          <p v-if="count - 1 >= 0">{{ scores[count - 1] }}</p>
        </div>
        <div class="bg-blue-900">
          <div class="mt-[-3rem]">
            <div class="trapezoid text-white relative grid place-items-center">
              <p
                class="translate-y-5 lg:translate-y-10 text-center z-[10] text-xl"
              >
                {{ data[count].text }}
              </p>
            </div>
            <div class="inverted-trapezoid"></div>
          </div>
          <div class="mt-10 lg:pb-0 pb-10">
            <Options
              :questions="data[count]"
              :select-wrong-answer="selectWrongAnswer"
              :next="next"
            />
          </div>
        </div>
      </div>
      <div
        class="bg-blue-500 col-span-2 fixed lg:relative lg:block lg:w-full h-full z-[11]"
        :style="{ width: openInfoBox && windowWidth <= 1023 ? '50%' : '100%' }"
        v-if="openInfoBox"
      >
        <div class="grid grid-rows-[1fr_10fr]">
          <div class="bg-blue-800 grid grid-cols-3 text-white">
            <button
              @click="() => useLifeLine('50/50')"
              :disabled="lifeLinesUsed['50/50']"
            >
              50/50
            </button>
            <button
              @click="() => useLifeLine('AUD')"
              :disabled="lifeLinesUsed['AUD']"
            >
              AUD
            </button>
            <button>SWAP</button>
          </div>
          <div class="px-6">
            <Score :current-position="count" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isFailed">
      <WrongAnswer
        :info="
          count > 0
            ? `you won only ${scores[count - 1]} `
            : 'you did not win any money, go home'
        "
      />
    </div>
  </main>
</template>

<style>
button:disabled {
  cursor: not-allowed;
}
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

.modal {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: grid;
  place-items: center;
}
</style>
