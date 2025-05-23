import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { useSoundsStore } from '@/stores/sounds.ts';
import { useVolumeStore } from '@/stores/volume.ts';
import { computed } from 'vue';

interface Profile {
  name: string;
  activeSounds: string[];
  soundVolumes: Map<string, number>;
}

export const useProfilesStore = defineStore('profiles', () => {
  const soundsStore = useSoundsStore();
  const volumeStore = useVolumeStore();

  const currentProfileName = useStorage('current-profile-name', 'default', localStorage);
  const storedProfiles = useStorage<Profile[]>('stored-profiles', [], localStorage);

  const switchProfile = (profileName: string) => {
    const targetProfileIndex = storedProfiles.value.findIndex(
      (profile) => profile.name === profileName,
    );
    if (targetProfileIndex === -1) {
      throw new Error('Target profile does not exist');
    }
    // memorize current profile
    const memorizedProfile: Profile = {
      name: currentProfileName.value,
      activeSounds: soundsStore.activeSounds,
      soundVolumes: volumeStore.soundVolumes,
    };
    // update settings
    const targetProfile = storedProfiles.value[targetProfileIndex];
    soundsStore.activeSounds = targetProfile.activeSounds;
    volumeStore.soundVolumes = targetProfile.soundVolumes;
    // delete profile
    storedProfiles.value.splice(targetProfileIndex, 1);
    // push memorized profile
    storedProfiles.value.push(memorizedProfile);
  };

  const createNewProfile = (profileName: string) => {
    const profileExistsAlready = storedProfiles.value.some(
      (profile) => profile.name === profileName,
    );
    if (profileExistsAlready) {
      throw new Error('This profile exists already');
    }
    const newProfile: Profile = {
      name: profileName,
      activeSounds: [],
      soundVolumes: new Map(),
    };
    storedProfiles.value.push(newProfile);
    switchProfile(profileName);
  };

  const existingProfileNames = computed(() => {
    return [currentProfileName.value, ...storedProfiles.value.map((profile) => profile.name)];
  });

  return {
    currentProfileName,
    existingProfileNames,
    switchProfile,
    createNewProfile,
  };
});
