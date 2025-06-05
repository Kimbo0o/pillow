<template>
  <div class="h-screen grid grid-cols-1 grid-rows-[1fr_auto] bg-gray-50">
    <TheSoundItems />
    <TheMenuBar class="bg-white" />
  </div>
</template>

<script setup lang="ts">
import TheSoundItems from '@/components/TheSoundItems.vue';
import TheMenuBar from '@/components/TheMenuBar.vue';
</script>
