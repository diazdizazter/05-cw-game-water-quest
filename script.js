const WIN_SCORE = 20;
const TIME_LIMIT = 30;
const BAD_DROP_CHANCE = 0.3;
const winMessages = [
  'Amazing work! Clean water wins today.',
  'You did it! Your region is thriving.',
  'Victory! Every drop counts.'
];
const loseMessages = [
  'So close. Try again and protect more clean water!',
  'Keep going! You can still save this region.',
  'Time up! Give it another shot.'
];

let currentCans = 0;
let timeLeft = TIME_LIMIT;
let gameActive = false;
let spawnInterval;
let timerInterval;

function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    grid.appendChild(cell);
  }
}

createGrid();

function updateStats() {
  document.getElementById('current-cans').textContent = currentCans;
  document.getElementById('timer').textContent = timeLeft;
}

function setMessage(text, type = '') {
  const message = document.getElementById('achievements');
  message.className = `achievement ${type}`.trim();
  message.textContent = text;
}

function spawnTarget() {
  if (!gameActive) return;
  const cells = document.querySelectorAll('.grid-cell');

  cells.forEach(cell => (cell.innerHTML = ''));
  const targetType = Math.random() < BAD_DROP_CHANCE ? 'bad' : 'good';
  const randomCell = cells[Math.floor(Math.random() * cells.length)];
  const ariaLabel = targetType === 'good' ? 'Clean water can' : 'Dirty water drop';

  randomCell.innerHTML = `
    <div class="target ${targetType}" data-type="${targetType}" role="button" aria-label="${ariaLabel}" tabindex="0">
      <div class="water-can-wrapper">
        <div class="water-can"></div>
      </div>
    </div>
  `;
}

function celebrateWin() {
  const celebration = document.getElementById('celebration');
  celebration.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const dot = document.createElement('span');
    dot.className = 'confetti';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.animationDelay = `${Math.random() * 0.4}s`;
    celebration.appendChild(dot);
  }
  setTimeout(() => {
    celebration.innerHTML = '';
  }, 1800);
}

function startGame() {
  if (gameActive) return;
  gameActive = true;
  currentCans = 0;
  timeLeft = TIME_LIMIT;
  updateStats();
  setMessage('Go! Tap clean water cans and dodge dirty drops.');
  createGrid();
  spawnTarget();
  spawnInterval = setInterval(spawnTarget, 900);
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    updateStats();
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameActive = false;
  clearInterval(spawnInterval);
  clearInterval(timerInterval);
  document.querySelectorAll('.grid-cell').forEach(cell => (cell.innerHTML = ''));
  const won = currentCans >= WIN_SCORE;
  const pool = won ? winMessages : loseMessages;
  setMessage(pool[Math.floor(Math.random() * pool.length)], won ? 'win' : 'lose');
  if (won) celebrateWin();
}

function resetGame() {
  endGame();
  currentCans = 0;
  timeLeft = TIME_LIMIT;
  updateStats();
  setMessage('Press Start to begin a new run.');
}

document.querySelector('.game-grid').addEventListener('click', (event) => {
  if (!gameActive) return;
  const target = event.target.closest('.target');
  if (!target) return;
  const isGood = target.dataset.type === 'good';
  currentCans = isGood ? currentCans + 1 : Math.max(0, currentCans - 2);
  updateStats();
  setMessage(isGood ? '+1 Clean water secured!' : '-2 Dirty water penalty!', isGood ? 'win' : 'lose');
  target.parentElement.innerHTML = '';
  spawnTarget();
});

document.querySelector('.game-grid').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.target.click();
  }
});

document.getElementById('reset-game').addEventListener('click', resetGame);
document.getElementById('start-game').addEventListener('click', startGame);

updateStats();
setMessage('Press Start to begin. Reach 20 points before time runs out.');
