'use strict';

const STAGES = [
{id:'TILT-001',title:'First Tilt',size:5,walls:[{x:1,y:1},{x:3,y:3}],blocks:[{x:0,y:2,c:0}],goals:[{x:4,y:2,c:null}],rule:'ALL_IN',best:1},
{id:'TILT-002',title:'One More',size:5,walls:[{x:2,y:1},{x:2,y:3}],blocks:[{x:0,y:1,c:0},{x:0,y:3,c:0}],goals:[{x:4,y:1,c:null},{x:4,y:3,c:null}],rule:'ALL_IN',best:1},
{id:'TILT-003',title:'Walls',size:6,walls:[{x:2,y:1},{x:2,y:2},{x:3,y:3},{x:3,y:4}],blocks:[{x:0,y:0,c:0}],goals:[{x:5,y:5,c:null}],rule:'ALL_IN',best:2},
{id:'TILT-004',title:'Crossing',size:6,walls:[{x:2,y:2},{x:3,y:2},{x:2,y:3},{x:3,y:3}],blocks:[{x:0,y:2,c:0},{x:5,y:3,c:1}],goals:[{x:5,y:0,c:null},{x:0,y:5,c:null}],rule:'ALL_IN',best:2},
{id:'TILT-005',title:'Order',size:6,walls:[{x:2,y:1},{x:2,y:4},{x:4,y:2},{x:4,y:3}],blocks:[{x:0,y:1,c:0},{x:0,y:4,c:1}],goals:[{x:5,y:2,c:0},{x:5,y:3,c:1}],rule:'COLOR_IN',best:3},
{id:'TILT-006',title:'Blocked',size:7,walls:[{x:3,y:1},{x:3,y:2},{x:3,y:4},{x:3,y:5}],blocks:[{x:1,y:0,c:0},{x:5,y:6,c:1}],goals:[{x:6,y:1,c:0},{x:0,y:5,c:1}],rule:'COLOR_IN',best:3},
{id:'TILT-007',title:'Around',size:7,walls:[{x:2,y:2},{x:3,y:2},{x:4,y:2},{x:2,y:4},{x:3,y:4},{x:4,y:4}],blocks:[{x:0,y:3,c:0}],goals:[{x:6,y:3,c:null}],rule:'ALL_IN',best:4},
{id:'TILT-008',title:'Two Turns',size:7,walls:[{x:2,y:0},{x:2,y:1},{x:4,y:5},{x:4,y:6}],blocks:[{x:0,y:0,c:0},{x:6,y:6,c:1}],goals:[{x:6,y:2,c:null},{x:0,y:4,c:null}],rule:'ALL_IN',best:3},
{id:'TILT-009',title:'Read Ahead',size:7,walls:[{x:3,y:1},{x:3,y:2},{x:3,y:4},{x:3,y:5},{x:1,y:3},{x:5,y:3}],blocks:[{x:0,y:0,c:0},{x:6,y:6,c:1}],goals:[{x:0,y:6,c:null},{x:6,y:0,c:null}],rule:'ALL_IN',best:4},
{id:'TILT-010',title:'Chain',size:7,walls:[{x:2,y:1},{x:4,y:1},{x:2,y:5},{x:4,y:5}],blocks:[{x:1,y:3,c:0},{x:3,y:3,c:1},{x:5,y:3,c:2}],goals:[{x:6,y:3,c:null}],rule:'SELECT',target:0,best:3},
{id:'TILT-011',title:'Goal Is The Puzzle',size:8,walls:[{x:3,y:1},{x:4,y:1},{x:3,y:6},{x:4,y:6},{x:2,y:3},{x:2,y:4}],blocks:[{x:0,y:0,c:0},{x:7,y:7,c:1}],goals:[{x:7,y:1,c:null},{x:0,y:6,c:null}],rule:'ALL_IN',best:4},
{id:'TILT-012',title:'Blue Only',size:8,walls:[{x:3,y:2},{x:4,y:2},{x:3,y:5},{x:4,y:5}],blocks:[{x:0,y:3,c:0},{x:7,y:3,c:1},{x:2,y:0,c:1}],goals:[{x:7,y:6,c:1}],rule:'COLOR_IN',color:1,best:4},
{id:'TILT-013',title:'Match',size:8,walls:[{x:2,y:2},{x:5,y:2},{x:2,y:5},{x:5,y:5}],blocks:[{x:0,y:0,c:0},{x:7,y:0,c:0},{x:0,y:7,c:1},{x:7,y:7,c:1}],goals:[{x:3,y:3,c:0},{x:4,y:4,c:1}],rule:'MATCH',buckets:[0,1],best:5},
{id:'TILT-014',title:'Form',size:8,walls:[{x:1,y:3},{x:2,y:3},{x:5,y:3},{x:6,y:3},{x:1,y:4},{x:2,y:4},{x:5,y:4},{x:6,y:4}],blocks:[{x:0,y:0,c:0},{x:3,y:0,c:0},{x:7,y:0,c:0}],goals:[{x:3,y:7,c:null}],rule:'ALL_IN',best:4},
{id:'TILT-015',title:'Reverse',size:8,walls:[{x:3,y:1},{x:4,y:1},{x:3,y:2},{x:4,y:2},{x:3,y:5},{x:4,y:5},{x:3,y:6},{x:4,y:6}],blocks:[{x:0,y:0,c:0},{x:7,y:7,c:1}],goals:[{x:0,y:7,c:null},{x:7,y:0,c:null}],rule:'ALL_IN',best:5},
{id:'TILT-016',title:'Which First?',size:8,walls:[{x:2,y:1},{x:2,y:2},{x:2,y:3},{x:5,y:4},{x:5,y:5},{x:5,y:6}],blocks:[{x:0,y:0,c:0},{x:7,y:0,c:1},{x:0,y:7,c:2}],goals:[{x:7,y:7,c:2}],rule:'SELECT',target:2,best:5},
{id:'TILT-017',title:'Heavy',size:8,walls:[{x:2,y:2},{x:2,y:3},{x:5,y:4},{x:5,y:5}],blocks:[{x:0,y:0,c:0,w:2,h:1},{x:6,y:7,c:1}],goals:[{x:7,y:0,c:null},{x:0,y:7,c:null}],rule:'ALL_IN',best:5},
{id:'TILT-018',title:'Whole Board',size:9,walls:[{x:4,y:1},{x:4,y:2},{x:4,y:6},{x:4,y:7},{x:2,y:4},{x:3,y:4},{x:5,y:4},{x:6,y:4}],blocks:[{x:0,y:0,c:0},{x:8,y:0,c:1},{x:0,y:8,c:2},{x:8,y:8,c:3}],goals:[{x:4,y:4,c:null}],rule:'SELECT',target:3,best:6},
{id:'TILT-019',title:'Compare',size:9,walls:[{x:3,y:2},{x:5,y:2},{x:3,y:3},{x:5,y:3},{x:3,y:5},{x:5,y:5},{x:3,y:6},{x:5,y:6}],blocks:[{x:0,y:0,c:0},{x:8,y:0,c:1},{x:0,y:8,c:2}],goals:[{x:8,y:8,c:null},{x:0,y:4,c:null}],rule:'ALL_IN',best:7},
{id:'TILT-020',title:'Aha!',size:9,walls:[{x:4,y:0},{x:4,y:1},{x:4,y:3},{x:4,y:5},{x:4,y:7},{x:4,y:8},{x:1,y:4},{x:2,y:4},{x:6,y:4},{x:7,y:4}],blocks:[{x:0,y:0,c:0},{x:8,y:0,c:1},{x:0,y:8,c:2},{x:8,y:8,c:3}],goals:[{x:4,y:4,c:null}],rule:'SELECT',target:2,best:8}
];

