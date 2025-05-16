<template>
  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    v-model="volumeStore.volumeMultiplicator"
    class="w-48 h-2 rounded-lg appearance-none cursor-pointer slider active"
  />
</template>

<script setup lang="ts">
import { useVolumeStore } from '@/stores/volume.ts';

const volumeStore = useVolumeStore();
</script>

<style scoped></style>
