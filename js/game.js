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
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.font = "18px Comic Sans MS";
  ctx.fillText("👶", player.x + 12, player.y + 32);

  // Coins
  ctx.fillStyle = "#ffd700";
  coins.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
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
