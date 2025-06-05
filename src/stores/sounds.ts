import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { ref } from 'vue';

export const useSoundsStore = defineStore('sounds', () => {
  const availableSounds = [
    { id: 'rain', name: 'Rain' },
    { id: 'storm', name: 'Storm' },
    { id: 'wind', name: 'Wind' },
    { id: 'waves', name: 'Waves' },
    { id: 'stream', name: 'Stream' },
    { id: 'birds', name: 'Birds' },
    { id: 'summer-night', name: 'Summer Night' },
    { id: 'train', name: 'Train' },
    { id: 'boat', name: 'Boat' },
    { id: 'city', name: 'City' },
    { id: 'coffee-shop', name: 'Coffe Shop' },
    { id: 'fireplace', name: 'Fireplace' },
    { id: 'pink-noise', name: 'Pink Noise' },
    { id: 'white-noise', name: 'White Noise' },
  ];

  const activeSounds = useStorage<string[]>('active-sounds', [], localStorage);

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
  };

  return {
    availableSounds,
    activeSounds,
    playingActiveSounds,
    togglePlayingActiveSounds,
    toggleSoundActive,
  };
});
