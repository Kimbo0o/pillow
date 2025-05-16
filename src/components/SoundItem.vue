<template>
  <div @click="toggleActive" class="p-4 rounded-xl cursor-pointer hover:bg-gray-100">
    <div class="flex justify-center">
      <div class="rounded-full p-4" :class="{ 'bg-indigo-200': isActive }">
        <SoundIcon :file-id="props.fileId" :active="isActive" />
      </div>
    </div>
    <input type="range" min="0" max="1" step="0.01" v-model="volume" @click.stop />
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
