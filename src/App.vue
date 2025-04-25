<template>
  <SoundItem v-for="sound of sounds" :key="sound" :file-id="sound" />
  <PlayPauseAll :sounds="sounds" />
</template>

<script setup lang="ts">
import SoundItem from '@/components/SoundItem.vue'
import PlayPauseAll from '@/components/PlayPauseAll.vue'

const sounds = [
  'birds',
  'boat',
  'city',
  'coffee-shop',
  'fireplace',
  'pink-noise',
  'rain',
  'storm',
  'stream',
  'summer-night',
  'train',
  'waves',
  'white-noise',
  'wind',
]
</script>
