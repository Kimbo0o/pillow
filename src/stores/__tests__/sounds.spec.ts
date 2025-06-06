import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useSoundsStore } from '@/stores/sounds.ts';

describe('Sounds store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('initializes available sounds', () => {
    const store = useSoundsStore();
    expect(store.availableSounds).toHaveLength(14);
  });

  it('initializes active sounds', () => {
    const store = useSoundsStore();
    expect(store.activeSounds).toBeTruthy();
    expect(store.activeSounds).toHaveLength(0);
  });

  it('allows to toggle active sounds', () => {
    const store = useSoundsStore();
    store.toggleSoundActive('rain');
    store.toggleSoundActive('storm');
    store.toggleSoundActive('wind');
    store.toggleSoundActive('storm');
    expect(store.activeSounds).toHaveLength(2);
    expect(store.activeSounds).toMatchObject(['rain', 'wind']);
  });

  it('initializes playing sounds', () => {
    const store = useSoundsStore();
    expect(store.playingActiveSounds).toBeFalsy();
  });

  it('allows to toggle playing sounds', () => {
    const store = useSoundsStore();
    expect(store.playingActiveSounds).toBeFalsy();
    store.togglePlayingActiveSounds();
    expect(store.playingActiveSounds).toBeTruthy();
    store.togglePlayingActiveSounds();
    expect(store.playingActiveSounds).toBeFalsy();
  });
});
