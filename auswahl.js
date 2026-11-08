'use strict';
(async ()=>{
 if(window.LDProfiles)await window.LDProfiles.ready;
 const $=id=>document.getElementById(id),names={reading:'Lesen und im Bild suchen',sort:'Was zischt denn da?',family:'Wie klingt es? · ich oder ach?'};
 let selected='reading',pending=null,hold=null,token=0;
 const settingsKey='lesedetektive:auswahl:v2:'+(window.LDProfiles?.active()?.id||'gast');let saved={};try{saved=JSON.parse(localStorage.getItem(settingsKey))||{};}catch{}
 function radios(name,value){for(const r of document.querySelectorAll('input[name="'+name+'"]'))r.checked=r.value===value;}
 function selection(){return document.querySelector('input[name="sequence"]:checked').value;}
 function mode(){return document.querySelector('input[name="mode"]:checked').value;}
 function update(){
  const normal=mode()==='normal',all=selected==='family'&&normal&&$('roundLength').value==='20';
  $('normalLengthOptions').hidden=!normal;$('sequenceOptions').hidden=false;$('packageOptions').hidden=all||selection()==='random';
  $('fixedLabel').textContent=all?'Feste Reihenfolge':'Paket';
  $('packageNote').textContent=all?'Du spielst alle 20 Wortpaare.':selection()==='fixed'?'In diesem Paket bleiben die Aufgaben und ihre Reihenfolge gleich.':'Für jede Runde werden die Aufgaben neu gemischt.';
  saved[selected]={mode:mode(),sequence:selection(),tasks:$('roundLength').value,packageId:$('packageChoice').value};try{localStorage.setItem(settingsKey,JSON.stringify(saved));}catch{}
 }
 function openGame(game){document.body.classList.remove('choosing');if(game!==selected)window.LDGame?.leave();
  selected=game;radios('game',game);const s=saved[game]||{mode:'normal',sequence:'fixed',tasks:'10'};
  radios('mode',s.mode);radios('sequence',s.sequence);$('roundLength').value=s.tasks||'10';
  $('packageChoice').replaceChildren(...LD_PACKAGES[game].map(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.label;return o;}));
  if(LD_PACKAGES[game].some(p=>p.id===s.packageId))$('packageChoice').value=s.packageId;
  $('pageTitle').textContent=names[game];$('home').hidden=true;$('setup').hidden=false;$('play').hidden=true;$('progressScreen').hidden=true;$('history').hidden=true;$('homeButton').hidden=false;
  update();window.LDGame?.prepare(game);if(window.LDNavigation)window.LDNavigation.show('setup',game);else history.replaceState(null,'','#'+game);window.scrollTo(0,0);
 }
 function home(){document.body.classList.add('choosing');window.LDGame?.leave();document.body.classList.remove('playing');document.body.classList.remove('searching-image');for(const id of ['setup','play','progressScreen','history'])$(id).hidden=true;$('home').hidden=false;$('homeButton').hidden=true;$('pageTitle').textContent='Lesedetektive';if(window.LDNavigation)window.LDNavigation.show('home');else history.replaceState(null,'',location.pathname+location.search);}
 function clean(){clearTimeout(hold);hold=null;token++;$('introVideo').pause();$('introVideo').removeAttribute('src');$('introVideo').load();}
 function enter(){const game=pending;pending=null;clean();$('introDialog').close();if(game)openGame(game);}
 async function play(){const t=token;try{await $('introVideo').play();if(t===token)$('introStart').hidden=true;}catch{if(t===token){$('introStart').hidden=false;$('introNote').textContent='Starte den Film oder gehe direkt zum Spiel.';}}}
 function intro(game){clean();pending=game;$('introTitle').textContent=names[game];$('introNote').textContent='';$('introStart').hidden=true;$('introVideo').src='assets/intro-'+game+'.mp4';$('introDialog').showModal();play();}
 for(const b of document.querySelectorAll('[data-game]'))b.onclick=()=>intro(b.dataset.game);
 for(const r of document.querySelectorAll('input[name="mode"],input[name="sequence"]'))r.addEventListener('change',update);
 $('roundLength').onchange=update;$('packageChoice').onchange=update;window.addEventListener('ld-settings-change',update);
 $('introVideo').onended=()=>{const t=token;hold=setTimeout(()=>{if(t===token)enter();},3000);};
 $('introVideo').onerror=()=>{$('introNote').textContent='Der Film konnte nicht geladen werden. Du kannst direkt zum Spiel gehen.';};
 $('introSkip').onclick=enter;$('introStart').onclick=play;$('introBack').onclick=()=>{$('introDialog').close();};
 $('introDialog').addEventListener('close',()=>{pending=null;clean();});$('homeButton').onclick=home;
 window.LDSelection={home,openGame};
 const route=location.hash.slice(1).split('/')[0];if(names[route])openGame(route);else home();
})();
