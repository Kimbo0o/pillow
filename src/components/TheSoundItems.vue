<template>
  <div class="flex justify-center p-4">
    <div class="flex flex-wrap gap-2 max-w-300">
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
