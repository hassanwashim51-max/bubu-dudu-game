  #startBtn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 30px;
  font-size: 20px;
  background: pink;
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
}
// ===== LOAD IMAGES =====
const bubuImg = new Image();
bubuImg.src = "assets/images/bubu.png";

const duduImg = new Image();
duduImg.src = "assets/images/dudu.png";

const awanshaImg = new Image();
awanshaImg.src = "assets/images/awansha.png";

const coinImg = new Image();
coinImg.src = "assets/images/coin.png";

const balloonImg = new Image();
balloonImg.src = "assets/images/balloon.png";
// ===== CANVAS SETUP =====
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ===== GAME VARIABLES =====
let gameRunning = false;
let score = 0;
let level = 1;
let life = 3;

// ===== PLAYER (Bubu–Dudu) =====
const player = {
  x: 160,
  y: 430,
  width: 50,
  height: 50,
  speed: 6
};

// ===== GAME OBJECTS =====
let coins = [];
let obstacles = [];

// ===== START GAME =====
function startGame() {
  score = 0;
  level = 1;
  life = 3;
  coins = [];
  obstacles = [];
  gameRunning = true;
  updateUI();
  gameLoop();
}

// ===== UI UPDATE =====
function updateUI() {
  document.getElementById("scoreText").innerText = "Score: " + score;
  document.getElementById("levelText").innerText = "Level: " + level;
  document.getElementById("lifeText").innerText = "❤️ Life: " + life;
}

// ===== SPAWN COINS =====
function spawnCoin() {
  coins.push({
    x: Math.random() * 320,
    y: -20,
    radius: 12,
    speed: 2 + level
  });
}

// ===== SPAWN OBSTACLES =====
function spawnObstacle() {
  obstacles.push({
    x: Math.random() * 320,
    y: -30,
    width: 30,
    height: 30,
    speed: 2 + level
  });
}

// ===== COLLISION CHECK =====
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// ===== UPDATE GAME =====
function updateGame() {
  // Coins spawn
  if (Math.random() < 0.04) spawnCoin();

  // Obstacles spawn (level 2+)
  if (level >= 2 && Math.random() < 0.02) spawnObstacle();

  // Move coins
  coins.forEach(c => c.y += c.speed);
  obstacles.forEach(o => o.y += o.speed);

  // Coin collision
  for (let i = coins.length - 1; i >= 0; i--) {
    let c = coins[i];
    if (c.y > canvas.height) coins.splice(i, 1);

    if (
      c.x > player.x &&
      c.x < player.x + player.width &&
      c.y > player.y &&
      c.y < player.y + player.height
    ) {
      coins.splice(i, 1);
      score++;

      // LEVEL UP
      if (score % 10 === 0) level++;
      updateUI();
    }
  }

  // Obstacle collision
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let o = obstacles[i];
    if (o.y > canvas.height) obstacles.splice(i, 1);

    if (isColliding(player, o)) {
      obstacles.splice(i, 1);
      life--;
      updateUI();

      if (life <= 0) gameOver();
    }
  }
}

// ===== DRAW GAME =====
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = "#ff8fc4";
  ctx.drawImage(bubuImg, player.x, player.y, 50, 50);
  ctx.drawImage(duduImg, player.x + 30, player.y, 50, 50);
  ctx.font = "18px Comic Sans MS";
  ctx.fillText("👶", player.x + 12, player.y + 32);

  // Coins
  ctx.fillStyle = "#ffd700";
  coins.forEach(c => {
  ctx.beginPath();
  ctx.drawImage(bubuImg, player.x, player.y, 50, 50);
  ctx.drawImage(duduImg, player.x + 30, player.y, 50, 50);
    
  ctx.fill();
  });

  // Obstacles
  ctx.fillStyle = "#ff5252";
  obstacles.forEach(o => {
    ctx.fillRect(o.x, o.y, o.width, o.height);
  });
}

// ===== GAME LOOP =====
function gameLoop() {
  if (!gameRunning) return;
  updateGame();
  drawGame();
  requestAnimationFrame(gameLoop);
}

// ===== GAME OVER =====
function gameOver() {
  gameRunning = false;
  alert("Game Over 😢\nYour Score: " + score);
}

// ===== TOUCH CONTROL (MOBILE) =====
canvas.addEventListener("touchmove", e => {
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  player.x = touch.clientX - rect.left - player.width / 2;
});

// ===== MOUSE CONTROL (PC) =====
canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  player.x = e.clientX - rect.left - player.width / 2;
});
 let balloons = [];
 setInterval(spawnBalloon, 2000); // har 2 second {
  balloons.push({
    x: Math.random() * 320,
    y: -30,
    speed: 2
  });
}
balloons.forEach(b => {
  b.y += b.speed;
  ctx.drawImage(balloonImg, b.x, b.y, 30, 30);
});
if (score > 0 && score % 10 === 0 && !awanshaShown) {
  awanshaShown = true;
  navigator.vibrate(100);
}
}
bubuImg.src = "images/bubu.png";
duduImg.src = "images/dudu.png";
coinImg.src = "images/coin.png";
const bgMusic = new Audio("sounds/music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.4;
coinSound.src = "sounds/collect.mp3";
levelSound.src = "sounds/levelup.mp3";
const popSound = new Audio("sounds/pop.mp3");
