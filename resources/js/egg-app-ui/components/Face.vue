<script setup lang="ts">
import { onMounted } from "vue";
const eyes = document.getElementsByClassName('inner-eye');
const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

onMounted(() => {
    // Do stuff here
    document.onmousemove = function (e) {
        Array.prototype.forEach.call(eyes, function (el) {
            const rect = el.getBoundingClientRect();
            // Middelpunt van het oog
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Afstand van cursor tot het middelpunt
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            // Max offset in px
            const maxOffset = 8;
            const offsetX = clamp(deltaX / 10, -maxOffset, maxOffset);
            const offsetY = clamp(deltaY / 10, -maxOffset, maxOffset);

            el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    };
})
</script>

<template>
    <section class="absolute flex items-end justify-center w-full h-full">
        <section class="w-2/4">
            <div class="pb-12 flex justify-center items-center flex-row gap-6">
                <figure class="eye" id="left-eye">
                    <div class="inner-eye"></div>
                </figure>
                <figure class="eye" id="right-eye">
                    <div class="inner-eye"></div>
                </figure>
            </div>
        </section>
    </section>
</template>

<style lang="css" scoped>
.eye {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: white;
    border: solid 1px black;
}

.inner-eye {
    position: absolute;
    translate: 50% 50%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: black;
}
</style>