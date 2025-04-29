import { defineStore } from 'pinia';

import { useStorage } from '@vueuse/core';
import { ref } from 'vue';

export const useSoundsStore = defineStore('sounds', () => {
  const availableSounds = [
    'birds',
    'boat',
    'city',
    'coffee-shop',
    'fireplace',
    'pink-noise',
    'rain',
    'storm',
    'stream',
    'summer-night',
    'train',
    'waves',
    'white-noise',
    'wind',
  ];

  const activeSounds = useStorage<string[]>('sounds', [], localStorage);

  const toggleSoundActive = (id: string) => {
    if (activeSounds.value.includes(id)) {
      activeSounds.value = activeSounds.value.filter((soundId) => soundId !== id);
    } else {
      activeSounds.value.push(id);
    }
  };

  const playingActiveSounds = ref(false);

  const togglePlayingActiveSounds = () => {
    playingActiveSounds.value = !playingActiveSounds.value;
    console.log(playingActiveSounds.value);
  };

  return {
    availableSounds,
    activeSounds,
    playingActiveSounds,
    togglePlayingActiveSounds,
    toggleSoundActive,
  };
});
