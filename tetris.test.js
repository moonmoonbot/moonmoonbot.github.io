'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { TetrisGame, STATES } = require('./tetris.js');

const makeGame = () => new TetrisGame({ random: () => 0 });

test('starts ready and begins falling after start', () => {
  const game = makeGame();
  assert.equal(game.state, STATES.READY);
  const row = game.piece.y;
  game.tick();
  assert.equal(game.piece.y, row);
  game.start(); game.tick();
  assert.equal(game.piece.y, row + 1);
});

test('moves inside the board and rejects movement through a wall', () => {
  const game = makeGame(); game.start();
  assert.equal(game.move(-1), true);
  game.piece.x = 0;
  assert.equal(game.move(-1), false);
});

test('rotates a piece and uses wall kicks near an edge', () => {
  const game = makeGame(); game.start();
  game.piece = { type:'T', matrix:[[1,0],[1,1],[1,0]], x:8, y:2 };
  assert.equal(game.rotate(), true);
  assert.ok(game.piece.x <= 7);
});

test('hard drop locks a piece and spawns the next piece', () => {
  const game = makeGame(); game.start();
  const type = game.piece.type;
  const distance = game.hardDrop();
  assert.ok(distance > 0);
  assert.notEqual(game.board.flat().filter(Boolean).length, 0);
  assert.equal(game.state, STATES.RUNNING);
  assert.equal(game.piece.type, type);
});

test('clears a completed line and awards score', () => {
  const game = makeGame();
  game.board[19] = Array(10).fill(1);
  assert.equal(game.clearLines(), 1);
  assert.equal(game.score, 100);
  assert.equal(game.lines, 1);
  assert.deepEqual(game.board[0], Array(10).fill(0));
});

test('pauses, resumes and resets', () => {
  const game = makeGame(); game.start();
  assert.equal(game.togglePause(), STATES.PAUSED);
  assert.equal(game.togglePause(), STATES.RUNNING);
  game.reset();
  assert.equal(game.state, STATES.READY);
  assert.equal(game.score, 0);
});

test('reports game over when a new piece cannot spawn', () => {
  const game = makeGame(); game.start();
  game.board[0] = Array(10).fill(1);
  game.spawnPiece();
  assert.equal(game.state, STATES.OVER);
});
