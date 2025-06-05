<template>
  <button
    @click="toggleActive"
    class="block p-4 rounded-xl cursor-pointer hover:bg-gray-100 select-none"
  >
    <div class="flex flex-col items-center gap-4">
      <div class="flex">
        <div class="rounded-full p-4" :class="{ 'bg-indigo-200': isActive }">
          <SoundIcon :file-id="props.fileId" :active="isActive" />
        </div>
      </div>
      <div class="text-gray-800">{{ props.name }}</div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model="soundVolume"
        @change="onSoundVolumeChange"
        @click.stop
        class="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
        :class="{ active: isActive }"
      />
    </div>
    <audio ref="audioElement" controls :id="props.fileId" loop class="hidden">
      <source :src="fileSrc" type="audio/ogg" />
    </audio>
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, watch } from 'vue';
import { useSoundsStore } from '@/stores/sounds.ts';
import { useVolumeStore } from '@/stores/volume.ts';
import SoundIcon from '@/components/SoundIcon.vue';

const props = defineProps<{
  fileId: string;
  name: string;
}>();

const soundsStore = useSoundsStore();
const volumeStore = useVolumeStore();

const audioElement = ref<HTMLAudioElement | null>(null);

const fileSrc = computed(() => {
  return '/sounds/' + props.fileId + '.ogg';
});

// #region volume
const soundVolume = ref(1);

watch(
  volumeStore.soundVolumes,
  (newSoundVolumes) => {
    if (newSoundVolumes.has(props.fileId)) {
      soundVolume.value = newSoundVolumes.get(props.fileId) as number;
    }
  },
  { immediate: true },
);

const onSoundVolumeChange = () => {
  volumeStore.soundVolumes.set(props.fileId, soundVolume.value);
};

const computedVolume = computed(() => {
  return soundVolume.value * volumeStore.volumeMultiplicator;
});

watch(computedVolume, (newVolume) => {
  if (audioElement.value) {
    audioElement.value.volume = newVolume;
  }
});
// #endregion

// #region active
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
// #endregion
</script>

<style scoped lang="scss"></style>
