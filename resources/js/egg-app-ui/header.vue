<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'

import Temperature from './components/Temperature.vue';

const props = defineProps({
    love: {
        type: Number,
        default: 50,
    },
    temperature: {
        type: Number,
        default: 0,
    },
    data:{
        type: Array,
    }
});


const isVisible = ref(true);
computed(() => `${100 - props.love}%`);
const color1 = ref('rgba(79, 78, 78, 1)') // ending color of the gradient
const color2 = ref('rgba(186, 45, 45, 1)') // starting color of the gradient

onMounted(() => {
    setTimeout(() => {
        isVisible.value = false;
    }, 15000); // 15 seconds
});
</script>

<template>
    <header class="bg-white h-[88px] flex flex-row items-end w-full">
        <ol class="flex flex-row gap-2 items-center px-4 justify-end w-full h-full">
            <Temperature :temperature="temperature"/>
            <svg width="49" height="43" viewBox="0 0 49 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop :offset="(100 - love) + '%'" :style="{ stopColor: color1, stopOpacity: 1 }" />
                        <stop :offset="(100 - love) + '%'" :style="{ stopColor: color2, stopOpacity: 1 }" />
                    </linearGradient>


                </defs>
                <path
                    d="M3.80559 22.2431L24.5 42.9375L45.1945 22.2431C47.6311 19.8064 49 16.5016 49 13.0556V12.4728C49 5.61879 43.4437 0.0625 36.5898 0.0625C32.8196 0.0625 29.254 1.77624 26.8989 4.72013L24.5 7.71875L22.1011 4.72013C19.746 1.77624 16.1804 0.0625 12.4103 0.0625C5.55629 0.0625 0 5.61879 0 12.4728V13.0556C0 16.5016 1.36891 19.8064 3.80559 22.2431Z"
                    :fill="'url(#gradient-fill)'" />
            </svg>
            <p class="text-black font-bold">% {{ love }}</p>
        </ol>
        <div class="absolute w-full flex items-center justify-center left-0 right-0 top-10 text-black">
            <section class="px-5 py-3 bg-white border-red-500 border-4 rounded-lg border-solid">
                <p>{{ data.user.name }}'s Hatching Lab🐣</p>
            </section>
        </div>
    </header>
</template>
