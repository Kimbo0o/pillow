<template>
  <component
    :is="props.icon"
    :class="{ active: props.active, inactive: !props.active, dark: isDark }"
  />
</template>

<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core';
import { type Component } from 'vue';

const props = defineProps<{
  fileId: string;
  active: boolean;
  icon: Component;
}>();

const isDark = usePreferredDark();
</script>

<style scoped lang="scss">
.active :deep(path) {
  fill: var(--color-indigo-700) !important;
}

.inactive :deep(path) {
  fill: var(--color-gray-600) !important;
}

.inactive.dark :deep(path) {
  fill: var(--color-gray-200) !important;
}
</style>
