<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
const eyesRef = ref<NodeListOf<HTMLElement>>();
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

let animationFrameId = 0;

function handleMouseMove(e: MouseEvent) {
    if (!eyesRef.value) return;

    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    animationFrameId = requestAnimationFrame(() => {
        eyesRef.value?.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            const maxOffset = 8;
            const offsetX = clamp(deltaX / 10, -maxOffset, maxOffset);
            const offsetY = clamp(deltaY / 10, -maxOffset, maxOffset);

            el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
}

onMounted(() => {
    eyesRef.value = document.querySelectorAll<HTMLElement>('.inner-eye');
    document.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    cancelAnimationFrame(animationFrameId);
});
</script>

<template>
    <section class="absolute flex items-end justify-center w-full h-full">
        <section class="w-2/4 flex flex-col items-center gap-4">
            <div class="flex pb-12 justify-center items-center flex-row gap-6">
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

#mouth {
    width: 100px;
    height: 16px;
    margin-bottom: 4rem;
    background-color: white;
    padding: 0.2rem;
}

#inner-mouth {
    width: 100%;
    height: 100%;
    background-color: black;
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