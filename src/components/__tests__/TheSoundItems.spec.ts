import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import TheSoundItems from '@/components/TheSoundItems.vue';
import { useSoundsStore } from '@/stores/sounds.ts';
import { mount } from '@vue/test-utils';

describe('TheSoundItems', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('renders all sounds', async () => {
    const soundsStore = useSoundsStore();
    const wrapper = mount(TheSoundItems);

    const soundItems = wrapper.findAll('[data-testid="sound-item"]');
    expect(soundItems.length).toBe(soundsStore.availableSounds.length);
  });
});
