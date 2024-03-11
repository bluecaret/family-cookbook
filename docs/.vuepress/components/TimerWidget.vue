<script setup>
import { ref, watch, onUnmounted } from 'vue'

const minutes = ref(5)
const remainingTime = ref('')
const timerActive = ref(false)
let intervalId
let endTime
const audio = new Audio('./timer.ogg')

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
    <input v-if="!timerActive" class="timerInput" type="number" v-model="minutes" min="1" step="1" />
    <div v-else class="timerInput">{{ remainingTime }}</div>
    <button v-if="!timerActive" class="timerBtn" @click="startTimer">▶ Start</button>
    <button v-else class="timerBtn stop" @click="dismissTimer">▢ Stop</button>
  </div>
</template>

<style scoped>
.timerWidget {
  display: inline-flex;
  align-items: center;
  margin-inline-end: 2rem;
}

.timerInput {
  display: grid;
  align-items: center;
  width: 4rem;
  height: 2.2rem;
  font-size: 1.4rem;
  line-height: 1.3;
  padding: 0rem 0.4rem;
  background-color: var(--c-bg-darker);
  color: var(--c-text);
  border: 0;
  border-radius: 0.25rem 0 0 0.25rem;
}

.timerBtn {
  display: grid;
  align-items: center;
  width: 5rem;
  height: 2.2rem;
  font-size: 1.2rem;
  line-height: 1.3;
  padding: 0rem 0.4rem;
  background-color: var(--c-brand);
  border: 0;
  border-radius: 0 0.25rem 0.25rem 0;
  cursor: pointer;
  &.stop {
    background-color: var(--c-danger-border-dark);
  }
}
</style>
