'use strict';
(() => {
  const KEY = 'lesedetektive:zoom:v1';
  const levels = [35, 50, 60, 75, 90, 100, 110, 125, 150, 175, 200];
  let value = 100;
  try { const stored = Number(localStorage.getItem(KEY)); if (levels.includes(stored)) value = stored; } catch {}
  const bars = [];
  function apply() {
    document.documentElement.style.setProperty('--app-zoom', value / 100);
    document.documentElement.toggleAttribute('data-app-zoomed', value > 100);
    const stage=document.querySelector('.stage'),field=document.getElementById('playfield');
    if(stage&&field&&field.clientWidth){
      const portrait=typeof window!=='undefined'&&window.innerHeight>=window.innerWidth;
      const base=Math.max(140,Math.min(560,field.clientWidth-30,portrait?Math.max(210,window.innerHeight-220)*2/3:560));
      stage.style.width=Math.round(base*value/100)+'px';
      stage.style.maxWidth='none';
    }
    for (const bar of bars) {
      bar.querySelector('[data-zoom="reset"]').textContent = value + ' %';
      bar.querySelector('[data-zoom="out"]').disabled = value === levels[0];
      bar.querySelector('[data-zoom="in"]').disabled = value === levels[levels.length - 1];
    }
    try { localStorage.setItem(KEY, String(value)); } catch {}
  }
  function createBar() {
    const bar = document.createElement('nav');
    bar.className = 'zoom-controls';
    bar.setAttribute('aria-label', 'Ansicht vergrößern oder verkleinern');
    bar.innerHTML = '<span>Zoom</span><button type="button" data-zoom="out" aria-label="Verkleinern">−</button><button type="button" data-zoom="reset" aria-label="Zoom auf 100 Prozent zurücksetzen" title="Auf 100 % zurücksetzen"></button><button type="button" data-zoom="in" aria-label="Vergrößern">+</button>';
    for (const action of ['out', 'reset', 'in']) bar.querySelector('[data-zoom="' + action + '"]').addEventListener('click', () => {
      value = action === 'reset' ? 100 : levels[Math.max(0, Math.min(levels.length - 1, levels.indexOf(value) + (action === 'in' ? 1 : -1)))];
      apply();
    });
    bars.push(bar);
    return bar;
  }
  document.body.prepend(createBar());
  const gameControls=document.querySelector('.round-stats');
  if(gameControls)gameControls.append(createBar());
  // Modal dialogs need their own controls: the background is intentionally inert.
  const welcome = document.querySelector('.welcome-controls');
  if (welcome) welcome.prepend(createBar());
  const intro = document.getElementById('introDialog');
  if (intro) intro.prepend(createBar());
  apply();
  if(typeof window!=='undefined'){
    window.LDZoomRefresh=apply;
    window.addEventListener('resize',apply);
    if(typeof ResizeObserver!=='undefined'){const field=document.getElementById('playfield');if(field)new ResizeObserver(apply).observe(field);}
  }
})();
