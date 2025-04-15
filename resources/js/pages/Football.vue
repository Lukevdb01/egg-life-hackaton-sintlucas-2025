<template>
    <div class="game-container">
        <!-- Background SVG -->
        <svg viewBox="0 0 400 600" preserveAspectRatio="none" class="arena-background">
            <rect width="100%" height="100%" fill="#e0e0e0" />
            <line x1="200" y1="0" x2="200" y2="600" stroke="white" stroke-width="2" stroke-dasharray="10 10" />
        </svg>

        <!-- Canvas -->
        <canvas ref="canvas" class="game-canvas" width="400" height="600"></canvas>

        <!-- Bottom Tab -->
        <div class="bottom-tab">
            <Link href="/dashboard" class="tab-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 12L12 3l9 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 21V9h6v12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Home</span>
            </Link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Link } from '@inertiajs/vue3'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D
let playerY = 260, compY = 260
let ballX = 200, ballY = 300, ballVX = 4, ballVY = 4
const paddleH = 80, paddleW = 8, r = 8
let score = [0, 0]
const keys: Record<string, boolean> = {}

onMounted(() => {
    if (!canvas.value) return
    ctx = canvas.value.getContext('2d')!

    window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true)
    window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false)

    const loop = () => {
        ctx.clearRect(0, 0, 400, 600)

        // Player movement with W/S
        if (keys['w']) playerY = Math.max(0, playerY - 8)
        if (keys['s']) playerY = Math.min(520, playerY + 8)

        // Computer AI
        compY += ballY > compY + paddleH / 2 ? 2 : -2
        compY = Math.max(0, Math.min(520, compY))

        // Ball movement
        ballX += ballVX
        ballY += ballVY
        if (ballY < r || ballY > 600 - r) ballVY *= -1

        // Paddle collisions
        if (ballX - r < paddleW && ballY > playerY && ballY < playerY + paddleH) ballVX *= -1
        if (ballX + r > 400 - paddleW && ballY > compY && ballY < compY + paddleH) ballVX *= -1

        // Scoring
        if (ballX < 0) score[1]++, reset()
        if (ballX > 400) score[0]++, reset()

        // Drawing
        drawRect(0, playerY, paddleW, paddleH, 'blue')
        drawRect(392, compY, paddleW, paddleH, 'red')
        drawBall(ballX, ballY, r)
        drawScore()

        requestAnimationFrame(loop)
    }

    loop()
})

function reset() {
    ballX = 200
    ballY = 300
    ballVX *= -1
    ballVY = (Math.random() - 0.5) * 8
}

function drawRect(x: number, y: number, w: number, h: number, color: string) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
}

function drawBall(x: number, y: number, r: number) {
    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
}

function drawScore() {
    ctx.fillStyle = 'black'
    ctx.font = 'bold 24px Arial'
    ctx.fillText(score[0].toString(), 50, 40)
    ctx.fillText(score[1].toString(), 330, 40)
}
</script>

<style scoped>
.game-container {
    max-width: 420px;
    margin: 40px auto;
    position: relative;
    aspect-ratio: 2 / 3;
    background: #f0f0f0;
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
    overflow: hidden;
}

.arena-background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.game-canvas {
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    z-index: 1;
}

.bottom-tab {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.tab-button {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
}

.icon {
    width: 24px;
    height: 24px;
    margin-right: 6px;
}
</style>
