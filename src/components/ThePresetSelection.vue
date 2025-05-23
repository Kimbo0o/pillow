<template>
  <div>
    <template v-if="isCreatingPreset">
      <div class="flex items-center gap-4">
        <input type="text" placeholder="New preset..." v-model="newPresetName" />
        <button>Save</button>
        <button>Cancel</button>
      </div>
    </template>
    <template v-else>
      <button title="Save as new preset" class="cursor-pointer" @click="startCreatingPreset">
        <BookmarkIcon class="w-[24px] h-[24px] fill-indigo-500" />
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePresetsStore } from '@/stores/presets.ts';
import { BookmarkIcon } from '@heroicons/vue/24/solid';

const presetsStore = usePresetsStore();

const newPresetName = ref('');

const isCreatingPreset = ref(false);

const startCreatingPreset = () => {
  isCreatingPreset.value = true;
  newPresetName.value = '';
};

const cancelCreatingPreset = () => {
  isCreatingPreset.value = false;
};
</script>

<style scoped></style>
