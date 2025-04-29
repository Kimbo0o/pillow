<template>
  <div class="flex justify-center">
    <div class="flex flex-wrap max-w-300">
      <SoundItem v-for="sound of soundsStore.availableSounds" :key="sound" :file-id="sound" />
    </div>
  </div>
  <PlayPauseAll />
</template>

<script setup lang="ts">
import SoundItem from '@/components/SoundItem.vue';
import PlayPauseAll from '@/components/PlayPauseAll.vue';
import { useSoundsStore } from '@/stores/sounds.ts';

const soundsStore = useSoundsStore();
</script>
