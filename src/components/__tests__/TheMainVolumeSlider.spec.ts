import { mount } from '@vue/test-utils';
import { describe, expect, it, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useVolumeStore } from '@/stores/volume';
import TheMainVolumeSlider from '@/components/TheMainVolumeSlider.vue';

describe('TheMainVolumeSlider', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('renders an input slider with correct initial value from store', () => {
    const volumeStore = useVolumeStore();
    volumeStore.volumeMultiplicator = 0.5;
    const wrapper = mount(TheMainVolumeSlider);

    const slider = wrapper.find('input[type="range"]');
    expect(slider.exists()).toBeTruthy();
    expect((slider.element as HTMLInputElement).value).toBe('0.5');
  });

  it('updates the store when the slider value changes', async () => {
    const volumeStore = useVolumeStore();
    const wrapper = mount(TheMainVolumeSlider);

    const slider = wrapper.find('input[type="range"]');
    await slider.setValue('0.8');
    expect(volumeStore.volumeMultiplicator).toBe('0.8');
  });

  it('responds to changes in the store value', async () => {
    const volumeStore = useVolumeStore();
    const wrapper = mount(TheMainVolumeSlider);

    volumeStore.volumeMultiplicator = 0.3;
    await wrapper.vm.$nextTick();

    const slider = wrapper.find('input[type="range"]');
    expect((slider.element as HTMLInputElement).value).toBe('0.3');
  });
});
