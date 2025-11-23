// Minimal particles + tiny interactions
(function(){
  const c = document.getElementById('particles');
  if(!c) return; const ctx = c.getContext('2d');
  let W, H, parts = [];
  function resize(){ W = c.width = innerWidth; H = c.height = innerHeight }
  function rand(a,b){ return Math.random()*(b-a)+a }
  function make(n){ parts = []; for(let i=0;i<n;i++) parts.push({x:Math.random()*W,y:Math.random()*H,r:rand(0.6,2.4),vx:rand(-0.2,0.2),vy:rand(-0.15,0.25)}) }
  function draw(){ ctx.clearRect(0,0,W,H); for(let p of parts){ p.x+=p.vx; p.y+=p.vy; if(p.x<-10) p.x=W+10; if(p.x>W+10) p.x=-10; if(p.y<-10) p.y=H+10; if(p.y>H+10) p.y=-10; ctx.beginPath(); ctx.fillStyle='rgba(77,211,255,0.12)'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', ()=>{ resize(); make(Math.round((innerWidth*innerHeight)/100000)); });
  resize(); make(Math.round((innerWidth*innerHeight)/100000)); requestAnimationFrame(draw);
})();
