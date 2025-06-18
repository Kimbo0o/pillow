import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SoundItem from '@/components/SoundItem.vue';
import { useSoundsStore } from '@/stores/sounds.ts';
import { useVolumeStore } from '@/stores/volume.ts';
import Birds from '@/assets/icons/birds.svg';
import type { Component } from 'vue';
import { createPinia, setActivePinia } from 'pinia';

describe('SoundItem.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  const props = {
    fileId: 'test-id',
    name: 'Test Sound',
    icon: Birds as unknown as Component,
  };

  it('renders properly with given props', () => {
    const wrapper = mount(SoundItem, { props });

    expect(wrapper.find('span').text()).toBe(props.name);
    expect(wrapper.find('audio').exists()).toBe(true);
    expect(wrapper.find('audio').attributes('id')).toBe(props.fileId);
  });

  it('adds sound to active sounds when clicked first time', async () => {
    const soundsStore = useSoundsStore();
    const wrapper = mount(SoundItem, { props });

    await wrapper.find('button').trigger('click');

    expect(soundsStore.activeSounds).toHaveLength(1);
    expect(soundsStore.activeSounds).toMatchObject([props.fileId]);
  });

  it('removes sound from active sounds when clicked second time', async () => {
    const soundsStore = useSoundsStore();
    const wrapper = mount(SoundItem, { props });

    await wrapper.find('button').trigger('click');
    await wrapper.find('button').trigger('click');

    expect(soundsStore.activeSounds).toHaveLength(0);
    expect(soundsStore.activeSounds).toMatchObject([]);
  });

  it('updates volume on slider change', async () => {
    const volumeStore = useVolumeStore();
    const wrapper = mount(SoundItem, { props });

    const slider = wrapper.find('input[type="range"]');
    await slider.setValue(0.5);

    expect(volumeStore.soundVolumes.get(props.fileId)).toBe(0.5);
  });

  it('computes proper file source', () => {
    const wrapper = mount(SoundItem, { props });
    const audioSource = wrapper.find('audio source');

    expect(audioSource.attributes('src')).toBe('/sounds/test-id.ogg');
  });
});
