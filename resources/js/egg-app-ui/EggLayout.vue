<script setup lang="ts">

import Egg from "@/egg-app-ui/Egg.vue";
import Header from "@/egg-app-ui/header.vue";
import axios from "axios";
import { onMounted, ref, watchEffect } from "vue";
import TabBar from "@/egg-app-ui/tab-bar.vue";
import audioEngine from "@/scripts/audioEngine";

const audioCtx = new AudioContext();
const ae = new audioEngine(audioCtx);
const shouldCrack = ref(false);
const shouldHatch = ref(false);
const shouldBeDeath = ref(false);

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

let stageOneTimeout: ReturnType<typeof setTimeout> | null = null;
let stageTwoTimeout: ReturnType<typeof setTimeout> | null = null;
let deadTimeout: ReturnType<typeof setTimeout> | null = null;

watchEffect(() => {
    // 🥚 Stage One
    if (love.value > 50 && temperature.value > 50) {
        if (!stageOneTimeout) {
            stageOneTimeout = setTimeout(() => {
                axios.post('/stage-one', {});
                stageOneTimeout = null; // Reset after post
                shouldCrack.value = true;
            }, 60000); // 60 seconds
        }
    } else {
        if (stageOneTimeout) {
            clearTimeout(stageOneTimeout);
            stageOneTimeout = null;
        }
    }

    // 🌟 Stage Two
    if (love.value > 95 && temperature.value > 95) {
        if (!stageTwoTimeout) {
            stageTwoTimeout = setTimeout(() => {
                axios.post('/stage-two', {});
                stageTwoTimeout = null;
                shouldHatch.value = true;
            }, 60000);
        }
    } else {
        if (stageTwoTimeout) {
            clearTimeout(stageTwoTimeout);
            stageTwoTimeout = null;
        }
    }

    // 💀 Egg Dead
    if (love.value === 0 || temperature.value === 0) {
        if (!deadTimeout) {
            deadTimeout = setTimeout(() => {
                axios.post('/egg-dead', {});
                deadTimeout = null;
                shouldBeDeath.value = true;
            }, 500);
        }
    } else {
        if (deadTimeout) {
            clearTimeout(deadTimeout);
            deadTimeout = null;
        }
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

const immediateLoveIncrease = async () => {
    const response = await axios.post('/click-increase-update-love', {});
    love.value = response.data.love;
};

const immediateTempIncrease = async () => {
    const response = await axios.post('/click-increase-update-temperature', {});
    temperature.value = response.data.temperature;
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

    containerRef.value.addEventListener('mousemove', (e: MouseEvent) => {
        const spongeEl = spongeRef as HTMLElement;

        const spongeWidth = spongeEl.offsetWidth;
        const spongeHeight = spongeEl.offsetHeight;

        // Plaats de spons gecentreerd onder de cursor
        const mouseX = e.clientX - spongeWidth / 2;
        const mouseY = e.clientY - spongeHeight / 2;

        const futureRect = {
            x: mouseX,
            y: mouseY,
            width: spongeWidth,
            height: spongeHeight
        };

        // Controleer of de spons binnen de container blijft
        const isInsideContainer = !(
            futureRect.x > rectOfContainer.x + rectOfContainer.width ||
            futureRect.x + futureRect.width < rectOfContainer.x ||
            futureRect.y > rectOfContainer.y + rectOfContainer.height ||
            futureRect.y + futureRect.height < rectOfContainer.y
        );

        if (isInsideContainer) {
            spongeEl.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        }

        // Detecteer overlapping met vuil
        const followerRect = spongeEl.getBoundingClientRect();
        document.querySelectorAll('.dirt').forEach((dirtEl: Element) => {
            const dirtRect = dirtEl.getBoundingClientRect();

            if (isRectOverlap(followerRect, dirtRect) && !dirtEl.classList.contains('clickable')) {
                dirtEl.classList.add('clickable');

                dirtEl.addEventListener('click', () => {
                    ae.playAudioFromUrl("audio/scrub.mp3", 0.1);
                    dirtEl.remove();
                    immediateLoveIncrease();
                },
                    { once: true });
            }
        });
    });

    // Hulpfunctie om rechthoekoverlap te detecteren
    function isRectOverlap(rect1: DOMRect, rect2: DOMRect): boolean {
        return !(
            rect1.x + rect1.width <= rect2.x ||
            rect2.x + rect2.width <= rect1.x ||
            rect1.y + rect1.height <= rect2.y ||
            rect2.y + rect2.height <= rect1.y
        );
    }

}

const sleeping = () => {
    for (let i = 0; i < 5; i++) {
        immediateTempIncrease();
        immediateLoveIncrease();
    }
};

onMounted(() => {
    const loveInterval = setInterval(() => {
        if (!shouldHatch.value) {
            decrementLove();
        }
    }, 10000);
    const temperatureInterval = setInterval(() => {
        if (!shouldHatch.value) {
            decrementTemperature();
        }
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
        <Egg :should-be-death="shouldBeDeath" :should-hatch="shouldHatch" :should-crack="shouldCrack" :temperature="temperature" @eggClicked="updateLove"
            @poopDamage="decrementLove"/>
    </div>
    <TabBar @sponge-spawned="setCheckContainerBounds" @tempClicked="updateTemp" @sleeping="sleeping"/>
</template>
