// set up canvas and context variables
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
document.body.appendChild(canvas);

// set up game variables
let leftPaddleY = canvas.height / 2 - 50;
let rightPaddleY = canvas.height / 2 - 50;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let leftScore = 0;
let rightScore = 0;

// draw game board and paddles
function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, leftPaddleY, 20, 100);
  ctx.fillRect(canvas.width - 20, rightPaddleY, 20, 100);
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fill();
  // draw scores
  ctx.fillStyle = "#fff";
  ctx.font = "bold 24px sans-serif";
  ctx.fillText(leftScore, 100, 50);
  ctx.fillText(rightScore, canvas.width - 100, 50);
}

// move paddles
function moveLeftPaddle(event) {
  if (event.keyCode === 38 && leftPaddleY > 0) {
    leftPaddleY -= 10;
  } else if (event.keyCode === 40 && leftPaddleY < canvas.height - 100) {
    leftPaddleY += 10;
  }
}

function moveRightPaddle(event) {
  if (event.keyCode === 87 && rightPaddleY > 0) {
    rightPaddleY -= 10;
  } else if (event.keyCode === 83 && rightPaddleY < canvas.height - 100) {
    rightPaddleY += 10;
  }
}

// update ball position and check for collisions
function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // check for collisions with left paddle
  if (ballX < 30 && ballY > leftPaddleY && ballY < leftPaddleY + 100) {
    ballSpeedX = -ballSpeedX;
  }
  // check for collisions with right paddle
  if (
    ballX > canvas.width - 30 &&
    ballY > rightPaddleY &&
    ballY < rightPaddleY + 100
  ) {
    ballSpeedX = -ballSpeedX;
  }
  // check for collisions with top and bottom walls
  if (ballY < 10 || ballY > canvas.height - 10) {
    ballSpeedY = -ballSpeedY;
  }
  // check for ball going out of bounds
  if (ballX < 0 || ballX > canvas.width) {
    if (ballX < 0) {
      rightScore++;
    } else {
      leftScore++;
    }
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 5;
  }
}

// set up event listeners
document.addEventListener("keydown", moveLeftPaddle);
document.addEventListener("keydown", moveRightPaddle);

// game loop
setInterval(function () {
  draw();
  update();
}, 1000 / 60);
