<template>
  <div>
    <template v-if="isCreatingPreset">
      <div class="flex items-center gap-2">
        <div>
          <input
            ref="nameInput"
            type="text"
            placeholder="New preset name ..."
            v-model="newPresetName"
            class="p-1 p-2 rounded-md border-1 border-zinc-400"
            :class="{ 'border-red-500 ': nameValidationError }"
            @keydown.enter="saveNewPreset"
          />
          <div v-if="nameValidationError" class="text-red-500">{{ nameValidationError }}</div>
        </div>
        <button
          @click="saveNewPreset"
          class="px-4 py-2 rounded-md cursor-pointer bg-indigo-500 text-white hover:bg-indigo-400"
        >
          Save
        </button>
        <button
          @click="onCancelCreatingPresetClick"
          class="px-4 py-2 rounded-md cursor-pointer border-1 border-b-indigo-500 text-indigo-500 hover:bg-indigo-50"
        >
          Cancel
        </button>
      </div>
    </template>
    <template v-else>
      <div class="flex items-center gap-2">
        <template v-if="presetsStore.existingPresetNames.length > 1">
          <select @change="onPresetChange" :value="presetsStore.currentPresetName">
            <option
              v-for="presetName of presetsStore.existingPresetNames"
              :key="presetName"
              :value="presetName"
            >
              {{ presetName }}
            </option>
          </select>
          <button
            v-if="presetsStore.currentPresetName !== 'default'"
            title="Delete selected preset and switch to default"
            class="mr-4 cursor-pointer"
            @click="onDeleteCurrentPresetClick"
          >
            <TrashIcon class="w-[24px] h-[24px] fill-indigo-500"></TrashIcon>
          </button>
        </template>
        <button
          title="Save current settings as new preset"
          class="cursor-pointer"
          @click="onSaveNewPresetClick"
        >
          <BookmarkIcon class="w-[24px] h-[24px] fill-indigo-500" />
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { usePresetsStore } from '@/stores/presets.ts';
import { BookmarkIcon } from '@heroicons/vue/24/solid';
import { TrashIcon } from '@heroicons/vue/24/solid';

const nameInput: Ref<HTMLInputElement | null> = ref(null);

const presetsStore = usePresetsStore();

const newPresetName = ref('');

const isCreatingPreset = ref(false);

const onSaveNewPresetClick = () => {
  isCreatingPreset.value = true;
};

const onCancelCreatingPresetClick = () => {
  newPresetName.value = '';
  isCreatingPreset.value = false;
};

const saveNewPreset = () => {
  const error = validateNewName();
  if (error) {
    nameValidationError.value = error;
    nameInput.value?.focus();
  } else {
    presetsStore.createNewPreset(newPresetName.value);
    newPresetName.value = '';
    isCreatingPreset.value = false;
  }
};

const nameValidationError: Ref<string | null> = ref(null);

const validateNewName = () => {
  if (!newPresetName.value.length) {
    return 'Name must not be empty';
  }
  const existingNames = presetsStore.existingPresetNames;
  if (existingNames.includes(newPresetName.value)) {
    return 'Name must be unique';
  }
  return null;
};

const onPresetChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  presetsStore.switchPreset(target.value);
};

const onDeleteCurrentPresetClick = () => {
  presetsStore.deleteCurrentPreset();
};
</script>

<style scoped></style>
