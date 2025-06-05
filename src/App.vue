<template>
  <div class="h-screen grid grid-cols-1 grid-rows-[1fr_auto] bg-gray-50 dark:bg-zinc-800">
    <TheSoundItems />
    <TheMenuBar class="bg-white dark:bg-zinc-700" />
  </div>
</template>

<script setup lang="ts">
import TheSoundItems from '@/components/TheSoundItems.vue';
import TheMenuBar from '@/components/TheMenuBar.vue';
</script>
