<script setup>
import { ref, watch, onUnmounted } from 'vue'

const minutes = ref(5)
const remainingTime = ref('')
const timerActive = ref(false)
let intervalId
let endTime
const audio = new Audio('/family-cookbook/timer.ogg')

const playSound = () => {
  audio.loop = true
  audio.play()
}

const startTimer = () => {
  if (!minutes.value) return
  const now = Date.now()
  endTime = now + minutes.value * 60 * 1000
  timerActive.value = true
  updateTime()
  intervalId = setInterval(updateTime, 500)
}

const updateTime = () => {
  const now = Date.now()
  const timeLeft = Math.max(0, endTime - now)
  const minutesLeft = Math.floor(timeLeft / (1000 * 60))
    .toString()
    .padStart(2, '0')
  const secondsLeft = Math.floor((timeLeft / 1000) % 60)
    .toString()
    .padStart(2, '0')
  remainingTime.value = `${minutesLeft}:${secondsLeft}`
  if (timeLeft === 0) {
    clearInterval(intervalId)
    playSound()
  }
}

const dismissTimer = () => {
  clearInterval(intervalId)
  timerActive.value = false
  remainingTime.value = ''
  audio.pause()
}

watch(minutes, (newValue) => {
  if (newValue === '') remainingTime.value = ''
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="timerWidget">
    <button v-if="!timerActive" class="timerBtn" @click="startTimer">▶</button>
    <button v-else class="timerBtn stop" @click="dismissTimer">▢</button>
    <input v-if="!timerActive" class="timerInput" type="number" v-model="minutes" min="1" step="1" />
    <div v-else class="timerInput">{{ remainingTime }}</div>
  </div>
</template>

<style lang="scss" scoped>
.timerWidget {
  display: inline-flex;
  align-items: center;
}

.timerInput {
  display: grid;
  align-items: center;
  width: 4rem;
  height: 2rem;
  font-size: 1rem;
  text-align: left;
  line-height: 1.3;
  padding: 0rem 0.4rem;
  background-color: var(--dark-600);
  color: var(--light-200);
  border: 0;
  border-radius: 0 var(--radius) var(--radius) 0;
}

.timerBtn {
  display: grid;
  align-items: center;
  width: 2.4rem;
  height: 2rem;
  font-size: 1.2rem;
  line-height: 1.3;
  padding: 0rem 0.4rem;
  background-color: var(--primary);
  border: 0;
  border-radius: var(--radius) 0 0 var(--radius);
  cursor: pointer;
  &.stop {
    background-color: orangered;
  }
}
</style>
