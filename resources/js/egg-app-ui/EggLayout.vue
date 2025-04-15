<script setup lang="ts">

import Egg from "@/egg-app-ui/Egg.vue";
import Header from "@/egg-app-ui/header.vue";
import axios from "axios";
import { onMounted, ref, watchEffect } from "vue";
import TabBar from "@/egg-app-ui/tab-bar.vue";
import audioEngine from "@/scripts/audioEngine";

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});
const love = ref(props.data.egg.love);
const temperature = ref(props.data.egg.temperature);
const containerRef = ref<HTMLElement | null>(null);
const spongeRef = ref<HTMLElement | null>(null);

const audioCtx = new AudioContext();
const AudioEngine = new audioEngine(audioCtx);

const clickSoundUrl = "/sounds/click.mp3";

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

const setCheckContainerBounds = (spongeRef: HTMLElement) => {
    containerRef.value = document.getElementById('container') as HTMLElement;
    const rectOfContainer = containerRef.value.getBoundingClientRect();
    const rectOfSponge = spongeRef.getBoundingClientRect();

    containerRef.value.addEventListener('mousemove', () => {
        if (!(rectOfSponge.x > rectOfContainer.x + rectOfContainer.width ||
            rectOfSponge.x + rectOfSponge.width < rectOfContainer.x ||
            rectOfSponge.y > rectOfContainer.y + rectOfContainer.height ||
            rectOfSponge.y + rectOfSponge.height < rectOfContainer.y)) {
            // Collision detected
            console.log('Sponge is colliding with container');
        } else {
            console.log('no detected')
        }
    });
}

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
    <Header :love="love" :temperature="temperature" :data="data" />
    <div id="container" class="h-full w-full flex items-center justify-center">
        <Egg :temperature="temperature" @eggClicked="updateLove" @poopDamage="decrementLove"/>
    </div>
    <TabBar @sponge-spawned="setCheckContainerBounds" @tempClicked="updateTemp" />
</template>
