<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import Header from '@/egg-app-ui/header.vue';
import TabBar from '@/egg-app-ui/tab-bar.vue';
import PlaceholderPattern from '../components/PlaceholderPattern.vue';
import EggLayout from "@/egg-app-ui/EggLayout.vue";
import { onMounted } from "vue";
import audioEngine from "@/scripts/audioEngine";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const props = defineProps({
    page_data: {
        type: Object,
    },
});

function startExperience() {
    const audioCtx = new AudioContext();
    const ae = new audioEngine(audioCtx);
    ae.playAudioFromUrl('audio/music.wav', 1, true);
    const intro = document.getElementById('intro');
    intro.style.display = 'none';
}
</script>

<template>
    <!-- Bijvoorbeeld een splash screen -->
    <div id="intro"
        class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-100 transition-opacity duration-500"
        @click="startExperience()">
        <div class="container max-w-2xl mx-auto p-6 text-center animate-fade-in">
            <h1 class="text-5xl font-extrabold text-blue-700 mb-8 tracking-tight">Regels van het Ei</h1>

            <div class="space-y-4 text-lg text-gray-800 leading-relaxed">
                <p>🥚 <strong>Kraken:</strong> Temp & liefde boven de <strong>50°C</strong> voor 1 minuut.</p>
                <p>🐣 <strong>Uitkomen:</strong> Temp & liefde boven de <strong>95°C</strong> voor 1 minuut.</p>
                <p>💔 <strong>Overlijden:</strong> Eén van de waardes op <strong>0°C</strong> voor 30 seconden.</p>
            </div>
        </div>

        <div class="mt-10 animate-bounce">
            <button
                class="bg-blue-600 text-white text-xl font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                Klik om te starten
            </button>
        </div>
    </div>


    <Head title="Dashboard" />
    <EggLayout :data="page_data" />
</template>
