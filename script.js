'use strict';

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const nav = $('#site-nav');
const navToggle = $('.nav-toggle');
const panels = [...$$('[data-panel]')];
let activePanel = 'home';
let activeGame = null;

function closeNav() { nav.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); navToggle.querySelector('.sr-only').textContent='메뉴 열기'; }
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);navToggle.setAttribute('aria-expanded',String(open));navToggle.querySelector('.sr-only').textContent=open?'메뉴 닫기':'메뉴 열기';});

function showPanel(name,{updateHash=true}={}) {
  if(!panels.some(panel=>panel.dataset.panel===name)) name='home';
  panels.forEach(panel=>{const active=panel.dataset.panel===name;panel.hidden=!active;panel.classList.toggle('active',active);});
  $$('[data-panel-link]').forEach(link=>link.classList.toggle('active',link.dataset.panelLink===name));
  activePanel=name; closeNav();
  if(name!=='games') closeGame();
  if(updateHash&&location.hash!==`#${name}`) history.pushState(null,'',`#${name}`);
  $('#main-content').focus?.({preventScroll:true});
}
$$('[data-panel-link]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();showPanel(link.dataset.panelLink);}));
window.addEventListener('popstate',()=>showPanel(location.hash.slice(1)||'home',{updateHash:false}));
window.addEventListener('resize',()=>{if(innerWidth>680)closeNav();});
$('#current-year').textContent=new Date().getFullYear();

const gameLibrary=$('#game-library');
function openGame(name){gameLibrary.hidden=true;$$('[data-game-view]').forEach(view=>view.hidden=view.dataset.gameView!==name);activeGame=name;if(name==='snake')snakeCanvas.focus({preventScroll:true});else tetrisCanvas.focus({preventScroll:true});}
function closeGame(){gameLibrary.hidden=false;$$('[data-game-view]').forEach(view=>view.hidden=true);if(snake.state==='running')snake.togglePause();if(tetris.state==='running')tetris.togglePause();activeGame=null;updateSnakeUI();updateTetrisUI();}
$$('[data-open-game]').forEach(button=>button.addEventListener('click',()=>openGame(button.dataset.openGame)));
$$('[data-game-back]').forEach(button=>button.addEventListener('click',closeGame));

function readScore(key){try{return Number.parseInt(localStorage.getItem(key),10)||0;}catch{return 0;}}
function writeScore(key,value){try{localStorage.setItem(key,String(value));}catch{}}

const snake=new SnakeGame({bestScore:readScore('portfolio-snake-best')});
const snakeCanvas=$('#game-canvas'),snakeContext=snakeCanvas.getContext('2d');
let snakeBest=snake.bestScore,snakeAccumulator=0,snakeTouch=null;
function renderSnake(){const w=snakeCanvas.width/snake.columns,h=snakeCanvas.height/snake.rows;snakeContext.fillStyle='#030912';snakeContext.fillRect(0,0,snakeCanvas.width,snakeCanvas.height);if(snake.food){snakeContext.fillStyle='#fb7185';snakeContext.beginPath();snakeContext.arc((snake.food.x+.5)*w,(snake.food.y+.5)*h,w*.32,0,Math.PI*2);snakeContext.fill();}snake.snake.forEach((part,i)=>{snakeContext.fillStyle=i?'#63e6be':'#c6fff0';snakeContext.fillRect(part.x*w+1.5,part.y*h+1.5,w-3,h-3);});$('#score').textContent=snake.score;$('#best-score').textContent=snake.bestScore;if(snake.bestScore!==snakeBest){snakeBest=snake.bestScore;writeScore('portfolio-snake-best',snakeBest);}}
function updateSnakeUI(message){const state=snake.state;$('#pause-game').disabled=!['running','paused'].includes(state);$('#pause-game').textContent=state==='paused'?'Resume':'Pause';$('#start-game').disabled=state==='running';$('#game-overlay').hidden=state==='running';const copy={ready:['Ready?','Start를 눌러 시작하세요.'],paused:['Paused','Pause 또는 Space로 계속하세요.'],over:['Game Over','Restart로 다시 도전하세요.'],won:['You Win!','보드를 모두 채웠습니다.']}[state];if(copy){$('#game-message').textContent=copy[0];$('#game-hint').textContent=copy[1];}if(message)$('#game-status').textContent=message;}
function startSnake(reset=false){if(reset||['over','won'].includes(snake.state))snake.reset();snake.start();snakeAccumulator=0;updateSnakeUI('Snake 시작');renderSnake();snakeCanvas.focus({preventScroll:true});}
function pauseSnake(){snake.togglePause();snakeAccumulator=0;updateSnakeUI(snake.state==='paused'?'Snake 일시정지':'Snake 재개');}
function directSnake(direction){if(snake.state==='ready')startSnake();if(snake.state==='running')snake.setDirection(direction);}
$('#start-game').addEventListener('click',()=>startSnake());$('#restart-game').addEventListener('click',()=>startSnake(true));$('#pause-game').addEventListener('click',pauseSnake);
$$('[data-snake-direction]').forEach(button=>button.addEventListener('click',()=>directSnake(button.dataset.snakeDirection)));
snakeCanvas.addEventListener('touchstart',event=>{const t=event.changedTouches[0];snakeTouch={x:t.clientX,y:t.clientY};event.preventDefault();},{passive:false});
snakeCanvas.addEventListener('touchmove',event=>event.preventDefault(),{passive:false});
snakeCanvas.addEventListener('touchend',event=>{if(!snakeTouch)return;const t=event.changedTouches[0],dx=t.clientX-snakeTouch.x,dy=t.clientY-snakeTouch.y;snakeTouch=null;if(Math.max(Math.abs(dx),Math.abs(dy))>=24)directSnake(Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up'));event.preventDefault();},{passive:false});

const tetris=new TetrisGame({bestScore:readScore('portfolio-tetris-best')});
const tetrisCanvas=$('#tetris-canvas'),tetrisContext=tetrisCanvas.getContext('2d');
const colors=['','#67d8ff','#ffe66d','#b197fc','#63e6be','#fb7185','#74c0fc','#ffa94d'];
let tetrisBest=tetris.bestScore,tetrisAccumulator=0;
function renderTetris(){const cw=tetrisCanvas.width/tetris.columns,ch=tetrisCanvas.height/tetris.rows;tetrisContext.fillStyle='#030912';tetrisContext.fillRect(0,0,tetrisCanvas.width,tetrisCanvas.height);const board=tetris.board.map(row=>[...row]);if(tetris.piece)tetris.piece.matrix.forEach((row,y)=>row.forEach((value,x)=>{const by=tetris.piece.y+y,bx=tetris.piece.x+x;if(value&&by>=0)board[by][bx]=value;}));board.forEach((row,y)=>row.forEach((value,x)=>{if(value){tetrisContext.fillStyle=colors[value];tetrisContext.fillRect(x*cw+1,y*ch+1,cw-2,ch-2);}else{tetrisContext.strokeStyle='rgba(255,255,255,.035)';tetrisContext.strokeRect(x*cw,y*ch,cw,ch);}}));$('#tetris-score').textContent=tetris.score;$('#tetris-lines').textContent=tetris.lines;$('#tetris-best').textContent=tetris.bestScore;if(tetris.bestScore!==tetrisBest){tetrisBest=tetris.bestScore;writeScore('portfolio-tetris-best',tetrisBest);}}
function updateTetrisUI(message){const state=tetris.state;$('#tetris-pause').disabled=!['running','paused'].includes(state);$('#tetris-pause').textContent=state==='paused'?'Resume':'Pause';$('#tetris-start').disabled=state==='running';$('#tetris-overlay').hidden=state==='running';const copy={ready:['Ready?','Start를 눌러 시작하세요.'],paused:['Paused','Pause 또는 P로 계속하세요.'],over:['Game Over','Restart로 다시 도전하세요.']}[state];if(copy){$('#tetris-message').textContent=copy[0];$('#tetris-hint').textContent=copy[1];}if(message)$('#tetris-status').textContent=message;}
function startTetris(reset=false){if(reset||tetris.state==='over')tetris.reset();tetris.start();tetrisAccumulator=0;updateTetrisUI('Tetris 시작');renderTetris();tetrisCanvas.focus({preventScroll:true});}
function pauseTetris(){tetris.togglePause();tetrisAccumulator=0;updateTetrisUI(tetris.state==='paused'?'Tetris 일시정지':'Tetris 재개');}
function tetrisAction(action){if(tetris.state==='ready')startTetris();if(tetris.state!=='running')return;({left:()=>tetris.move(-1),right:()=>tetris.move(1),rotate:()=>tetris.rotate(),down:()=>tetris.softDrop(),drop:()=>tetris.hardDrop()})[action]?.();renderTetris();updateTetrisUI();}
$('#tetris-start').addEventListener('click',()=>startTetris());$('#tetris-restart').addEventListener('click',()=>startTetris(true));$('#tetris-pause').addEventListener('click',pauseTetris);
$$('[data-tetris-action]').forEach(button=>button.addEventListener('click',()=>tetrisAction(button.dataset.tetrisAction)));

const snakeKeys={ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right'};
document.addEventListener('keydown',event=>{if(activePanel!=='games'||!activeGame)return;if(activeGame==='snake'){if(snakeKeys[event.key]){event.preventDefault();directSnake(snakeKeys[event.key]);}if(event.code==='Space'&&['running','paused'].includes(snake.state)){event.preventDefault();pauseSnake();}}else{const action={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'rotate',ArrowDown:'down',' ':'drop'}[event.key];if(action){event.preventDefault();tetrisAction(action);}if((event.key==='p'||event.key==='P')&&['running','paused'].includes(tetris.state)){event.preventDefault();pauseTetris();}}});

let lastFrame=0;
function animationLoop(time){const elapsed=lastFrame?Math.min(time-lastFrame,250):0;lastFrame=time;if(snake.state==='running'){snakeAccumulator+=elapsed;while(snakeAccumulator>=125&&snake.state==='running'){snake.tick();snakeAccumulator-=125;}if(snake.state!=='running')updateSnakeUI();}if(tetris.state==='running'){tetrisAccumulator+=elapsed;const step=Math.max(120,700-(tetris.level-1)*55);while(tetrisAccumulator>=step&&tetris.state==='running'){tetris.tick();tetrisAccumulator-=step;}if(tetris.state==='over')updateTetrisUI('Tetris 게임 오버');}renderSnake();renderTetris();requestAnimationFrame(animationLoop);}
updateSnakeUI();updateTetrisUI();renderSnake();renderTetris();showPanel(location.hash.slice(1)||'home',{updateHash:false});requestAnimationFrame(animationLoop);
