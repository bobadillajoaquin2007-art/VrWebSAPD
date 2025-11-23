// Simple particles canvas — lightweight and configurable
(function(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = {x: null, y: null};

  function resize(){
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  }

  function rand(min,max){ return Math.random()*(max-min)+min }

  function createParticles(count){
    particles = [];
    for(let i=0;i<count;i++){
      particles.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: rand(0.8,2.6),
        vx: rand(-0.3,0.3),
        vy: rand(-0.2,0.4),
        hue: 190 + Math.random()*60,
        life: rand(40,160)
      })
    }
  }

  function step(){
    ctx.clearRect(0,0,W,H);
    for(let p of particles){
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.2;
      // wrap
      if(p.x < -20) p.x = W+20;
      if(p.x > W+20) p.x = -20;
      if(p.y < -20) p.y = H+20;
      if(p.y > H+20) p.y = -20;

      // attraction to mouse
      if(mouse.x !== null){
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if(d < 140){ p.vx += dx*0.0008; p.vy += dy*0.0008 }
      }

      ctx.beginPath();
      const alpha = Math.max(0.06, Math.min(0.9, p.life/140));
      ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${alpha})`;
      ctx.shadowColor = `hsla(${p.hue},100%,60%,${alpha*0.6})`;
      ctx.shadowBlur = 8;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    // connect nearby particles lightly
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a = particles[i], b = particles[j];
        const dx = a.x-b.x, dy = a.y-b.y; const d = Math.sqrt(dx*dx+dy*dy);
        if(d<110){ ctx.beginPath(); ctx.strokeStyle = `rgba(77,211,255,${(110-d)/110*0.06})`; ctx.lineWidth=1; ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke() }
      }
    }
    requestAnimationFrame(step);
  }

  window.addEventListener('resize', ()=>{ resize(); createParticles(Math.round((innerWidth*innerHeight)/80000)) });
  window.addEventListener('mousemove', (e)=>{ mouse.x = e.clientX; mouse.y = e.clientY });
  window.addEventListener('mouseout', ()=>{ mouse.x = null; mouse.y = null });

  resize(); createParticles(Math.round((innerWidth*innerHeight)/80000));
  requestAnimationFrame(step);
})();
