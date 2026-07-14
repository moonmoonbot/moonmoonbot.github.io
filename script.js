'use strict';

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

function closeMenu() {
  siteNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.querySelector('.sr-only').textContent = '메뉴 열기';
}

navToggle.addEventListener('click', () => {
  const willOpen = navToggle.getAttribute('aria-expanded') !== 'true';
  siteNav.classList.toggle('is-open', willOpen);
  navToggle.setAttribute('aria-expanded', String(willOpen));
  navToggle.querySelector('.sr-only').textContent = willOpen ? '메뉴 닫기' : '메뉴 열기';
});

siteNav.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 680) closeMenu();
});

document.querySelector('#current-year').textContent = new Date().getFullYear();

const canvas = document.querySelector('#game-canvas');
const context = canvas.getContext('2d');
const scoreElement = document.querySelector('#score');
const bestElement = document.querySelector('#best-score');
const overlay = document.querySelector('#game-overlay');
const messageElement = document.querySelector('#game-message');
const hintElement = document.querySelector('#game-hint');
const statusElement = document.querySelector('#game-status');
const startButton = document.querySelector('#start-game');
const pauseButton = document.querySelector('#pause-game');
const restartButton = document.querySelector('#restart-game');
const gamesSection = document.querySelector('#games');
const STORAGE_KEY = 'portfolio-snake-best';
const STEP_MS = 125;

function loadBestScore() {
  try { return Number.parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0; }
  catch { return 0; }
}

function saveBestScore(value) {
  try { localStorage.setItem(STORAGE_KEY, String(value)); }
  catch { /* The game remains playable when storage is unavailable. */ }
}

const game = new SnakeGame({ bestScore: loadBestScore() });
let previousBest = game.bestScore;
let lastFrame = 0;
let accumulator = 0;
let touchStart = null;

function render() {
  const cellWidth = canvas.width / game.columns;
  const cellHeight = canvas.height / game.rows;
  context.fillStyle = '#050b13';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = 'rgba(255,255,255,.035)';
  context.lineWidth = 1;
  for (let index = 1; index < game.columns; index += 1) {
    context.beginPath(); context.moveTo(index * cellWidth, 0); context.lineTo(index * cellWidth, canvas.height); context.stroke();
    context.beginPath(); context.moveTo(0, index * cellHeight); context.lineTo(canvas.width, index * cellHeight); context.stroke();
  }
  if (game.food) {
    context.fillStyle = '#fb7185';
    context.beginPath();
    context.arc((game.food.x + .5) * cellWidth, (game.food.y + .5) * cellHeight, cellWidth * .32, 0, Math.PI * 2);
    context.fill();
  }
  game.snake.forEach((part, index) => {
    context.fillStyle = index === 0 ? '#b7f7e5' : '#63e6be';
    const inset = 1.5;
    context.fillRect(part.x * cellWidth + inset, part.y * cellHeight + inset, cellWidth - inset * 2, cellHeight - inset * 2);
  });
  scoreElement.textContent = game.score;
  bestElement.textContent = game.bestScore;
  if (game.bestScore !== previousBest) { previousBest = game.bestScore; saveBestScore(previousBest); }
}

function updateInterface(announcement) {
  const state = game.state;
  pauseButton.disabled = !['running', 'paused'].includes(state);
  pauseButton.textContent = state === 'paused' ? 'Resume' : 'Pause';
  startButton.disabled = state === 'running';
  startButton.textContent = state === 'paused' ? 'Resume' : 'Start';
  overlay.hidden = state === 'running';
  const copy = {
    ready: ['Ready?', 'Start 버튼을 눌러 시작하세요.'],
    paused: ['Paused', 'Pause 또는 Space를 눌러 계속하세요.'],
    over: ['Game Over', 'Restart를 눌러 다시 도전하세요.'],
    won: ['You Win!', '보드를 모두 채웠습니다.'],
  }[state];
  if (copy) [messageElement.textContent, hintElement.textContent] = copy;
  if (announcement) statusElement.textContent = announcement;
}

function startGame() {
  if (game.state === 'over' || game.state === 'won') game.reset();
  game.start();
  accumulator = 0;
  updateInterface('게임 시작');
  render();
  canvas.focus({ preventScroll: true });
}

function restartGame() {
  game.reset();
  game.start();
  accumulator = 0;
  updateInterface('게임 다시 시작');
  render();
  canvas.focus({ preventScroll: true });
}

function togglePause() {
  const state = game.togglePause();
  if (state === 'paused') accumulator = 0;
  updateInterface(state === 'paused' ? '게임 일시정지' : '게임 재개');
}

function chooseDirection(direction) {
  if (game.state === 'ready') startGame();
  if (game.state === 'running') game.setDirection(direction);
}

function gameIsInView() {
  const bounds = gamesSection.getBoundingClientRect();
  return bounds.bottom > 0 && bounds.top < window.innerHeight;
}

const keyDirections = { ArrowUp: 'up', w: 'up', W: 'up', ArrowDown: 'down', s: 'down', S: 'down', ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right' };
document.addEventListener('keydown', event => {
  const direction = keyDirections[event.key];
  if (direction && gameIsInView()) { event.preventDefault(); chooseDirection(direction); }
  if ((event.code === 'Space' || event.key === ' ') && gameIsInView() && ['running', 'paused'].includes(game.state)) { event.preventDefault(); togglePause(); }
});

document.querySelectorAll('[data-direction]').forEach(button => {
  button.addEventListener('click', () => chooseDirection(button.dataset.direction));
});
startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', togglePause);
restartButton.addEventListener('click', restartGame);

canvas.addEventListener('touchstart', event => {
  const touch = event.changedTouches[0];
  touchStart = { x: touch.clientX, y: touch.clientY };
  event.preventDefault();
}, { passive: false });
canvas.addEventListener('touchmove', event => event.preventDefault(), { passive: false });
canvas.addEventListener('touchend', event => {
  if (!touchStart) return;
  const touch = event.changedTouches[0];
  const dx = touch.clientX - touchStart.x;
  const dy = touch.clientY - touchStart.y;
  touchStart = null;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
  chooseDirection(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  event.preventDefault();
}, { passive: false });

function animationLoop(timestamp) {
  const elapsed = lastFrame ? Math.min(timestamp - lastFrame, STEP_MS * 2) : 0;
  lastFrame = timestamp;
  if (game.state === 'running') {
    accumulator += elapsed;
    while (accumulator >= STEP_MS && game.state === 'running') { game.tick(); accumulator -= STEP_MS; }
    if (game.state === 'over') updateInterface(game.reason === 'wall' ? '벽에 충돌해 게임 종료' : '몸에 충돌해 게임 종료');
    else if (game.state === 'won') updateInterface('게임 승리');
  }
  render();
  requestAnimationFrame(animationLoop);
}

updateInterface();
render();
requestAnimationFrame(animationLoop);
