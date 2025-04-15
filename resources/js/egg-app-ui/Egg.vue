<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from "axios";

import Face from './components/Face.vue';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
})

const temperature = ref(props.data.egg.temperature)
const color1 = ref('rgba(186, 45, 45, 1)')
const color2 = ref('rgba(188, 122, 67, 1)')
const shouldCrack = ref(false);

setTimeout(() => {
    shouldCrack.value = true;
}, 5000);

const eggClicked = () => {
    alert('Egg clicked!')
}

const addDirt = (c) => {
    const offsetX = Math.random() * 300;
    const offsetY = Math.random() * 300;

    const dirtElement = document.createElement('img');
    dirtElement.classList += 'dirt';
    dirtElement.src = 'images/dirt.webp';
    dirtElement.style.translate += `${offsetX}% ${offsetY}%`;

    c.appendChild(dirtElement);
}

onMounted(() => {
    const eggContainer = document.getElementById('egg-container');
    addDirt(eggContainer);

    window.addEventListener('keyup', (e) => {
        if(e.key === "Escape") {
            const sponge = document.getElementById('sponge-actor');
            if(sponge) {
                sponge.remove();
            }
        }
    });
});
</script>

<template>
    <section class="relative" id="egg-container">
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
        <svg v-else-if="shouldCrack" xmlns="http://www.w3.org/2000/svg" class="w-[287px] h-auto egg" viewBox="0 0 287 287" @click="eggClicked">
            <defs>
                <linearGradient id="egg-gradient" x1="0%" y1="0%" x2="0%" :y2="temperature + '%'">
                    <stop :offset="'0%'" :style="{ stopColor: color1, stopOpacity: 1 }" />
                    <stop :offset="'100%'" :style="{ stopColor: color2, stopOpacity: 1 }" />
                </linearGradient>
            </defs>
            <path d="M244.887 177.237C244.887 256.484 199.553 287 143.5 287C87.4471 287 42.1129 256.484 42.1129 177.237C42.1129 150 60 120 80 110C100 100 110 130 130 120C150 110 160 140 180 130C200 120 210 90 230 100C240 110 244.887 150 244.887 177.237Z" :fill="color2" stroke="#000"/>
            <path d="M42.1129 177.237C42.1129 97.99 87.4471 0 143.5 0C199.553 0 244.887 97.9314 244.887 177.237C240 170 230 160 215 165C200 170 190 180 175 175C160 170 150 160 135 165C120 170 110 180 95 175C80 170 60 160 42.1129 177.237Z" :fill="'url(#egg-gradient)'" stroke="#000"/>  
        </svg>
    </section>
</template>
