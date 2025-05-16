<template>
  <div @click="toggleActive" class="block p-4 rounded-xl cursor-pointer hover:bg-gray-100 test">
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
        v-model="soundVolume"
        @click.stop
        class="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
        :class="{ active: isActive }"
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
import { useVolumeStore } from '@/stores/volume.ts';
import SoundIcon from '@/components/SoundIcon.vue';

const props = defineProps<{
  fileId: string;
  name: string;
}>();

const soundsStore = useSoundsStore();
const volumeStore = useVolumeStore();

const soundVolume = ref(1);

const audioElement = ref<HTMLAudioElement | null>(null);

const fileSrc = computed(() => {
  return '/sounds/' + props.fileId + '.ogg';
});

const computedVolume = computed(() => {
  return soundVolume.value * volumeStore.volumeMultiplicator;
});

watch(computedVolume, (newVolume) => {
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

<style scoped lang="scss"></style>
