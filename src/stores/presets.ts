import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { useSoundsStore } from '@/stores/sounds.ts';
import { useVolumeStore } from '@/stores/volume.ts';
import { computed } from 'vue';

interface Preset {
  name: string;
  activeSounds: string[];
  soundVolumes: Map<string, number>;
}

export const usePresetsStore = defineStore('presets', () => {
  const soundsStore = useSoundsStore();
  const volumeStore = useVolumeStore();

  const currentPresetName = useStorage('current-preset-name', 'default', localStorage);
  const storedPresets = useStorage<Preset[]>('stored-presets', [], localStorage);

  const switchPreset = (presetName: string) => {
    const targetIndex = storedPresets.value.findIndex((preset) => preset.name === presetName);
    if (targetIndex === -1) {
      throw new Error('Target preset does not exist');
    }
    // memorize current preset
    const memorizedPreset: Preset = {
      name: currentPresetName.value,
      activeSounds: soundsStore.activeSounds,
      soundVolumes: volumeStore.soundVolumes,
    };
    // update settings
    const targetPreset = storedPresets.value[targetIndex];
    soundsStore.activeSounds = targetPreset.activeSounds;
    volumeStore.soundVolumes = targetPreset.soundVolumes;
    // delete preset
    storedPresets.value.splice(targetIndex, 1);
    // push memorized preset
    storedPresets.value.push(memorizedPreset);
  };

  const createNewPreset = (presetName: string) => {
    const presetExistsAlready = storedPresets.value.some((preset) => preset.name === presetName);
    if (presetExistsAlready) {
      throw new Error('This preset exists already');
    }
    const newPreset: Preset = {
      name: presetName,
      activeSounds: [],
      soundVolumes: new Map(),
    };
    storedPresets.value.push(newPreset);
    switchPreset(presetName);
  };

  const existingPresetNames = computed(() => {
    return [currentPresetName.value, ...storedPresets.value.map((preset) => preset.name)];
  });

  const numberOfExistingPresets = computed(() => {
    return storedPresets.value.length + 1;
  });

  return {
    currentPresetName,
    existingPresetNames,
    numberOfExistingPresets,
    switchPreset,
    createNewPreset,
  };
});
