<script setup lang="ts">

import Egg from "@/egg-app-ui/Egg.vue";

const props = defineProps({
    data: {
        type: Object,
    },
});
</script>

<template>
    <div class="h-full w-full flex items-center justify-center">
        <Egg :data="data"/>
    </div>
</template>
