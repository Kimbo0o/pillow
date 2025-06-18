import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { usePresetsStore } from '@/stores/presets.ts';
import ThePresetSelection from '@/components/ThePresetSelection.vue';
import { mount } from '@vue/test-utils';

describe('ThePresetSelection', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('does not render preset selection if there is only the default preset', () => {
    const wrapper = mount(ThePresetSelection);

    const presetSelect = wrapper.find('[data-testid="preset-select"]');
    expect(presetSelect.exists()).toBeFalsy();
  });

  it('renders preset selection if there are presets', () => {
    const presetsStore = usePresetsStore();
    const presetNames = ['myPreset1', 'myPreset2'];
    for (const name of presetNames) {
      presetsStore.createNewPreset(name);
    }

    const wrapper = mount(ThePresetSelection);

    const presetSelect = wrapper.find('[data-testid="preset-select"]');
    expect(presetSelect.exists()).toBeTruthy();
    for (const name of presetNames) {
      const option = presetSelect.find(`option[value="${name}"]`);
      expect(option.exists()).toBeTruthy();
    }
  });

  it('allows to switch between presets', async () => {
    const presetsStore = usePresetsStore();
    const presetNames = ['myPreset1', 'myPreset2'];
    for (const name of presetNames) {
      presetsStore.createNewPreset(name);
    }

    const wrapper = mount(ThePresetSelection);
    const presetSelect = wrapper.find('[data-testid="preset-select"]');

    await presetSelect.setValue('myPreset1');
    expect(presetsStore.currentPresetName).toBe('myPreset1');

    await presetSelect.setValue('default');
    expect(presetsStore.currentPresetName).toBe('default');

    await presetSelect.setValue('myPreset2');
    expect(presetsStore.currentPresetName).toBe('myPreset2');
  });

  it('allows to create new preset', async () => {
    const presetsStore = usePresetsStore();
    const wrapper = mount(ThePresetSelection);

    const saveCurrentButton = wrapper.find('[data-testid="save-current-preset-btn"]');
    await saveCurrentButton.trigger('click');

    const input = wrapper.find('[data-testid="new-preset-name-input"]');
    await input.setValue('myPreset1');
    const saveNewButton = wrapper.find('[data-testid="save-new-preset-btn"]');
    await saveNewButton.trigger('click');

    expect(presetsStore.currentPresetName).toBe('myPreset1');
  });

  it('allows to cancel preset creation', async () => {
    const presetsStore = usePresetsStore();
    const wrapper = mount(ThePresetSelection);

    const saveCurrentButton = wrapper.find('[data-testid="save-current-preset-btn"]');
    await saveCurrentButton.trigger('click');
    const cancelButton = wrapper.find('[data-testid="save-new-preset-cancel-btn"]');
    await cancelButton.trigger('click');

    expect(presetsStore.currentPresetName).toBe('default');
    const input = wrapper.find('[data-testid="new-preset-name-input"]');
    expect(input.exists()).toBeFalsy();
  });
});
