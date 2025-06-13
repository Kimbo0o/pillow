import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { ref } from 'vue';
import { sounds } from '@/data/sounds.ts';

export const useSoundsStore = defineStore('sounds', () => {
  const availableSounds = sounds;

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
