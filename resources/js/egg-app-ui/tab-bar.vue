<script setup lang="ts">
const spawn_sponge = () => {
    const element = document.createElement('div');
    element.innerHTML += '<img src="images/sponge-actor.png" id="sponge-actor"/>';

    const container = document.getElementById('container');
    container?.appendChild(element);

    const rect = container?.getBoundingClientRect();

    const follower = document.getElementById('sponge-actor');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        follower.style.transform = `translate(${x}px, ${y}px)`;
    });
}
</script>

<template>
    <div class="h-[110px] w-full bg-white flex items-center justify-between px-4">
        <button><img src="images/temperature-increase.svg"></button>
        <button @click="spawn_sponge()"><img id="icon" src="images/sponge.png"></button>
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