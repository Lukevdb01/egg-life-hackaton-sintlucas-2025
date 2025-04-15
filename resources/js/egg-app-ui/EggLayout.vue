<script setup lang="ts">

import Egg from "@/egg-app-ui/Egg.vue";
import Header from "@/egg-app-ui/header.vue";
import axios from "axios";
import { onMounted, ref, watchEffect } from "vue";
import TabBar from "@/egg-app-ui/tab-bar.vue";

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});

const loveClickCount = ref(0);
const temperatureClickCount = ref(0);
const love = ref(props.data.egg.love);
const temperature = ref(props.data.egg.temperature);
const containerRef = ref<HTMLElement | null>(null);
const spongeRef = ref<HTMLElement | null>(null);

watchEffect(() => {
    if (love.value > 50 && temperature.value > 50) {
        axios.post('/stage-one', {})

    }
    if (love.value === 100 && temperature.value === 100) {
        axios.post('/stage-two', {})
    }
});

const updateLove = async () => {
    loveClickCount.value++;

    if (loveClickCount.value >= 10) {
        const response = await axios.post('/click-increase-update-love', {});
        love.value = response.data.love;
        loveClickCount.value = 0; // Reset after sending
    }
};

const updateTemp = async () => {
    temperatureClickCount.value++;

    if (temperatureClickCount.value >= 10) {
        const response = await axios.post('/click-increase-update-temperature', {});
        temperature.value = response.data.temperature;
        temperatureClickCount.value = 0; // Reset after sending
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

    containerRef.value.addEventListener('mousemove', (e) => {
        const spongeWidth = spongeRef.offsetWidth;
        const spongeHeight = spongeRef.offsetHeight;

        const x = e.clientX;
        const y = e.clientY;

        const futureRect = {
            x: x,
            y: y,
            width: spongeWidth,
            height: spongeHeight
        };

        if (!(futureRect.x > rectOfContainer.x + rectOfContainer.width ||
            futureRect.x + futureRect.width < rectOfContainer.x ||
            futureRect.y > rectOfContainer.y + rectOfContainer.height ||
            futureRect.y + futureRect.height < rectOfContainer.y)) {
            // Collision detected
            spongeRef.style.transform = `translate(${x}px, ${y}px)`;

        }

        document.querySelectorAll('.dirt').forEach((el, index) => {
            const followerRect = spongeRef.getBoundingClientRect();
            const dirtRect = el.getBoundingClientRect();

            if (isRectOverlap(followerRect, dirtRect)) {
                el.addEventListener('click', () => {
                    el.remove();
                });
            }
        });

        function isRectOverlap(rect1, rect2) {
        return !(
            rect1.x + rect1.width <= rect2.x ||  // rect1 is volledig links van rect2
            rect2.x + rect2.width <= rect1.x ||  // rect2 is volledig links van rect1
            rect1.y + rect1.height <= rect2.y || // rect1 is volledig boven rect2
            rect2.y + rect2.height <= rect1.y    // rect2 is volledig boven rect1
        );
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
