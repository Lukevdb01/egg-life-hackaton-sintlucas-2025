<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import Header from '@/egg-app-ui/header.vue';
import TabBar from '@/egg-app-ui/tab-bar.vue';
import PlaceholderPattern from '../components/PlaceholderPattern.vue';
import EggLayout from "@/egg-app-ui/EggLayout.vue";
import {onMounted} from "vue";


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

</script>

<template>
    <Head title="Dashboard" />
    <Header :data="page_data"/>
    <EggLayout :data="page_data"/>
    <TabBar/>
</template>
