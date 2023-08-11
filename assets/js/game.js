const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
let isJumping = false;
let score = 0;
const scoreDisplay = document.getElementById('score');

//StartMenu
function startGame() {
    moveObstacle();
}

// Event listener for the start game button
document.getElementById('start-game-button').addEventListener('click', () => {
    document.getElementById('start-game-panel').style.display = 'none';
    document.getElementById('score').style.opacity = '1'; // Make the score visible
    startGame();
});


// Set the initial position for the dino
dino.style.bottom = '0px';
// Set the initial position for the obstacle
obstacle.style.right = '0px';
// Handle the jump event
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

function jump() {
    let jumpHeight = 0;
    isJumping = true;

    // Upward movement
    const jumpUp = setInterval(() => {
        if (jumpHeight < 100) { // Target jump height is now 100 pixels
            jumpHeight += 4; // Move 4 pixels upward in each frame
            dino.style.bottom = jumpHeight + 'px';
        } else {
            clearInterval(jumpUp);
            // Downward movement
            const jumpDown = setInterval(() => {
                if (jumpHeight > 0) {
                    jumpHeight -= 4; // Move 4 pixels downward in each frame
                    dino.style.bottom = jumpHeight + 'px';
                } else {
                    clearInterval(jumpDown);
                    isJumping = false;
                }
            }, 10); // 10 ms interval for a gradual descent
        }
    }, 10); // 10 ms interval for a gradual ascent
}


function moveObstacle() {
    let obstaclePos = 0;

    const obstacleInterval = setInterval(() => {
        obstaclePos += 10;
        obstacle.style.right = obstaclePos + 'px';

        if (obstaclePos > 800) {
            obstaclePos = 0;
            if (parseInt(dino.style.bottom) > 10) {
                // Increment the score if the dino is above the obstacle
                score++;
                scoreDisplay.textContent = 'Score: ' + score;
            }
        }

        // Check for collision
        if (
            obstaclePos > 740 &&
            obstaclePos < 760 &&
            parseInt(dino.style.bottom) <= 10
        ) {
            clearInterval(obstacleInterval);
            gameOver();
        }
    }, 20);
}

function gameOver() {
    document.getElementById('game-over-panel').style.display = 'flex';
    document.getElementById('replay-button').addEventListener('click', () => {
        location.reload();
    });
}
