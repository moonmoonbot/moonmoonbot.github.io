(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.SnakeGame = api.SnakeGame;
  root.SNAKE_STATES = api.STATES;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const STATES = Object.freeze({ READY: 'ready', RUNNING: 'running', PAUSED: 'paused', OVER: 'over', WON: 'won' });
  const VECTORS = Object.freeze({ up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } });
  const OPPOSITE = Object.freeze({ up: 'down', down: 'up', left: 'right', right: 'left' });

  class SnakeGame {
    constructor({ columns = 20, rows = 20, random = Math.random, bestScore = 0 } = {}) {
      this.columns = columns;
      this.rows = rows;
      this.random = random;
      this.bestScore = Number.isFinite(bestScore) ? bestScore : 0;
      this.reset();
    }

    reset() {
      const x = Math.max(2, Math.floor(this.columns / 2));
      const y = Math.floor(this.rows / 2);
      this.snake = [{ x, y }, { x: x - 1, y }, { x: x - 2, y }];
      this.direction = 'right';
      this.pendingDirection = 'right';
      this.directionQueued = false;
      this.score = 0;
      this.state = STATES.READY;
      this.reason = null;
      this.spawnFood();
      return this.snapshot();
    }

    start() {
      if (this.state === STATES.READY || this.state === STATES.PAUSED) this.state = STATES.RUNNING;
      return this.state;
    }

    togglePause() {
      if (this.state === STATES.RUNNING) this.state = STATES.PAUSED;
      else if (this.state === STATES.PAUSED) this.state = STATES.RUNNING;
      return this.state;
    }

    setDirection(next) {
      if (!VECTORS[next] || this.directionQueued || OPPOSITE[this.direction] === next || this.direction === next) return false;
      this.pendingDirection = next;
      this.directionQueued = true;
      return true;
    }

    tick() {
      if (this.state !== STATES.RUNNING) return this.snapshot();
      this.direction = this.pendingDirection;
      this.directionQueued = false;
      const vector = VECTORS[this.direction];
      const head = { x: this.snake[0].x + vector.x, y: this.snake[0].y + vector.y };
      const hitWall = head.x < 0 || head.y < 0 || head.x >= this.columns || head.y >= this.rows;
      const eating = this.food && head.x === this.food.x && head.y === this.food.y;
      const collisionBody = eating ? this.snake : this.snake.slice(0, -1);
      const hitSelf = collisionBody.some(part => part.x === head.x && part.y === head.y);
      if (hitWall || hitSelf) {
        this.state = STATES.OVER;
        this.reason = hitWall ? 'wall' : 'self';
        return this.snapshot();
      }
      this.snake.unshift(head);
      if (eating) {
        this.score += 10;
        this.bestScore = Math.max(this.bestScore, this.score);
        this.spawnFood();
      } else {
        this.snake.pop();
      }
      return this.snapshot();
    }

    spawnFood() {
      const occupied = new Set(this.snake.map(part => `${part.x},${part.y}`));
      const free = [];
      for (let y = 0; y < this.rows; y += 1) for (let x = 0; x < this.columns; x += 1) if (!occupied.has(`${x},${y}`)) free.push({ x, y });
      if (!free.length) {
        this.food = null;
        this.state = STATES.WON;
        return null;
      }
      const index = Math.min(free.length - 1, Math.floor(this.random() * free.length));
      this.food = free[index];
      return this.food;
    }

    snapshot() {
      return { state: this.state, reason: this.reason, score: this.score, bestScore: this.bestScore, snake: this.snake.map(part => ({ ...part })), food: this.food ? { ...this.food } : null, direction: this.direction };
    }
  }

  return { SnakeGame, STATES };
});
