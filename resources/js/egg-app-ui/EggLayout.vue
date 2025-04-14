<script setup lang="ts">

import Egg from "@/egg-app-ui/Egg.vue";
import Header from "@/egg-app-ui/header.vue";
import axios from "axios";
import {onMounted, ref, watchEffect} from "vue";

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

const decrementLove = async () => {
  if (love.value > 0) {
    const response = await axios.post(route('decrease-update-love'), {});

    love.value = response.data.love;
  }
};

onMounted(() => {
  const interval = setInterval(() => {
    decrementLove();
  }, 10000);

  watchEffect(() => {
    return () => clearInterval(interval);
  });
});
</script>

<template>
  <Header :love="love" :temperature="temperature"/>
  <div class="h-full w-full flex items-center bg-[#ebebeb] justify-center">
        <Egg :temperature="temperature" @eggClicked="updateLove"/>
    </div>
</template>
