import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useVolumeStore } from '@/stores/volume.ts';

describe('Volume store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes volume multiplicator default value', () => {
    const store = useVolumeStore();
    expect(store.volumeMultiplicator).toBe(1);
  });

  it('stores volume multiplicator change', () => {
    const store = useVolumeStore();
    const newValue = 0.35;
    store.volumeMultiplicator = newValue;
    expect(store.volumeMultiplicator).toBe(newValue);
  });

  it('initializes sound volumes with default value', () => {
    const store = useVolumeStore();
    expect(store.soundVolumes).toHaveLength(0);
  });

  it('stores new sound volume', () => {
    const store = useVolumeStore();
    store.soundVolumes.set('test1', 0.54);
    expect(store.soundVolumes).toHaveLength(1);
  });

  it('stores another sound volume', () => {
    const store = useVolumeStore();
    store.soundVolumes.set('test2', 0.54);
    expect(store.soundVolumes).toHaveLength(2);
    expect(store.soundVolumes.has('test1')).toBeTruthy();
    expect(store.soundVolumes.has('test2')).toBeTruthy();
  });

  it('allows deletion of sound volume', () => {
    const store = useVolumeStore();
    store.soundVolumes.delete('test2');
    expect(store.soundVolumes).toHaveLength(1);
    expect(store.soundVolumes.has('test1')).toBeTruthy();
    expect(store.soundVolumes.has('test2')).toBeFalsy();
  });
});
