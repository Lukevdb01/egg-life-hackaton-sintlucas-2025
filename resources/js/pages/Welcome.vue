<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Welcome">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <div class="background-container">
    </div>

    <h1 class="game-title font-bold">The Egg Life🐣</h1>

    <div class="flex items-center justify-center w-full">
        <a href="/dashboard" class="play-button">Play</a>
    </div>

    <div class="sliding-image-container">
        <img src="images/player.png" alt="Sliding Image" class="sliding-image">
    </div>

</template>

<style lang="css" scoped>
body {
    margin: 0;
    overflow: hidden !important;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: unset !important;
    min-height: 100vh;
    background-color: #333 !important;
}

* {
    transition: none;
    overflow: hidden;
}

.background-container {
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 200%;
    height: 100vh;
    z-index: 1;
    background: unset;
    background-image: url('images/back.png') !important; /* Replace with your image path */
    background-repeat: repeat-x;
    background-position: 0 0;
    animation: slideBackground 30s linear infinite;
}

.game-title {
    z-index: 2 !important;
    font-size: 48px; /* Adjust size as needed */
    color: white; /* Adjust color as needed */
    margin-bottom: 30px; /* Space between title and button */
    opacity: 0; /* Start invisible */
    transform: translateY(-100px); /* Start above */
    animation: slideDownTitle 1s ease-out 0.5s forwards; /* Slide down with a delay */
    text-align: center; /* Center the title */
}

.play-button {
    z-index: 2 !important;
    padding: 15px 30px;
    font-size: 24px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    width: fit-content;
    background-color: #af4c4c;
    color: white;
    transition: background-color 0.3s ease;
    margin-bottom: 50px;
}

.play-button:hover {
    background-color: #45a049;
}

.sliding-image-container {
    z-index: 2 !important;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px; /* Keep the final bottom position */
    z-index: 10;
    animation: slideUpInitial 1s ease-out forwards, rotateIdle 2s linear infinite 1s; /* Initial slide up and rotate idle */
}

.sliding-image {
    width: 200px; /* Adjust the size as needed */
    height: auto;
    display: block;
}

@keyframes slideBackground {
    0% { background-position: 0 0; }
    100% { background-position: -100% 0; }
}

@keyframes slideDownTitle {
    0% { opacity: 0; transform: translateY(-100px); }
    100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideUpInitial {
    0% { bottom: -200px; opacity: 0; }
    100% { bottom: 50px; opacity: 1; }
}

@keyframes rotateIdle {
    0% { transform: translateX(-50%) rotate(0deg); }
    50% { transform: translateX(-50%) rotate(5deg); }
    100% { transform: translateX(-50%) rotate(0deg); }
}
</style>