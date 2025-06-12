import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { useSoundsStore } from '@/stores/sounds.ts';
import { useVolumeStore } from '@/stores/volume.ts';
import { computed, ref } from 'vue';

interface Preset {
  name: string;
  activeSounds: string[];
  soundVolumes: any;
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
      activeSounds: JSON.parse(JSON.stringify(soundsStore.activeSounds)),
      soundVolumes: Object.fromEntries(volumeStore.soundVolumes),
    };
    // update settings
    const targetPreset = storedPresets.value[targetIndex];
    soundsStore.activeSounds = targetPreset.activeSounds;
    volumeStore.soundVolumes = new Map(Object.entries(targetPreset.soundVolumes));
    currentPresetName.value = presetName;
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
      activeSounds: JSON.parse(JSON.stringify(soundsStore.activeSounds)),
      soundVolumes: Object.fromEntries(volumeStore.soundVolumes),
    };
    storedPresets.value.push(newPreset);
    switchPreset(presetName);
  };

  const existingPresetNames = computed(() => {
    const names = [currentPresetName.value, ...storedPresets.value.map((preset) => preset.name)];
    return names.sort((a, b) => {
      if (a === 'default') return -1;
      if (b === 'default') return 1;
      return a.localeCompare(b);
    });
  });

  const numberOfExistingPresets = computed(() => {
    return storedPresets.value.length + 1;
  });

  const deleteCurrentPreset = () => {
    const memorizedPresetName = currentPresetName.value;
    switchPreset('default');
    const index = storedPresets.value.findIndex((preset) => preset.name === memorizedPresetName);
    storedPresets.value.splice(index, 1);
  };

  const test1 = ref<string | null>(null);

  return {
    currentPresetName,
    existingPresetNames,
    numberOfExistingPresets,
    switchPreset,
    createNewPreset,
    deleteCurrentPreset,
    test1,
  };
});
