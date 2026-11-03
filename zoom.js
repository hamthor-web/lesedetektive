'use strict';
(()=>{
  const levels=[35,50,60,75,90,100,110,125,150,175,200],keys={image:'lesedetektive:zoom:v1',menu:'lesedetektive:ansichtzoom:v1'},values={image:100,menu:100},bars=[];
  for(const kind of Object.keys(values))try{const v=Number(localStorage.getItem(keys[kind]));if(levels.includes(v))values[kind]=v;}catch{}
  function apply(){
    document.documentElement.style.setProperty('--menu-zoom',values.menu/100);
    const stage=document.querySelector('.stage'),field=document.getElementById('playfield');
    if(stage&&field&&field.clientWidth){const portrait=typeof window!=='undefined'&&window.innerHeight>=window.innerWidth;const base=Math.max(140,Math.min(560,field.clientWidth-30,portrait?Math.max(210,window.innerHeight-220)*2/3:560));stage.style.width=Math.round(base*values.image/100)+'px';stage.style.maxWidth='none';}
    for(const {bar,kind}of bars){const value=values[kind];bar.hidden=kind==='image'&&!stage;bar.querySelector('[data-zoom="reset"]').textContent=value+' %';bar.querySelector('[data-zoom="out"]').disabled=value===levels[0];bar.querySelector('[data-zoom="in"]').disabled=value===levels.at(-1);}
    for(const kind of Object.keys(values))try{localStorage.setItem(keys[kind],String(values[kind]));}catch{}
  }
  function createBar(kind){const bar=document.createElement('nav');bar.className='zoom-controls';bar.setAttribute('aria-label',kind==='image'?'Suchbild vergrößern oder verkleinern':'Ansicht vergrößern oder verkleinern');bar.innerHTML='<span>'+(kind==='image'?'Bild':'Ansicht')+'</span><button type="button" data-zoom="out" aria-label="Verkleinern">−</button><button type="button" data-zoom="reset" aria-label="Zoom auf 100 Prozent zurücksetzen" title="Auf 100 % zurücksetzen"></button><button type="button" data-zoom="in" aria-label="Vergrößern">+</button>';for(const action of ['out','reset','in'])bar.querySelector('[data-zoom="'+action+'"]').addEventListener('click',()=>{values[kind]=action==='reset'?100:levels[Math.max(0,Math.min(levels.length-1,levels.indexOf(values[kind])+(action==='in'?1:-1)))];apply();});bars.push({bar,kind});return bar;}
  document.body.prepend(createBar('menu'));
  const game=document.querySelector('.round-stats');if(game)game.append(createBar('image'));
  const welcome=document.querySelector('.welcome-controls');if(welcome)welcome.prepend(createBar('menu'));
  apply();
  if(typeof window!=='undefined'){window.LDZoomRefresh=apply;let landscape=window.innerWidth>window.innerHeight;window.addEventListener('resize',()=>{apply();const next=window.innerWidth>window.innerHeight;if(next!==landscape&&document.body.classList.contains('playing'))document.getElementById('play')?.scrollIntoView({block:'start'});landscape=next;});if(typeof ResizeObserver!=='undefined'){const f=document.getElementById('playfield');if(f)new ResizeObserver(apply).observe(f);}}
})();
