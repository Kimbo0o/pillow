<template>
  <div class="flex justify-center items-center gap-4 border-t-zinc-200 border-t-2 p-4">
    <ThePlayPauseAllBtn />
    <TheMainVolumeSlider />
  </div>
</template>

<script setup lang="ts">
import ThePlayPauseAllBtn from '@/components/ThePlayPauseAllBtn.vue';
import TheMainVolumeSlider from '@/components/TheMainVolumeSlider.vue';
</script>

<style scoped></style>
