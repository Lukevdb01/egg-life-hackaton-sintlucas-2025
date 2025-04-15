const canvas = document.getElementById('soccerCanvas');
const ctx = canvas.getContext('2d');
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');

// Set canvas width for mobile
canvas.width = 400;
canvas.height = 600;

// Game variables
const paddleHeight = 80; // Smaller paddles for mobile
const paddleWidth = 8; // Smaller paddle width
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let computerPaddleY = (canvas.height - paddleHeight) / 2;
const ballRadius = 8; // Smaller ball
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4; // Slightly slower speed for mobile
let ballSpeedY = 4;
const playerPaddleSpeed = 10; // Adjust paddle speed if needed
const computerPaddleSpeed = 2; // Adjust computer speed if needed
let playerScore = 0;
let computerScore = 0;

// Profile image variables
const playerProfileImage = new Image();
playerProfileImage.src = 'player.png'; // Replace with your image path
const computerProfileImage = new Image();
computerProfileImage.src = 'evil.png'; // Replace with your image path
const profileImageSize = 40; // Bigger profile image size for mobile
let playerProfileLoaded = false;
let computerProfileLoaded = false;
let upButtonPressed = false;
let downButtonPressed = false;

playerProfileImage.onload = () => {
    playerProfileLoaded = true;
};

computerProfileImage.onload = () => {
    computerProfileLoaded = true;
};

// Event listeners for UI buttons
upButton.addEventListener('touchstart', () => {
    upButtonPressed = true;
});
upButton.addEventListener('touchend', () => {
    upButtonPressed = false;
});
upButton.addEventListener('mousedown', () => {
    upButtonPressed = true;
});
upButton.addEventListener('mouseup', () => {
    upButtonPressed = false;
});
upButton.addEventListener('mouseout', () => {
    upButtonPressed = false;
});

downButton.addEventListener('touchstart', () => {
    downButtonPressed = true;
});
downButton.addEventListener('touchend', () => {
    downButtonPressed = false;
});
downButton.addEventListener('mousedown', () => {
    downButtonPressed = true;
});
downButton.addEventListener('mouseup', () => {
    downButtonPressed = false;
});
downButton.addEventListener('mouseout', () => {
    downButtonPressed = false;
});

// Keyboard input for player (still active)
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Function to draw a paddle
function drawPaddle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// Function to draw the ball (now just a circle)
function drawBall(x, y, radius) {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

// Function to draw the score and profile pictures
function drawScore() {
    ctx.font = 'bold 24px Arial'; // Bigger font for score
    ctx.fillStyle = 'black';

    const scoreY = 40; // Adjust score Y position
    const playerTextX = profileImageSize + 15; // Adjust text X position
    const computerTextX = canvas.width - 60; // Adjust text X position
    const playerImageX = 10;
    const computerImageX = canvas.width - profileImageSize - 10;
    const imageY = 10;

    // Draw player profile and score
    if (playerProfileLoaded) {
        ctx.drawImage(playerProfileImage, playerImageX, imageY, profileImageSize, profileImageSize);
        ctx.fillText(playerScore, playerTextX, scoreY);
    } else {
        // Optional: Placeholder for player profile
        ctx.fillStyle = 'gray';
        ctx.fillRect(playerImageX, imageY, profileImageSize, profileImageSize);
        ctx.fillText(playerScore, playerTextX, scoreY);
    }

    // Draw computer profile and score
    if (computerProfileLoaded) {
        ctx.drawImage(computerProfileImage, computerImageX, imageY, profileImageSize, profileImageSize);
        ctx.fillText(computerScore, computerTextX, scoreY);
    } else {
        // Optional: Placeholder for computer profile
        ctx.fillStyle = 'gray';
        ctx.fillRect(computerImageX, imageY, profileImageSize, profileImageSize);
        ctx.fillText(computerScore, computerTextX, scoreY);
    }
}

// Function to update game elements
function update() {
    // Move player paddle based on UI buttons
    if (upButtonPressed && playerPaddleY > 0) {
        playerPaddleY -= playerPaddleSpeed;
    }
    if (downButtonPressed && playerPaddleY < canvas.height - paddleHeight) {
        playerPaddleY += playerPaddleSpeed;
    }

    // Move player paddle based on keyboard (still active)
    if (keys['w'] && playerPaddleY > 0) {
        playerPaddleY -= playerPaddleSpeed;
    }
    if (keys['s'] && playerPaddleY < canvas.height - paddleHeight) {
        playerPaddleY += playerPaddleSpeed;
    }

    // Computer paddle AI (very basic)
    if (ballY > computerPaddleY + paddleHeight / 2 && computerPaddleY < canvas.height - paddleHeight) {
        computerPaddleY += computerPaddleSpeed;
    } else if (ballY < computerPaddleY + paddleHeight / 2 && computerPaddleY > 0) {
        computerPaddleY -= computerPaddleSpeed;
    }

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (
        ballX - ballRadius < paddleWidth &&
        ballY > playerPaddleY &&
        ballY < playerPaddleY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }
    if (
        ballX + ballRadius > canvas.width - paddleWidth &&
        ballY > computerPaddleY &&
        ballY < computerPaddleY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball goes out of bounds (scoring)
    if (ballX - ballRadius < 0) {
        computerScore++;
        resetBall();
    } else if (ballX + ballRadius > canvas.width) {
        playerScore++;
        resetBall();
    }
}

// Function to reset the ball to the center
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Reverse direction after scoring
    ballSpeedY = (Math.random() - 0.5) * 8; // Adjust random vertical speed
}

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game elements
    drawPaddle(0, playerPaddleY, paddleWidth, paddleHeight, 'blue'); // Player is blue
    drawPaddle(canvas.width - paddleWidth, computerPaddleY, paddleWidth, paddleHeight, 'red'); // Computer is red
    drawBall(ballX, ballY, ballRadius); // Now draws a circle
    drawScore();

    // Update game state
    update();

    // Call the game loop again in the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();