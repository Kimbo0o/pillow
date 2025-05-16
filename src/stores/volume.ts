import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useVolumeStore = defineStore('volume', () => {
  const volumeMultiplicator = useStorage<number>('volumeMultiplicator', 1, localStorage);

  return {
    volumeMultiplicator,
  };
});
