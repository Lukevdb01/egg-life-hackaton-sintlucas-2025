<script setup lang="ts">
import { onMounted, ref } from 'vue';

const container = document.getElementById('container');
const toggle_lamp = ref(false);
const eyesRef = ref<NodeListOf<HTMLElement>>();
const spongeRef = ref<HTMLElement | null>(null);
const emit = defineEmits(['updateTemp', 'tempClicked', 'spongeSpawned']);

const spawn_sponge = () => {
    if (spongeRef.value) return; // voorkom dubbele sponge

    const element = document.createElement('div');
    element.innerHTML += '<img src="images/sponge-actor.png" id="sponge-actor"/>';

    container?.appendChild(element);
    spongeRef.value = document.getElementById('sponge-actor') as HTMLElement;
    emit('spongeSpawned', spongeRef.value);
    
    document.addEventListener('mousemove', (e) => {
        if (!spongeRef.value) return;

        const x = e.clientX;
        const y = e.clientY;

        spongeRef.value.style.transform = `translate(${x}px, ${y}px)`;

        document.querySelectorAll('.dirt').forEach((el, index) => {
            const followerRect = spongeRef.value?.getBoundingClientRect();
            const dirtRect = el.getBoundingClientRect();

            if (isRectOverlap(followerRect, dirtRect)) {
                setTimeout(() => {
                    el.classList.add('cleaned');
                }, 5000);
            }
        });

    });

    function isRectOverlap(rect1, rect2) {
        return !(
            rect1.x + rect1.width <= rect2.x ||  // rect1 is volledig links van rect2
            rect2.x + rect2.width <= rect1.x ||  // rect2 is volledig links van rect1
            rect1.y + rect1.height <= rect2.y || // rect1 is volledig boven rect2
            rect2.y + rect2.height <= rect1.y    // rect2 is volledig boven rect1
        );
    }
}

const tempClicked = () => {
    emit('tempClicked');
};

const lamp = () => {
    if (!toggle_lamp.value) {
        document.body.style.background = '#3A3A3A';
        toggle_lamp.value = true;
        eyesRef.value?.forEach((el) => {
            el.classList.add('close-eyes');
        });
    } else {
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
        <ol class="flex justify-center items-center gap-4">
            <img @click="tempClicked" src="images/temperature-increase.svg">
            <button @click="lamp" class="text-black">lamp</button>
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
