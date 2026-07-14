(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.TetrisGame = api.TetrisGame;
  root.TETRIS_STATES = api.STATES;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const STATES = Object.freeze({ READY:'ready', RUNNING:'running', PAUSED:'paused', OVER:'over' });
  const SHAPES = Object.freeze({
    I:[[1,1,1,1]], O:[[2,2],[2,2]], T:[[3,3,3],[0,3,0]],
    S:[[0,4,4],[4,4,0]], Z:[[5,5,0],[0,5,5]], J:[[6,0,0],[6,6,6]], L:[[0,0,7],[7,7,7]]
  });
  const TYPES = Object.keys(SHAPES);
  const cloneMatrix = matrix => matrix.map(row => [...row]);

  class TetrisGame {
    constructor({ columns=10, rows=20, random=Math.random, bestScore=0 }={}) {
      this.columns=columns; this.rows=rows; this.random=random; this.bestScore=bestScore;
      this.reset();
    }
    emptyBoard() { return Array.from({length:this.rows},()=>Array(this.columns).fill(0)); }
    reset() {
      this.board=this.emptyBoard(); this.score=0; this.lines=0; this.level=1;
      this.state=STATES.READY; this.piece=null; this.nextType=this.randomType(); this.spawnPiece();
      return this.snapshot();
    }
    randomType() { return TYPES[Math.min(TYPES.length-1,Math.floor(this.random()*TYPES.length))]; }
    spawnPiece() {
      const type=this.nextType; const matrix=cloneMatrix(SHAPES[type]);
      this.nextType=this.randomType();
      this.piece={type,matrix,x:Math.floor((this.columns-matrix[0].length)/2),y:0};
      if (this.collides(this.piece)) this.state=STATES.OVER;
      return this.piece;
    }
    start() { if (this.state===STATES.READY||this.state===STATES.PAUSED) this.state=STATES.RUNNING; return this.state; }
    togglePause() { if(this.state===STATES.RUNNING)this.state=STATES.PAUSED; else if(this.state===STATES.PAUSED)this.state=STATES.RUNNING; return this.state; }
    collides(piece,dx=0,dy=0,matrix=piece.matrix) {
      return matrix.some((row,y)=>row.some((value,x)=>value&&(
        piece.x+x+dx<0||piece.x+x+dx>=this.columns||piece.y+y+dy>=this.rows||
        (piece.y+y+dy>=0&&this.board[piece.y+y+dy][piece.x+x+dx])
      )));
    }
    move(dx) { if(this.state!==STATES.RUNNING||this.collides(this.piece,dx,0))return false; this.piece.x+=dx; return true; }
    rotate() {
      if(this.state!==STATES.RUNNING)return false;
      const matrix=this.piece.matrix[0].map((_,i)=>this.piece.matrix.map(row=>row[i]).reverse());
      for(const kick of [0,-1,1,-2,2]) if(!this.collides(this.piece,kick,0,matrix)){this.piece.x+=kick;this.piece.matrix=matrix;return true;}
      return false;
    }
    softDrop() {
      if(this.state!==STATES.RUNNING)return false;
      if(!this.collides(this.piece,0,1)){this.piece.y+=1;return true;}
      this.lock(); return false;
    }
    hardDrop() {
      if(this.state!==STATES.RUNNING)return 0;
      let distance=0; while(!this.collides(this.piece,0,1)){this.piece.y+=1;distance+=1;}
      this.score+=distance*2; this.bestScore=Math.max(this.bestScore,this.score); this.lock(); return distance;
    }
    tick() { if(this.state===STATES.RUNNING)this.softDrop(); return this.snapshot(); }
    lock() {
      this.piece.matrix.forEach((row,y)=>row.forEach((value,x)=>{if(value&&this.piece.y+y>=0)this.board[this.piece.y+y][this.piece.x+x]=value;}));
      this.clearLines(); this.spawnPiece();
    }
    clearLines() {
      let count=0;
      for(let y=this.rows-1;y>=0;y-=1) if(this.board[y].every(Boolean)){this.board.splice(y,1);this.board.unshift(Array(this.columns).fill(0));count+=1;y+=1;}
      if(count){this.lines+=count;this.score+=([0,100,300,500,800][count]||1200)*this.level;this.level=Math.floor(this.lines/10)+1;this.bestScore=Math.max(this.bestScore,this.score);}
      return count;
    }
    snapshot(){return{state:this.state,score:this.score,bestScore:this.bestScore,lines:this.lines,level:this.level,board:this.board.map(r=>[...r]),piece:this.piece?{...this.piece,matrix:cloneMatrix(this.piece.matrix)}:null,nextType:this.nextType};}
  }
  return { TetrisGame, STATES, SHAPES };
});