const DIRS={UP:{dx:0,dy:-1},DOWN:{dx:0,dy:1},LEFT:{dx:-1,dy:0},RIGHT:{dx:1,dy:0}};
const COLORS=['#8ee6ff','#9aa8ff','#8ff0b3','#ffcf8b'];
const appState={screen:'title',stageIndex:0,state:'TITLE',history:[],blocks:[],goals:[],walls:new Set(),moves:0,anim:null,settings:{sound:true,bgm:false,vibrate:true,control:'AUTO',calibrated:null},progress:{unlocked:1,clear:{}}};
const $=id=>document.getElementById(id);
const canvas=$('gameCanvas'); const ctx=canvas.getContext('2d');

function loadSave(){try{const s=JSON.parse(localStorage.getItem('tiltSave')||'{}');appState.progress={unlocked:Math.max(1,s.unlocked||1),clear:s.clear||{}};appState.settings={...appState.settings,...(s.settings||{})}}catch{}}
function save(){localStorage.setItem('tiltSave',JSON.stringify({unlocked:appState.progress.unlocked,clear:appState.progress.clear,settings:appState.settings}))}
function setScreen(name){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));$(name).classList.add('active');appState.screen=name.replace('Screen','').toUpperCase();if(name==='stageScreen')renderStageGrid()}
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),1300)}
function vibrate(ms=16){if(appState.settings.vibrate&&navigator.vibrate)navigator.vibrate(ms)}

