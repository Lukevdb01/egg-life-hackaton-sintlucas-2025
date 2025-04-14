<script setup lang="ts">
import { ref } from 'vue'
import axios from "axios";

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
})

const temperature = ref(props.data.egg.temperature)
const color1 = ref('rgba(186, 45, 45, 1)')
const color2 = ref('rgba(188, 122, 67, 1)')

const eggClicked = () => {
    alert('Egg clicked!')
}

</script>

<template>
    <section>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-[287px] h-auto" viewBox="0 0 287 287" @click="eggClicked">
        <defs>
            <linearGradient id="egg-gradient" x1="0%" y1="0%" x2="0%" :y2="temperature + '%'">
                <stop :offset="'0%'" :style="{ stopColor: color1, stopOpacity: 1 }" />
                <stop :offset="'100%'" :style="{ stopColor: color2, stopOpacity: 1 }" />
            </linearGradient>
        </defs>
        <path
            d="M244.887 177.237C244.887 256.484 199.553 287 143.5 287C87.4471 287 42.1129 256.484 42.1129 177.237C42.1129 97.99 87.4471 0 143.5 0C199.553 0 244.887 97.9314 244.887 177.237Z"
            :fill="'url(#egg-gradient)'" />
    </svg>
    </section>
</template>

