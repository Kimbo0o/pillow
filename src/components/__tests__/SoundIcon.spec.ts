import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import SoundIcon from '@/components/SoundIcon.vue';
import { usePreferredDark } from '@vueuse/core';
import { computed } from 'vue';
import Birds from '@/assets/icons/birds.svg';

vi.mock('@vueuse/core', () => ({
  usePreferredDark: vi.fn(),
}));

describe('SoundIcon.vue', () => {
  it('renders the correct icon component', () => {
    const wrapper = mount(SoundIcon, {
      props: {
        fileId: '123',
        active: true,
        icon: Birds,
      },
    });

    expect(wrapper.findComponent(Birds).exists()).toBe(true);
  });

  it('applies active class when active is true', () => {
    const wrapper = mount(SoundIcon, {
      props: {
        fileId: '123',
        active: true,
        icon: Birds,
      },
    });

    expect(wrapper.classes()).toContain('active');
    expect(wrapper.classes()).not.toContain('inactive');
  });

  it('applies inactive class when active is false', () => {
    const wrapper = mount(SoundIcon, {
      props: {
        fileId: '123',
        active: false,
        icon: Birds,
      },
    });

    expect(wrapper.classes()).toContain('inactive');
    expect(wrapper.classes()).not.toContain('active');
  });

  it('applies dark class based on isDark preference', () => {
    vi.mocked(usePreferredDark).mockReturnValue(computed(() => true));

    const wrapper = mount(SoundIcon, {
      props: {
        fileId: '123',
        active: false,
        icon: Birds,
      },
    });

    expect(wrapper.classes()).toContain('dark');
  });

  it('does not apply dark class when dark mode is not preferred', () => {
    vi.mocked(usePreferredDark).mockReturnValue(computed(() => false));

    const wrapper = mount(SoundIcon, {
      props: {
        fileId: '123',
        active: false,
        icon: Birds,
      },
    });

    expect(wrapper.classes()).not.toContain('dark');
  });
});
