<script setup>
const emit = defineEmits(['updateTemp', 'tempClicked']);

const eggClicked = () => {
    emit('tempClicked');
};
</script>

<template>
    <div class="h-[110px] w-full bg-white flex items-center justify-start px-4">
        <button @click="eggClicked"><img src="images/temperature-increase.svg"></button>
    </div>
</template>
