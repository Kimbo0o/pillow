import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { usePresetsStore } from '@/stores/presets.ts';
import { useSoundsStore } from '@/stores/sounds.ts';
import { useVolumeStore } from '@/stores/volume.ts';

describe('Presets store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('initializes current preset name', async () => {
    const store = usePresetsStore();
    expect(store.currentPresetName).toBe('default');
  });

  it('initializes stored presets and their names', async () => {
    const store = usePresetsStore();
    expect(store.existingPresetNames).toMatchObject(['default']);
  });

  it('allows to create new preset with current sounds', async () => {
    const soundsStore = useSoundsStore();
    const presetsStore = usePresetsStore();
    const volumeStore = useVolumeStore();

    soundsStore.toggleSoundActive('rain');
    soundsStore.toggleSoundActive('storm');
    soundsStore.toggleSoundActive('wind');
    volumeStore.soundVolumes.set('rain', 0.5);
    presetsStore.createNewPreset('myPreset1');

    expect(presetsStore.existingPresetNames).toMatchObject(['default', 'myPreset1']);
    expect(soundsStore.activeSounds).toMatchObject(['rain', 'storm', 'wind']);
    const volumesMap = new Map<string, number>();
    volumesMap.set('rain', 0.5);
    expect(volumeStore.soundVolumes).toMatchObject(volumesMap);
  });

  it('allows to switch between profiles', async () => {
    const soundsStore = useSoundsStore();
    const presetsStore = usePresetsStore();
    const volumeStore = useVolumeStore();

    soundsStore.toggleSoundActive('rain');
    soundsStore.toggleSoundActive('storm');
    soundsStore.toggleSoundActive('wind');
    volumeStore.soundVolumes.set('rain', 0.5);
    console.log(volumeStore.soundVolumes);
    presetsStore.createNewPreset('myPreset1');
    presetsStore.createNewPreset('myPreset2');
    soundsStore.toggleSoundActive('rain');
    console.log(volumeStore.soundVolumes);
    volumeStore.soundVolumes.set('rain', 0.4);
    volumeStore.soundVolumes.set('storm', 0.3);
    presetsStore.switchPreset('myPreset1');

    expect(presetsStore.currentPresetName).toBe('myPreset1');
    expect(soundsStore.activeSounds).toHaveLength(3);
    expect(volumeStore.soundVolumes.get('rain')).toBe(0.5);
  });
});
