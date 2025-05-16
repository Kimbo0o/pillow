<template>
  <div class="flex justify-center items-start p-8 overflow-y-auto">
    <div class="flex flex-wrap gap-4 max-w-300 items-start">
      <SoundItem
        v-for="sound of soundsStore.availableSounds"
        :key="sound.id"
        :file-id="sound.id"
        :name="sound.name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SoundItem from '@/components/SoundItem.vue';
import { useSoundsStore } from '@/stores/sounds.ts';

const soundsStore = useSoundsStore();
</script>

<style scoped></style>