function cloneBlocks(blocks){return blocks.map(b=>({...b}))}
function snapshot(){return JSON.stringify({blocks:appState.blocks,moves:appState.moves})}
function restore(s){const x=JSON.parse(s);appState.blocks=x.blocks;appState.moves=x.moves;updateMeta();draw()}
function makeStage(i){const st=STAGES[i];appState.stageIndex=i;appState.walls=new Set(st.walls.map(p=>`${p.x},${p.y}`));appState.blocks=cloneBlocks(st.blocks).map((b,i)=>({...b,id:i,w:b.w||1,h:b.h||1,goalHit:false}));appState.goals=st.goals.map(g=>({...g}));appState.moves=0;appState.history=[];appState.anim=null;appState.state='PLAYING';$('stageTitle').textContent=`${i+1}. ${st.title}`;updateMeta();$('clearBurst').classList.remove('show');setScreen('gameScreen');requestAnimationFrame(()=>{resize();draw()})}
function updateMeta(){const st=STAGES[appState.stageIndex];const best=appState.progress.clear[st.id]?.moves; $('stageMeta').textContent=`${appState.moves}手 · BEST ${best??'—'} · OPT ${st.best}`;}

function rectCells(b){const cells=[];for(let y=0;y<b.h;y++)for(let x=0;x<b.w;x++)cells.push({x:b.x+x,y:b.y+y});return cells}
function occupiedByOther(x,y,ignoreId){return appState.blocks.some(b=>b.id!==ignoreId&&rectCells(b).some(c=>c.x===x&&c.y===y))}
function inBounds(x,y,w,h){return x>=0&&y>=0&&x+w<=STAGES[appState.stageIndex].size&&y+h<=STAGES[appState.stageIndex].size}
function canPlace(b,nx,ny){for(let y=0;y<b.h;y++)for(let x=0;x<b.w;x++){const px=nx+x,py=ny+y;if(!inBounds(nx,ny,b.w,b.h)||appState.walls.has(`${px},${py}`)||occupiedByOther(px,py,b.id))return false}return true}
function moveOneDirection(dir){if(appState.state!=='PLAYING')return;if(appState.blocks.length===0){return}
  const before=snapshot(); const d=DIRS[dir];
  // Stable deterministic gravity: repeatedly advance every block in a direction until no movement remains.
  const order=[...appState.blocks].sort((a,b)=>dir==='DOWN'?b.y-a.y:dir==='UP'?a.y-b.y:dir==='RIGHT'?b.x-a.x:a.x-b.x);
  let moved=false;
  for(const b of order){while(canPlace(b,b.x+d.dx,b.y+d.dy)){b.x+=d.dx;b.y+=d.dy;moved=true}}
  // Goal resolution: consumed blocks leave the board, allowing natural chain reaction.
  let removed=[]; const st=STAGES[appState.stageIndex];
  for(const b of [...appState.blocks]){
    const cells=rectCells(b); const g=appState.goals.find(g=>cells.every(c=>c.x>=g.x&&c.x<g.x+1&&c.y>=g.y&&c.y<g.y+1));
    if(g && (g.c==null||g.c===b.c) && (!st.rule.includes('SELECT')||b.c===st.target || st.rule==='SELECT')) removed.push(b.id);
  }
  if(removed.length){appState.blocks=appState.blocks.filter(b=>!removed.includes(b.id));moved=true;playTone('goal');burst();}
  if(moved){appState.history.push(before);appState.moves++; if(appState.history.length>50)appState.history.shift(); updateMeta(); vibrate(12); playTone('move'); if(checkClear()){onClear()} else draw()}
}
function checkClear(){const st=STAGES[appState.stageIndex];if(st.rule==='SELECT')return !appState.blocks.some(b=>b.c===st.target);if(st.rule==='COLOR_IN')return !appState.blocks.some(b=>b.c===st.color);if(st.rule==='MATCH')return appState.blocks.length===0;return appState.blocks.length===0}

