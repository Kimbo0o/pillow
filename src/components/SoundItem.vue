<template>
  <div @click="toggleActive" class="block p-4 rounded-xl cursor-pointer hover:bg-gray-100">
    <div class="flex flex-col items-center gap-4">
      <div class="flex">
        <div class="rounded-full p-4" :class="{ 'bg-indigo-200': isActive }">
          <SoundIcon :file-id="props.fileId" :active="isActive" />
        </div>
      </div>
      <div>{{ props.name }}</div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model="volume"
        @click.stop
        class="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
        :class="{ 'bg-indigo-400': isActive, 'bg-gray-200': !isActive, active: isActive }"
      />
    </div>
    <audio ref="audioElement" controls :id="props.fileId" loop class="hidden">
      <source :src="fileSrc" type="audio/ogg" />
    </audio>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, defineProps } from 'vue';
import { useSoundsStore } from '@/stores/sounds.ts';
import SoundIcon from '@/components/SoundIcon.vue';

const props = defineProps<{
  fileId: string;
  name: string;
}>();

const volume = ref(50);

const audioElement = ref<HTMLAudioElement | null>(null);

const soundsStore = useSoundsStore();

const fileSrc = computed(() => {
  return '/sounds/' + props.fileId + '.ogg';
});

const iconSrc = computed(() => {
  return '/icons/emblems/' + props.fileId + '.svg';
});

watch(volume, (newVolume) => {
  if (audioElement.value) {
    audioElement.value.volume = newVolume;
  }
});

const toggleActive = () => {
  soundsStore.toggleSoundActive(props.fileId);
};

const isActive = computed(() => {
  return soundsStore.activeSounds.includes(props.fileId);
});

const shouldBePlaying = computed(() => {
  return isActive.value && soundsStore.playingActiveSounds;
});

watch(shouldBePlaying, (newShouldBePlaying) => {
  if (newShouldBePlaying) {
    audioElement.value?.play();
  } else {
    audioElement.value?.pause();
  }
});
</script>

<style scoped lang="scss">
/* Chrome, Safari, Edge */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* clear browser thumb */
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: oklch(87.2% 0.01 258.338);
}

/* Firefox */
.slider::-moz-range-thumb {
  -webkit-appearance: none; /* clear browser thumb */
  width: 15px;
  height: 15px;
  border: none;
  border-radius: 50%;
  background-color: oklch(87.2% 0.01 258.338);
}

.slider.active::-webkit-slider-thumb,
.slider.active::-moz-range-thumb {
  background-color: oklch(39.8% 0.195 277.366);
}
</style>
