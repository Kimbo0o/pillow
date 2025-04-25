<template>
  <button @click="toggleAllPlaying">{{ allPlaying ? 'Pause all' : 'Play all' }}</button>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{
  sounds: string[]
}>()

const allPlaying = ref(false)

const toggleAllPlaying = () => {
  allPlaying.value = !allPlaying.value
  for (const sound of props.sounds) {
    const audioElement = document.getElementById(sound) as HTMLAudioElement
    if (allPlaying.value) {
      audioElement.play()
    } else {
      audioElement.pause()
    }
  }
}
</script>

<style scoped></style>
