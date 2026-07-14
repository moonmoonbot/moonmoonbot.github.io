'use strict';

const assert = require('node:assert/strict');
global.SnakeGame = require('./game.js').SnakeGame;

class FakeElement {
  constructor() {
    this.attributes = new Map();
    this.listeners = new Map();
    this.dataset = {};
    this.classList = { add() {}, remove() {}, toggle() {} };
    this.textContent = '';
    this.hidden = false;
    this.disabled = false;
  }
  addEventListener(type, handler) { this.listeners.set(type, handler); }
  setAttribute(name, value) { this.attributes.set(name, value); }
  getAttribute(name) { return this.attributes.get(name) || null; }
  querySelector() { return elements.menuLabel; }
  closest(selector) { return selector === 'a' ? this : null; }
  focus() {}
  getBoundingClientRect() { return { top: 0, bottom: 700 }; }
}

const context = { fillRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, arc() {}, fill() {} };
const selectors = ['navToggle','siteNav','year','canvas','score','best','overlay','message','hint','status','start','pause','restart','games','menuLabel'];
const elements = Object.fromEntries(selectors.map(name => [name, new FakeElement()]));
elements.navToggle.setAttribute('aria-expanded', 'false');
elements.canvas.width = 400;
elements.canvas.height = 400;
elements.canvas.getContext = () => context;
const directions = ['up','left','down','right'].map(direction => { const item = new FakeElement(); item.dataset.direction = direction; return item; });
const selectorMap = new Map([
  ['.nav-toggle', elements.navToggle], ['.site-nav', elements.siteNav], ['#current-year', elements.year],
  ['#game-canvas', elements.canvas], ['#score', elements.score], ['#best-score', elements.best],
  ['#game-overlay', elements.overlay], ['#game-message', elements.message], ['#game-hint', elements.hint],
  ['#game-status', elements.status], ['#start-game', elements.start], ['#pause-game', elements.pause],
  ['#restart-game', elements.restart], ['#games', elements.games]
]);

global.document = {
  listeners: new Map(),
  querySelector: selector => selectorMap.get(selector),
  querySelectorAll: selector => selector === '[data-direction]' ? directions : [],
  addEventListener(type, handler) { this.listeners.set(type, handler); }
};
global.window = { innerWidth: 1440, innerHeight: 900, addEventListener() {} };
global.localStorage = { getItem: () => null, setItem() {} };
const frames = [];
global.requestAnimationFrame = callback => { frames.push(callback); return frames.length; };

require('./script.js');

assert.equal(frames.length, 1, 'initialization must schedule exactly one animation frame');
assert.equal(elements.score.textContent, 0);
assert.equal(elements.best.textContent, 0);
assert.ok(elements.start.listeners.has('click'));
assert.ok(elements.pause.listeners.has('click'));
assert.ok(elements.restart.listeners.has('click'));
assert.ok(elements.canvas.listeners.has('touchstart'));
assert.ok(elements.canvas.listeners.has('touchmove'));
assert.ok(elements.canvas.listeners.has('touchend'));
assert.ok(global.document.listeners.has('keydown'));
elements.start.listeners.get('click')();
frames.shift()(200);
assert.equal(frames.length, 1, 'each frame must schedule only one successor');
console.log('browser runtime smoke: PASS');
