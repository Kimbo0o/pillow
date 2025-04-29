<template>
  <button @click="toggleAllPlaying">
    {{ soundsStore.playingActiveSounds ? 'Pause' : 'Play' }}
  </button>
</template>

<script setup lang="ts">
import { useSoundsStore } from '@/stores/sounds.ts';

const soundsStore = useSoundsStore();

const toggleAllPlaying = () => {
  soundsStore.togglePlayingActiveSounds();
};
</script>

<style scoped></style>
