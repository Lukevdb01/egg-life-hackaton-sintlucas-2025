<script setup lang="ts">
import { onMounted, ref } from 'vue';

const container = document.getElementById('container');
const toggle_lamp = ref(false);
const eyesRef = ref<NodeListOf<HTMLElement>>();
const spongeRef = ref<HTMLElement | null>(null);
const emit = defineEmits(['updateTemp', 'tempClicked', 'spongeSpawned']);
import audioEngine from "@/scripts/audioEngine";

const audioCtx = new AudioContext();
const ae = new audioEngine(audioCtx);

const spawn_sponge = () => {
    if(spongeRef.value) {
        spongeRef.value.remove();
    }

    const element = document.createElement('div');
    element.innerHTML += '<img src="images/sponge-actor.png" id="sponge-actor"/>';

    container?.appendChild(element);
    spongeRef.value = document.getElementById('sponge-actor') as HTMLElement;
    spongeRef.value.style.transform = `translate(500%, 500%)`;

    emit('spongeSpawned', spongeRef.value);
}

const tempClicked = () => {
    emit('tempClicked');
};

const lamp = () => {
    if (!toggle_lamp.value) {
        ae.playAudioFromUrl("/audio/lamp_click.mp3");
        document.body.style.background = '#3A3A3A';
        toggle_lamp.value = true;
        eyesRef.value?.forEach((el) => {
            el.classList.add('close-eyes');
        });
    } else {
        ae.playAudioFromUrl("/audio/lamp_click.mp3");
        document.body.style.background = "#ebebeb";
        toggle_lamp.value = false;
        eyesRef.value?.forEach((el) => {
            el.classList.remove('close-eyes');
        });
    }
}

onMounted(() => {
    eyesRef.value = document.querySelectorAll<HTMLElement>('.eye');
});
</script>

<template>
    <div class="h-[110px] rounded-t-[2vw] w-full bg-white flex items-center justify-between px-4">
        <ol class="flex justify-center items-center">
            <img @click="tempClicked" src="images/temperature-increase.svg">
            <img @click="lamp" :src="toggle_lamp ? 'images/lamp_off.svg' : 'images/lamp_on.svg'" class="p-3 text-black">
        </ol>
        <img @click="spawn_sponge()" id="icon" src="images/sponge.png">
    </div>
</template>

<style lang="css" scoped>
img {
    width: 74px;
    height: auto;
}

img #icon {
    padding: 0.5rem;
}
</style>
