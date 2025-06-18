import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useSoundsStore } from '@/stores/sounds.ts';
import ThePlayPauseAllBtn from '@/components/ThePlayPauseAllBtn.vue';
import { mount } from '@vue/test-utils';

describe('ThePlayPauseAllBtn', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('renders a button with correct initial title', () => {
    const soundsStore = useSoundsStore();
    soundsStore.playingActiveSounds = true;
    const wrapper = mount(ThePlayPauseAllBtn);

    const button = wrapper.find('button');
    expect(button.exists()).toBeTruthy();
    const title = button.element.getAttribute('title');
    expect(title).toBe('Pause');
  });

  it('allows to pause playing active sounds', async () => {
    const soundsStore = useSoundsStore();
    soundsStore.playingActiveSounds = true;

    const wrapper = mount(ThePlayPauseAllBtn);
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(soundsStore.playingActiveSounds).toBeFalsy();
    const title = button.element.getAttribute('title');
    expect(title).toBe('Play');
  });

  it('allows to play active sounds', async () => {
    const soundsStore = useSoundsStore();
    soundsStore.playingActiveSounds = false;

    const wrapper = mount(ThePlayPauseAllBtn);
    const button = wrapper.find('button');
    await button.trigger('click');

    expect(soundsStore.playingActiveSounds).toBeTruthy();
  });
});
