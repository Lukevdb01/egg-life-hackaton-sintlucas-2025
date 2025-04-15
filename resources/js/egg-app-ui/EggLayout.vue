<script setup lang="ts">

import Egg from "@/egg-app-ui/Egg.vue";
import Header from "@/egg-app-ui/header.vue";
import axios from "axios";
import {onMounted, ref, watchEffect} from "vue";
import TabBar from "@/egg-app-ui/tab-bar.vue";

const props = defineProps({
    data: {
        type: Object,
      default: () => ({}),
    },
});
const love = ref(props.data.egg.love);
const temperature = ref(props.data.egg.temperature);

const updateLove = async () => {
  if (love.value < 100) {
   const response = await axios.post('/click-increase-update-love', {});
   love.value = response.data.love;
  }
};

const updateTemp = async () => {
  if (temperature.value < 100) {
    const response = await axios.post('/click-increase-update-temperature', {});
    temperature.value = response.data.temperature;
  }
};

const decrementLove = async () => {
  if (love.value > 0) {
    const response = await axios.post(route('decrease-update-love'), {});

    love.value = response.data.love;
  }
};

const decrementTemperature = async () => {
  if (temperature.value > 0) {
    const response = await axios.post(route('decrease-update-temperature'), {});

    temperature.value = response.data.temperature;
  }
};

onMounted(() => {
  const loveInterval = setInterval(() => {
    decrementLove();
  }, 10000);
  const temperatureInterval = setInterval(() => {
    decrementTemperature();
  }, 10000);

  watchEffect(() => {
    return () => {
          clearInterval(loveInterval);
          clearInterval(temperatureInterval);
      };
  });
});
</script>

<template>
  <Header :love="love" :temperature="temperature" :data="data"/>
    <div id="container" class="h-full w-full flex items-center justify-center">
        <Egg :temperature="temperature" @eggClicked="updateLove"/>
    </div>
    <TabBar @tempClicked="updateTemp"/>
</template>
