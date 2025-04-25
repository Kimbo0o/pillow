<template>
  <div>
    <input type="checkbox" v-model="isActive" />
    <div>{{ fileSrc }}</div>
    <audio ref="audioElement" controls :id="props.fileId" loop>
      <source :src="fileSrc" type="audio/ogg" />
    </audio>
    <input type="range" min="0" max="1" step="0.01" v-model="volume" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, defineProps } from 'vue'
import { useStorage } from '@vueuse/core'

const props = defineProps<{
  fileId: string
}>()

const volume = ref(50)

const audioElement = ref<HTMLAudioElement | null>(null)

const activeSounds = useStorage<string[]>('active-sounds', [], localStorage)

const fileSrc = computed(() => {
  return '/sounds/' + props.fileId + '.ogg'
})

watch(volume, (newVolume) => {
  if (audioElement.value) {
    audioElement.value.volume = newVolume
  }
})

const isActive = ref(activeSounds.value.includes(props.fileId))

watch(isActive, (newIsActive) => {
  if (newIsActive) {
    activeSounds.value.push(props.fileId)
  } else {
    activeSounds.value = activeSounds.value.filter((sound) => sound !== props.fileId)
  }
})
</script>
