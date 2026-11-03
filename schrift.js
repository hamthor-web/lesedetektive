'use strict';
(()=>{
  const KEY='lesedetektive:suchwort-schrift:v1',levels=[100,110,125,150,175,200];
  let value=100;try{const saved=Number(localStorage.getItem(KEY));if(levels.includes(saved))value=saved;}catch{}
  const controls=document.createElement('nav');controls.className='word-size-controls';controls.setAttribute('aria-label','Schriftgröße der Suchwörter');
  controls.innerHTML='<span>Schrift <strong data-font-value></strong></span><button type="button" data-font="out" aria-label="Suchwörter kleiner">−</button><button type="button" data-font="in" aria-label="Suchwörter größer">+</button>';
  function apply(){document.documentElement.style.setProperty('--search-word-scale',value/100);controls.querySelector('[data-font-value]').textContent=value+' %';controls.querySelector('[data-font="out"]').disabled=value===levels[0];controls.querySelector('[data-font="in"]').disabled=value===levels.at(-1);try{localStorage.setItem(KEY,String(value));}catch{}}
  for(const action of ['out','in'])controls.querySelector('[data-font="'+action+'"]').addEventListener('click',()=>{value=levels[Math.max(0,Math.min(levels.length-1,levels.indexOf(value)+(action==='in'?1:-1)))];apply();});
  document.querySelector('.round-actions')?.append(controls);apply();
})();