function onClear(){appState.state='CLEAR';const st=STAGES[appState.stageIndex];const prev=appState.progress.clear[st.id];const now={moves:appState.moves,stars:appState.moves<=st.best?3:appState.moves<=st.best+2?2:1};if(!prev||now.moves<prev.moves)appState.progress.clear[st.id]=now;appState.progress.unlocked=Math.max(appState.progress.unlocked,Math.min(STAGES.length,appState.stageIndex+2));save();updateMeta();$('clearBurst').classList.add('show');$('nextBtn').style.display=appState.stageIndex<STAGES.length-1?'block':'none';playTone('clear');vibrate([20,25,35]);draw();setTimeout(()=>{if(appState.state==='CLEAR'){$('nextBtn').focus()}},500)}
function restart(){makeStage(appState.stageIndex)}
function undo(){if(!appState.history.length){toast('戻せる手がありません');return}restore(appState.history.pop())}

function renderStageGrid(){const grid=$('stageGrid');grid.innerHTML='';let done=0;for(let i=0;i<STAGES.length;i++){const st=STAGES[i],isUnlocked=i<appState.progress.unlocked,isDone=!!appState.progress.clear[st.id];if(isDone)done++;const b=document.createElement('button');b.className=`stageBtn ${!isUnlocked?'locked':''} ${isDone?'done':''}`;b.disabled=!isUnlocked;b.innerHTML=`<div class="stageNum">${i+1}</div><div>${isUnlocked?st.title:'LOCKED'}</div><div class="stars">${isDone?'★'.repeat(appState.progress.clear[st.id].stars)+'☆'.repeat(3-appState.progress.clear[st.id].stars):' '}</div>`;b.onclick=()=>makeStage(i);grid.appendChild(b)}$('progressChip').textContent=`${done} / ${STAGES.length}`}

