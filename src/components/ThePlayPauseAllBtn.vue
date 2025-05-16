<template>
  <button
    @click="toggleAllPlaying"
    class="cursor-pointer"
    :title="soundsStore.playingActiveSounds ? 'Pause' : 'Play'"
  >
    <div class="flex rounded-full bg-indigo-400 p-3">
      <component
        :is="soundsStore.playingActiveSounds ? PauseIcon : PlayIcon"
        class="w-[24px] h-[24px] fill-white"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import { useSoundsStore } from '@/stores/sounds.ts';
import { PlayIcon } from '@heroicons/vue/24/solid';
import { PauseIcon } from '@heroicons/vue/24/solid';

const soundsStore = useSoundsStore();

const toggleAllPlaying = () => {
  soundsStore.togglePlayingActiveSounds();
};
</script>

<style scoped></style>
