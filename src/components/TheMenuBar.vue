<template>
  <div
    class="flex justify-between items-center gap-4 border-t-gray-200 dark:border-t-zinc-900 border-t-2 p-4"
  >
    <ThePresetSelection />
    <div class="flex items-center gap-4">
      <ThePlayPauseAllBtn />
      <TheMainVolumeSlider />
    </div>
  </div>
</template>

<script setup lang="ts">
import ThePlayPauseAllBtn from '@/components/ThePlayPauseAllBtn.vue';
import TheMainVolumeSlider from '@/components/TheMainVolumeSlider.vue';
import ThePresetSelection from '@/components/ThePresetSelection.vue';
</script>

<style scoped></style>