function resize(){const r=canvas.getBoundingClientRect();const dpr=Math.max(1,Math.min(3,window.devicePixelRatio||1));canvas.width=Math.round(r.width*dpr);canvas.height=Math.round(r.height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw()}
function roundRect(c,x,y,w,h,r){const rr=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+rr,y);c.arcTo(x+w,y,x+w,y+h,rr);c.arcTo(x+w,y+h,x,y+h,rr);c.arcTo(x,y+h,x,y,rr);c.arcTo(x,y,x+w,y,rr);c.closePath()}
function draw(){const st=STAGES[appState.stageIndex];if(!st||!ctx)return;const rect=canvas.getBoundingClientRect();const w=rect.width,h=rect.height;if(w<=0||h<=0)return;const size=st.size;ctx.setTransform((canvas.width/w),0,0,(canvas.height/h),0,0);ctx.clearRect(0,0,w,h);const pad=5,cell=(Math.min(w,h)-pad*2)/size;const ox=(w-cell*size)/2,oy=(h-cell*size)/2;
  const bg=ctx.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#19232d');bg.addColorStop(1,'#0d131a');ctx.fillStyle=bg;roundRect(ctx,0,0,w,h,20);ctx.fill();
  // subtle board grid
  ctx.strokeStyle='rgba(255,255,255,.055)';ctx.lineWidth=1;for(let i=0;i<=size;i++){ctx.beginPath();ctx.moveTo(ox+i*cell,oy);ctx.lineTo(ox+i*cell,oy+size*cell);ctx.stroke();ctx.beginPath();ctx.moveTo(ox,oy+i*cell);ctx.lineTo(ox+size*cell,oy+i*cell);ctx.stroke()}
  for(const [key] of appState.walls){const [x,y]=key.split(',').map(Number);drawGlassRect(ox+x*cell+2,oy+y*cell+2,cell-4,cell-4,'#566372',.66,false)}
  for(const g of appState.goals){drawGoal(ox+g.x*cell+5,oy+g.y*cell+5,cell-10,g.c)}
  for(const b of appState.blocks){const color=COLORS[(Number.isFinite(b.c)?b.c:0)%COLORS.length];const bw=Math.max(6,b.w*cell-8),bh=Math.max(6,b.h*cell-8);drawBlock(ox+b.x*cell+4,oy+b.y*cell+4,bw,bh,color)}
}
function drawGlassRect(x,y,w,h,c,a=1,glow=true){ctx.save();if(glow){ctx.shadowColor=c;ctx.shadowBlur=16}const gr=ctx.createLinearGradient(x,y,x+w,y+h);gr.addColorStop(0,`rgba(255,255,255,.34)`);gr.addColorStop(.18,hexToRgba(c,.75));gr.addColorStop(1,hexToRgba(c,.35));ctx.fillStyle=gr;roundRect(ctx,x,y,w,h,Math.min(12,w*.2));ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,255,255,.2)';ctx.lineWidth=1;ctx.stroke();ctx.restore()}
function drawBlock(x,y,w,h,color){if(w<=0||h<=0)return;ctx.save();ctx.shadowColor=color;ctx.shadowBlur=20;drawGlassRect(x,y,w,h,color,.95,true);ctx.shadowBlur=0;const hi=ctx.createLinearGradient(x,y,x+w,y+h);hi.addColorStop(0,'rgba(255,255,255,.55)');hi.addColorStop(.25,'rgba(255,255,255,.08)');hi.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=hi;roundRect(ctx,x+2,y+2,w-4,h-4,11);ctx.fill();ctx.restore()}
function drawGoal(x,y,s,c){ctx.save();ctx.strokeStyle=c==null?'rgba(210,230,255,.65)':COLORS[c%COLORS.length];ctx.lineWidth=2;ctx.setLineDash([5,4]);ctx.shadowColor=ctx.strokeStyle;ctx.shadowBlur=12;roundRect(ctx,x,y,s,s,11);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='rgba(255,255,255,.03)';ctx.fill();ctx.restore()}
function hexToRgba(hex,a){const n=parseInt(hex.replace('#',''),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`}
function burst(){const r=canvas.getBoundingClientRect(),x=r.width/2,y=r.height/2;for(let i=0;i<24;i++){const ang=Math.random()*Math.PI*2,spd=40+Math.random()*100;const sx=x,sy=y,ex=x+Math.cos(ang)*spd,ey=y+Math.sin(ang)*spd;ctx.strokeStyle=COLORS[i%COLORS.length];ctx.globalAlpha=.7;ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(ex,ey);ctx.stroke()}ctx.globalAlpha=1}

let audioCtx=null;
function ensureAudio(){if(!appState.settings.sound)return null;try{audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();return audioCtx}catch{return null}}
function playTone(kind){const ac=ensureAudio();if(!ac)return;const o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);const t=ac.currentTime;let f=kind==='clear'?440:kind==='goal'?520:220;o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(kind==='clear'?880:f*1.25,t+.16);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.06,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+.18);o.start(t);o.stop(t+.2)}

async function requestTilt(){if(!('DeviceOrientationEvent' in window)){appState.settings.control='SWIPE';save();toast('センサー非対応 → スワイプでプレイ');return}
  try{if(typeof DeviceOrientationEvent.requestPermission==='function'){const p=await DeviceOrientationEvent.requestPermission();if(p!=='granted')throw new Error('denied')}appState.settings.control='TILT';save();toast('TILT操作 ON');$('sensorBar').textContent='TILT ON';$('sensorBar').classList.add('show');setTimeout(()=>$('sensorBar').classList.remove('show'),1200)}catch{appState.settings.control='SWIPE';save();toast('センサーは使わずスワイプでプレイ')}
}
function onOrientation(e){if(appState.state!=='PLAYING'||appState.settings.control!=='TILT')return;const gamma=e.gamma||0,beta=e.beta||0;const ax=Math.abs(gamma),ay=Math.abs(beta-45);let dir=null;if(ax>25&&ax>ay){dir=gamma>0?'RIGHT':'LEFT'}else if(ay>25){dir=(beta-45)>0?'DOWN':'UP'}if(dir&&dir!==onOrientation.last){onOrientation.last=dir;moveOneDirection(dir)}else if(!dir){onOrientation.last=null}}
let swipeStart=null;
function onPointerDown(e){swipeStart={x:e.clientX,y:e.clientY,t:performance.now()}}
function onPointerUp(e){if(!swipeStart)return;const dx=e.clientX-swipeStart.x,dy=e.clientY-swipeStart.y,dist=Math.hypot(dx,dy);swipeStart=null;if(dist<26)return;const dir=Math.abs(dx)>Math.abs(dy)?(dx>0?'RIGHT':'LEFT'):(dy>0?'DOWN':'UP');if(appState.settings.control!=='TILT')moveOneDirection(dir)}

$('playBtn').onclick=async()=>{loadSave();makeStage(0);if(appState.settings.control==='AUTO')await requestTilt()};
$('stageBtn').onclick=()=>{setScreen('stageScreen')};
$('backTitle').onclick=()=>setScreen('titleScreen');
$('stageMenuBtn').onclick=()=>setScreen('stageScreen');
$('undoBtn').onclick=undo;$('restartBtn').onclick=restart;$('nextBtn').onclick=()=>makeStage(Math.min(STAGES.length-1,appState.stageIndex+1));
$('pauseBtn').onclick=()=>{$('pauseOverlay').classList.add('active');appState.state='PAUSE'};$('resumeBtn').onclick=()=>{$('pauseOverlay').classList.remove('active');appState.state='PLAYING'};$('pauseStagesBtn').onclick=()=>{$('pauseOverlay').classList.remove('active');setScreen('stageScreen')};
window.addEventListener('resize',resize);window.addEventListener('orientationchange',()=>setTimeout(resize,180));window.addEventListener('deviceorientation',onOrientation);canvas.addEventListener('pointerdown',onPointerDown);canvas.addEventListener('pointerup',onPointerUp);canvas.addEventListener('pointercancel',()=>swipeStart=null);

document.addEventListener('visibilitychange',()=>{if(document.hidden&&appState.state==='PLAYING'){appState.state='PAUSE';$('pauseOverlay').classList.add('active')}});
loadSave();renderStageGrid();requestAnimationFrame(()=>{resize();draw();});
