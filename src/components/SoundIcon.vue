<template>
  <component
    :is="IconComponent"
    :class="{ 'icon-active': props.active, 'icon-inactive': !props.active }"
  />
</template>

<script setup lang="ts">
import Birds from '@/assets/icons/birds.svg';
import Boat from '@/assets/icons/boat.svg';
import City from '@/assets/icons/city.svg';
import CoffeeShop from '@/assets/icons/coffee-shop.svg';
import FirePlace from '@/assets/icons/fireplace.svg';
import PinkNoise from '@/assets/icons/pink-noise.svg';
import Rain from '@/assets/icons/rain.svg';
import SoundWave from '@/assets/icons/sound-wave.svg';
import Storm from '@/assets/icons/storm.svg';
import Stream from '@/assets/icons/stream.svg';
import SummerNight from '@/assets/icons/summer-night.svg';
import Train from '@/assets/icons/train.svg';
import Waves from '@/assets/icons/waves.svg';
import WhiteNoise from '@/assets/icons/white-noise.svg';
import Wind from '@/assets/icons/wind.svg';

import { computed } from 'vue';

const props = defineProps<{
  fileId: string;
  active: boolean;
}>();

const IconComponent = computed(() => {
  switch (props.fileId) {
    case 'birds':
      return Birds;
    case 'boat':
      return Boat;
    case 'city':
      return City;
    case 'coffee-shop':
      return CoffeeShop;
    case 'fireplace':
      return FirePlace;
    case 'pink-noise':
      return PinkNoise;
    case 'rain':
      return Rain;
    case 'sound-wave':
      return SoundWave;
    case 'storm':
      return Storm;
    case 'stream':
      return Stream;
    case 'summer-night':
      return SummerNight;
    case 'train':
      return Train;
    case 'waves':
      return Waves;
    case 'white-noise':
      return WhiteNoise;
    case 'wind':
      return Wind;
  }
  return null;
});
</script>

<style scoped lang="scss">
.icon-active :deep(path) {
  fill: oklch(55.8% 0.288 302.321) !important;
}

.icon-inactive :deep(path) {
  fill: oklch(37% 0.013 285.805) !important;
}
</style>
