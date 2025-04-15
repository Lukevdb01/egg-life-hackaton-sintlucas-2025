<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue'
import axios from "axios";

import Face from './components/Face.vue';

const props = defineProps({
    temperature: {
        type: Number,
        default: 0,
    },
    shouldCrack: {
        type: Boolean,
        default: false,
    },
    shouldHatch: {
        type: Boolean,
        default: false,
    },
    shouldBeDeath: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['updateLove', 'eggClicked', 'poopDamage']);

const temperature = ref(props.temperature)
const color1 = ref('rgba(186, 45, 45, 1)')
const color2 = ref('rgba(188, 122, 67, 1)')

const eggClicked = () => {
        emit('eggClicked');
};

const addDirt = (c) => {
    const offsetX = Math.random() * 300;
    const offsetY = Math.random() * 300;

    const dirtElement = document.createElement('img');
    dirtElement.classList += 'dirt';
    dirtElement.src = 'images/dirt.webp';
    dirtElement.style.translate += `${offsetX}% ${offsetY}%`;

    c.appendChild(dirtElement);

    setTimeout(() => {
        emit('poopDamage');
    }, 3000);
}

onMounted(() => {
    const eggContainer = document.getElementById('egg-container');
    addDirt(eggContainer);

    const poopInterval = setInterval(() => {
        if(!props.shouldHatch) {
            addDirt(eggContainer);
        }
    }, 10000);

    window.addEventListener('keyup', (e) => {
        if (e.key === "Escape") {
            const sponge = document.getElementById('sponge-actor');
            if (sponge) {
                sponge.remove();
            }
        }
    });

    onBeforeUnmount(() => {
        clearInterval(poopInterval);
    });
});
</script>

<template>
    <section v-if="shouldBeDeath" class="absolute w-full flex items-center justify-center z-50">
        <h1 class="text-5xl py-8 px-16 rounded-lg bg-red-500">You lost!</h1>
    </section>
    <section class="relative" id="egg-container" @click="eggClicked">
        <Face />
        <svg v-if="!shouldCrack" xmlns="http://www.w3.org/2000/svg" class="w-[287px] h-auto egg" viewBox="0 0 287 287" @click="eggClicked">
            <defs>
                <linearGradient id="egg-gradient" x1="0%" y1="0%" x2="0%" :y2="temperature + '%'">
                    <stop :offset="'0%'" :style="{ stopColor: color1, stopOpacity: 1 }" />
                    <stop :offset="'100%'" :style="{ stopColor: color2, stopOpacity: 1 }" />
                </linearGradient>
            </defs>
            <path
                d="M244.887 177.237C244.887 256.484 199.553 287 143.5 287C87.4471 287 42.1129 256.484 42.1129 177.237C42.1129 97.99 87.4471 0 143.5 0C199.553 0 244.887 97.9314 244.887 177.237Z"
                :fill="'url(#egg-gradient)'" stroke="#000" />
        </svg>
        <svg v-else-if="shouldCrack" xmlns="http://www.w3.org/2000/svg" class="z-[1] w-[287px] h-auto egg" viewBox="0 0 287 287" @click="eggClicked">
            <defs>
                <linearGradient id="egg-gradient" x1="0%" y1="0%" x2="0%" :y2="temperature + '%'">
                    <stop :offset="'0%'" :style="{ stopColor: color1, stopOpacity: 1 }" />
                    <stop :offset="'100%'" :style="{ stopColor: color2, stopOpacity: 1 }" />
                </linearGradient>
            </defs>
            <path d="M244.887 177.237C244.887 256.484 199.553 287 143.5 287C87.4471 287 42.1129 256.484 42.1129 177.237C42.1129 150 60 120 80 110C100 100 110 130 130 120C150 110 160 140 180 130C200 120 210 90 230 100C240 110 244.887 150 244.887 177.237Z" :fill="color2" stroke="#000"/>
            <path :style="shouldHatch ? 'display: none;' : 'display: block;'" d="M42.1129 177.237C42.1129 97.99 87.4471 0 143.5 0C199.553 0 244.887 97.9314 244.887 177.237C240 170 230 160 215 165C200 170 190 180 175 175C160 170 150 160 135 165C120 170 110 180 95 175C80 170 60 160 42.1129 177.237Z" :fill="'url(#egg-gradient)'" stroke="#000"/>
        </svg>
        <img v-if="shouldHatch" src="images/kuiken.svg" class="absolute top-0">
    </section>
</template>