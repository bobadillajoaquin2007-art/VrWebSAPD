// Minimal particles + tiny interactions
(function(){
  const c = document.getElementById('particles');
  if(!c) return; const ctx = c.getContext('2d');
  let W, H, parts = [], mouse = {x:null,y:null};
  function resize(){ W = c.width = innerWidth; H = c.height = innerHeight }
  function rand(a,b){ return Math.random()*(b-a)+a }
  function make(n){ parts = []; for(let i=0;i<n;i++) parts.push({x:Math.random()*W,y:Math.random()*H,r:rand(0.6,2.6),vx:rand(-0.3,0.3),vy:rand(-0.25,0.3),h:190+Math.random()*60}) }
  function draw(){ ctx.clearRect(0,0,W,H);
    for(let p of parts){
      // simple attraction to mouse
      if(mouse.x !== null){
        const dx = mouse.x - p.x; const dy = mouse.y - p.y; const d = Math.sqrt(dx*dx+dy*dy);
        if(d < 160){ p.vx += (dx/d)*0.02; p.vy += (dy/d)*0.02 }
      }
      p.x += p.vx; p.y += p.vy; p.vx *= 0.995; p.vy *= 0.995;
      if(p.x < -20) p.x = W+20; if(p.x > W+20) p.x = -20; if(p.y < -20) p.y = H+20; if(p.y > H+20) p.y = -20;
      ctx.beginPath(); ctx.fillStyle = `hsla(${p.h},100%,65%,0.12)`; ctx.shadowColor = `hsla(${p.h},100%,60%,0.08)`; ctx.shadowBlur = 8; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    // light connections
    for(let i=0;i<parts.length;i++){
      for(let j=i+1;j<parts.length;j++){
        const a = parts[i], b = parts[j]; const dx=a.x-b.x, dy=a.y-b.y; const d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){ ctx.beginPath(); ctx.strokeStyle = `rgba(77,211,255,${(110-d)/110*0.06})`; ctx.lineWidth=1; ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke() }
      }
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('mousemove', e=>{ mouse.x = e.clientX; mouse.y = e.clientY });
  window.addEventListener('mouseout', ()=>{ mouse.x = null; mouse.y = null });
  window.addEventListener('resize', ()=>{ resize(); make(Math.round((innerWidth*innerHeight)/90000)); });
  resize(); make(Math.round((innerWidth*innerHeight)/90000)); requestAnimationFrame(draw);
})();
