'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { SnakeGame, STATES } = require('./game.js');

function game(options = {}) {
  return new SnakeGame({ columns: 10, rows: 10, random: () => 0, ...options });
}

test('starts ready with food outside the snake and moves only after start', () => {
  const subject = game();
  assert.equal(subject.state, STATES.READY);
  assert.equal(subject.snake.some(part => part.x === subject.food.x && part.y === subject.food.y), false);
  const before = structuredClone(subject.snake);
  subject.tick();
  assert.deepEqual(subject.snake, before);
  subject.start();
  subject.tick();
  assert.equal(subject.snake[0].x, before[0].x + 1);
});

test('eating food grows the snake and increases current and best score', () => {
  const subject = game();
  subject.start();
  const head = subject.snake[0];
  subject.food = { x: head.x + 1, y: head.y };
  const length = subject.snake.length;
  subject.tick();
  assert.equal(subject.snake.length, length + 1);
  assert.equal(subject.score, 10);
  assert.equal(subject.bestScore, 10);
  assert.equal(subject.snake.some((part, index) => index > 0 && part.x === subject.food.x && part.y === subject.food.y), false);
});

test('rejects immediate reverse and more than one queued turn per tick', () => {
  const subject = game();
  subject.start();
  assert.equal(subject.setDirection('left'), false);
  assert.equal(subject.setDirection('up'), true);
  assert.equal(subject.setDirection('left'), false);
  subject.tick();
  assert.equal(subject.direction, 'up');
});

test('pauses, resumes and resets without moving while paused', () => {
  const subject = game();
  subject.start();
  assert.equal(subject.togglePause(), STATES.PAUSED);
  const before = structuredClone(subject.snake);
  subject.tick();
  assert.deepEqual(subject.snake, before);
  assert.equal(subject.togglePause(), STATES.RUNNING);
  subject.reset();
  assert.equal(subject.state, STATES.READY);
  assert.equal(subject.score, 0);
});

test('ends the game on a wall collision', () => {
  const subject = game();
  subject.snake = [{ x: 9, y: 5 }, { x: 8, y: 5 }, { x: 7, y: 5 }];
  subject.start();
  subject.tick();
  assert.equal(subject.state, STATES.OVER);
  assert.equal(subject.reason, 'wall');
});

test('ends the game on a self collision', () => {
  const subject = game();
  subject.snake = [{ x: 5, y: 5 }, { x: 5, y: 4 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 5, y: 6 }];
  subject.direction = 'up';
  subject.pendingDirection = 'up';
  subject.start();
  subject.setDirection('left');
  subject.tick();
  assert.equal(subject.state, STATES.OVER);
  assert.equal(subject.reason, 'self');
});

test('food selection handles a nearly full board without overlapping', () => {
  const subject = new SnakeGame({ columns: 3, rows: 2, random: () => .9 });
  subject.snake = [{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:0,y:1},{x:1,y:1}];
  subject.spawnFood();
  assert.deepEqual(subject.food, {x:2,y:1});
});
