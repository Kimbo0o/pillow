import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useVolumeStore = defineStore('volume', () => {
  const volumeMultiplicator = useStorage<number>('volume-multiplicator', 1, localStorage);

  const soundVolumes = useStorage<Map<string, number>>('sound-volumes', new Map(), localStorage);

  return {
    volumeMultiplicator,
    soundVolumes,
  };
});
