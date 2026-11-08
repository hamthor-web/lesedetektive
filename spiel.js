'use strict';
// The small timing core is also used by the automated prototype checks.
const LD_TIME = (() => {
  function shuffle(values, random=Math.random) { const a=[...values]; for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a; }
  class Round {
    constructor(config,size,now,random=Math.random){this.config={...config};this.size=size;this.target=config.mode==='normal'?([10,15,20].includes(config.tasks)?config.tasks:10):10;this.random=random;this.started=now;this.solved=0;this.errors=0;this.running=true;this.elapsed=0;this.cycle=0;this.queue=this.makeQueue();this.position=0;this.status='';}
    makeQueue(){const q=this.config.indices?[...this.config.indices]:Array.from({length:this.size},(_,i)=>i);return this.config.sequence==='random'?shuffle(q,this.random):q;}
    current(){return this.queue[this.position];}
    pause(now){if(!this.running||this.paused!==undefined||this.tick(now))return;this.paused=now;}
    resume(now){if(this.paused!==undefined){this.started+=Math.max(0,now-this.paused);this.paused=undefined;}}
    tick(now){if(!this.running||this.paused!==undefined)return false;this.elapsed=Math.max(0,now-this.started);if(this.config.mode==='minute'&&this.elapsed>=60000){this.elapsed=60000;this.running=false;this.status='Zeit abgelaufen';return true}return false;}
    solve(now){if(!this.running||this.paused!==undefined||this.tick(now))return false;this.solved++;if(this.config.mode==='normal'&&this.solved===this.target){this.running=false;this.status='Runde abgeschlossen';return true}if(this.config.mode==='ten'&&this.solved===10){this.running=false;this.status='10 Aufgaben geschafft';return true}const last=this.current();this.position++;if(this.position===this.queue.length){this.queue=this.makeQueue();if(this.config.sequence==='random'&&this.size>1&&this.queue[0]===last)[this.queue[0],this.queue[1]]=[this.queue[1],this.queue[0]];this.position=0;this.cycle++}return true;}
    wrong(now){if(!this.running||this.paused!==undefined||this.tick(now))return;this.errors++;}
    stop(now){this.resume(now);if(!this.running||this.tick(now))return;this.running=false;this.status='Vorzeitig beendet';}
  }
  function inside(p,poly){let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if(((a[1]>p[1])!==(b[1]>p[1]))&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes}return yes;}
  function duration(ms){const n=Math.max(0,Math.round(ms/1000)),m=Math.floor(n/60),seconds=n%60;return m?(m+' '+(m===1?'Minute':'Minuten')+(seconds?' '+seconds+' '+(seconds===1?'Sekunde':'Sekunden'):'')):seconds+' '+(seconds===1?'Sekunde':'Sekunden');}

  return {Round,shuffle,inside,duration};
})();
if(typeof module!=='undefined')module.exports=LD_TIME;
if(typeof document!=='undefined')(async () => {
  if(window.LDProfiles)await window.LDProfiles.ready;
  const $=id=>document.getElementById(id),D=window.LD_DATA,KEY='lesedetektive:ergebnisse:v2:'+ (window.LDProfiles?.active()?.id||'gast');
  const labels={reading:'Lesen und im Bild suchen',sort:'Was zischt denn da? · CH oder SCH?',family:'Wie klingt es? · ich oder ach?'};
  const groups=[[D.soft,'soft'],[D.rough,'rough'],[D.sh,'sh']],sorting=[];
  for(let i=0;i<Math.max(...groups.map(([words])=>words.length));i++)for(const [words,group] of groups)if(i<words.length)sorting.push([words[i],group]);
  const sizes={reading:D.cards.length,sort:sorting.length,family:D.families.length};
  let round=null,interval=null,found=new Set(),targetOrder=[],question='ich',records=[],saved=false,persistent=true,phase='text',lastCheckpoint=0;
  try{const data=JSON.parse(localStorage.getItem(KEY));if(Array.isArray(data))records=data.filter(r=>r&&labels[r.game]&&['normal','minute','ten'].includes(r.mode)&&['fixed','random'].includes(r.sequence)&&Number.isFinite(r.elapsed)&&Number.isInteger(r.solved)&&Number.isInteger(r.errors)&&typeof r.date==='string'&&typeof r.status==='string');}catch{persistent=false;}
  const now=()=>performance.now();
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const modeName=mode=>mode==='normal'?'Ohne Zeit':mode==='minute'?'1 Minute':'10 Aufgaben';
  const sequenceName=sequence=>sequence==='fixed'?'Fest':'Zufällig';
  function config(){
 const c=Object.fromEntries(['game','mode','sequence'].map(k=>[k,document.querySelector('input[name="'+k+'"]:checked').value]));
 if(c.mode==='normal')c.tasks=[10,15,20].includes(Number($('roundLength').value))?Number($('roundLength').value):10;
 const all=c.game==='family'&&c.mode==='normal'&&c.tasks===20;
 c.packageId=c.sequence==='random'?'random':all?'all':($('packageChoice').value||LD_PACKAGES[c.game][0].id);
 if(c.sequence==='fixed'&&!all){const p=LD_PACKAGES[c.game].find(p=>p.id===c.packageId)||LD_PACKAGES[c.game][0];c.packageId=p.id+'-v2';c.indices=p.indices.slice(0,c.mode==='ten'?10:c.mode==='normal'?c.tasks:20);}
 return c;
 }
 window.LDConfig=config;
  function show(id){document.body?.classList.remove('choosing');window.LDNavigation?.show(id==='progressScreen'?'progress':id);document.body?.classList.toggle('playing',id==='play');if(id!=='play')document.body?.classList.remove('searching-image');else if($('picture')?.isConnected)document.body?.classList.add('searching-image');for(const k of ['setup','play','progressScreen'])$(k).hidden=k!==id;$('history').hidden=true;$('home').hidden=true;$('homeButton').hidden=id==='play'||(id==='progressScreen'&&round?.running===true);}
  function message(text){$('feedback').textContent=text;}
  function currentCard(){return D.cards[round.current()];}
  function active(){return targetOrder.find(t=>currentCard().regions.some(r=>r.target===t&&!found.has(r.id)));}
  function clock(){if(!round)return;$('clock').textContent=round.config.mode==='minute'?String(Math.floor(Math.ceil(Math.max(0,60000-round.elapsed)/1000)/60)).padStart(2,'0')+':'+String(Math.ceil(Math.max(0,60000-round.elapsed)/1000)%60).padStart(2,'0'):String(Math.floor(round.elapsed/60000)).padStart(2,'0')+':'+String(Math.floor(round.elapsed/1000)%60).padStart(2,'0');$('clock').setAttribute('aria-label',LD_TIME.duration(round.elapsed));if(round.config.mode==='minute'&&round.elapsed===0)$('clock').textContent='01:00';$('score').textContent=round.solved+(round.config.mode==='normal'?' / '+round.target:round.config.mode==='ten'?' / 10':'');document.querySelector('.clockbar').classList.toggle('urgent',round.config.mode==='minute'&&round.elapsed>=50000);}
  function tick(){if(!round?.running)return;if(round.tick(now()))finish();else {clock();if(Date.now()-lastCheckpoint>=1000)checkpoint();}}
  // Every answer checks the real elapsed time, including after a background tab.
  function canAnswer(){if(!round?.running||round.paused!==undefined)return false;if(round.tick(now())){finish();return false}return true;}
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(records));persistent=true;}catch{persistent=false;}history();}
  function record(){if(saved)return;saved=true;const normal=round.config.mode==='normal',flowers=normal&&round.status==='Runde abgeschlossen'?({10:1,15:2,20:3}[round.target]||0):0;records.push({date:new Date().toISOString(),...round.config,solved:round.solved,elapsed:normal?0:Math.round(round.elapsed),errors:round.errors,status:round.status,...(normal?{tasks:round.target,flowers}:{})});persist();}

  const checkpointKey=game=>'round-v1:'+game;
  function checkpoint(){
    if(!round?.running)return;
    if(round.tick(now())){finish();return;}
    const state={...round,random:undefined,elapsed:round.elapsed,found:[...found],targetOrder,question,phase,at:Date.now(),technicalPause:round.paused!==undefined};
    window.LDProfiles?.save(checkpointKey(round.config.game),state);
    lastCheckpoint=Date.now();
  }
  function clearCheckpoint(){window.LDProfiles?.save(checkpointKey(round.config.game),null);}
  function prepare(game){
    const data=window.LDProfiles?.load(checkpointKey(game));
    const available=round?.running&&round.config.game===game||!!data;
    $('setupResume').hidden=!available;$('setupNotice').hidden=!available;
    $('setupNotice').textContent=available?'Deine Runde ist gespeichert. Tippe auf „Runde fortsetzen“, um weiterzuspielen.':'';
  }
  function restore(game){
    const data=window.LDProfiles?.load(checkpointKey(game));
    if(!data)return false;
    try{
      if(data.config?.game!==game||!['normal','minute','ten'].includes(data.config.mode)||!['fixed','random'].includes(data.config.sequence)||!Array.isArray(data.queue)||!data.queue.length||data.queue.some(i=>!Number.isInteger(i)||i<0||i>=sizes[game])||!Number.isInteger(data.position)||data.position<0||data.position>=data.queue.length||!Number.isInteger(data.solved)||data.solved<0||!Number.isInteger(data.errors)||data.errors<0||!Number.isFinite(data.elapsed)||data.elapsed<0||!Number.isFinite(data.at))throw Error('Invalid round');
      round=new LD_TIME.Round(data.config,sizes[game],now());
      Object.assign(round,{queue:data.queue,position:data.position,solved:data.solved,errors:data.errors,cycle:data.cycle||0});
      const elapsed=data.elapsed+(data.config.mode!=='normal'&&!data.technicalPause?Math.max(0,Date.now()-data.at):0);
      round.started=now()-elapsed;round.elapsed=elapsed;saved=false;
      found=new Set(Array.isArray(data.found)?data.found:[]);targetOrder=Array.isArray(data.targetOrder)?data.targetOrder:[];question=data.question==='ach'?'ach':'ich';phase=data.phase==='image'?'image':'text';
      document.body.dataset.game=game;$('modeLabel').textContent=round.config.mode==='normal'?'In Ruhe spielen':round.config.mode==='minute'?'Verbleibende Zeit':'Stoppuhr';$('clock').hidden=round.config.mode==='normal';
      if(round.tick(now())){finish();return true;}
      show('play');task(true);clock();clearInterval(interval);interval=round.config.mode==='normal'?null:setInterval(tick,50);checkpoint();return true;
    }catch{window.LDProfiles?.save(checkpointKey(game),null);round=null;prepare(game);return false;}
  }
  function resumeRound(){
    if(round?.running){tick();if(round.running)show('play');}
    else restore(config().game);
  }
  function finish(){clearCheckpoint();clearInterval(interval);interval=null;if('speechSynthesis'in window)speechSynthesis.cancel();clock();record();openProgress(round.config.mode==='normal'?round.status==='Runde abgeschlossen':round.status==='Zeit abgelaufen'||round.status==='10 Aufgaben geschafft');$('resultTitle').textContent=round.status;$('resultText').textContent=round.config.mode==='normal'?round.solved+' von '+round.target+' Aufgaben gelöst.'+(round.status==='Runde abgeschlossen'?' Du bekommst '+({10:1,15:2,20:3}[round.target])+' '+(round.target===10?'neue Blüte':'neue Blüten')+' für deinen Strauß.':' Dein bisheriger Strauß bleibt erhalten; für diese abgebrochene Runde kommt keine Blüte hinzu.'):round.config.mode==='minute'?round.solved+' Aufgaben in '+LD_TIME.duration(round.elapsed)+' gelöst.':round.solved+' von 10 Aufgaben in '+LD_TIME.duration(round.elapsed)+' gelöst.';if(round.config.mode!=='normal')$('resultText').textContent+=' '+round.errors+' Fehlversuche. '+sequenceName(round.config.sequence)+'e Reihenfolge.';if(!progressIntro)$('again').focus();}
  function solve(){if(!canAnswer())return;round.solve(now());if(!round.running){finish();return}clock();task();checkpoint();message('Richtig! Weiter geht’s.');}
  function shake(button){if(!button)return;button.classList.remove('wrong-answer');void button.offsetWidth;button.classList.add('wrong-answer');button.addEventListener('animationend',()=>button.classList.remove('wrong-answer'),{once:true});}
  function wrong(text,button){if(!canAnswer())return;round.wrong(now());if(!round.running){finish();return}shake(button);message(text);checkpoint();}
  function speak(word){if(!canAnswer())return;if(!('speechSynthesis'in window)){message('Bitte lass dir das Wort von deiner Begleitperson vorlesen.');return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(word);u.lang='de-DE';u.rate=.78;speechSynthesis.speak(u);}
  function words(){const c=currentCard(),a=active();$('words').innerHTML='<strong>Suche</strong>'+c.targets.map(t=>{const n=c.regions.filter(r=>r.target===t.label&&found.has(r.id)).length;return '<span class="word'+(a===t.label?' current':'')+(n===t.count?' done':'')+'">'+escape(t.label)+' · '+n+'/'+t.count+'</span>';}).join('');}
  function reveal(){if(!canAnswer())return;phase='image';checkpoint();document.body?.classList.add('searching-image');const c=currentCard();$('task').innerHTML='<div id="words" class="words"></div><div class="stage"><img id="picture" alt="Suchbild zur Lesekarte"><div id="overlay" class="overlay" role="group" aria-label="Suchbild: Finde die gesuchten Dinge"></div></div><p id="imageIssue" class="image-issue" role="alert" hidden>Das Bild konnte nicht geladen werden. Die Zeit ist angehalten. <button id="retryImage">Bild erneut laden</button></p><p><button id="reread">Noch einmal lesen</button></p>';const img=$('picture');img.onload=()=>{if($('picture')!==img||!round?.running)return;round.resume(now());checkpoint();$('imageIssue').hidden=true;message('Suche: '+active());};img.onerror=()=>{if($('picture')!==img||!round?.running)return;round.pause(now());if(!round.running){finish();return}$('imageIssue').hidden=false;message('Technischer Ladefehler – die Runde bleibt erhalten.');clock();checkpoint();};$('retryImage').onclick=()=>{if(round?.running)img.src=c.image;};img.src=c.image;window.LDZoomRefresh?.();words();$('reread').onclick=()=>{if(canAnswer())reading(false)};
    for(const r of c.regions)if(found.has(r.id))placeStar(r,$('overlay'));
    $('overlay').onpointerdown=e=>{if(e.button!==0||!canAnswer())return;const b=$('overlay').getBoundingClientRect();if(!b.width||!b.height||!$('picture').naturalWidth)return;const p=[(e.clientX-b.left)/b.width,(e.clientY-b.top)/b.height];const a=active(),hit=c.regions.find(r=>r.target===a&&!found.has(r.id)&&LD_TIME.inside(p,r.points));if(!hit){if(c.regions.some(r=>found.has(r.id)&&LD_TIME.inside(p,r.points)))return;wrong('Schau noch einmal nach „'+a+'“.');return}found.add(hit.id);checkpoint();star(hit);words();if(!active())solve();else message('Gefunden!');};
  }
  function star(r){sparkle(r);}
  function placeStar(r,stage){const xs=r.points.map(p=>p[0]),ys=r.points.map(p=>p[1]),p=r.starPosition||[(Math.min(...xs)+Math.max(...xs))/2,(Math.min(...ys)+Math.max(...ys))/2],s=document.createElement('span');s.className='star';s.textContent='★';s.style.left=p[0]*100+'%';s.style.top=p[1]*100+'%';stage.append(s);}
  function sparkle(region){
 const xs=region.points.map(p=>p[0]),ys=region.points.map(p=>p[1]);
 const burst=document.createElement('div');
 burst.className='treffer-funkenregen';burst.setAttribute('aria-hidden','true');
 burst.style.left=((Math.min(...xs)+Math.max(...xs))*50)+'%';
 burst.style.top=((Math.min(...ys)+Math.max(...ys))*50)+'%';
 const reduced=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 const flash=document.createElement('span');flash.className='treffer-blitz';flash.textContent='✦';burst.append(flash);
 for(let i=0;i<72;i++){
  const p=document.createElement('span'),angle=Math.random()*Math.PI*2;
  const spread=70+Math.random()*135,dx=Math.cos(angle)*spread,dy=-70-Math.random()*140;
  p.className='treffer-funke';p.textContent=i%3===0?'✦':'•';
  p.style.setProperty('--dx',dx+'px');p.style.setProperty('--dy',dy+'px');
  p.style.setProperty('--endx',(dx*1.25)+'px');p.style.setProperty('--endy',(80+Math.random()*150)+'px');
  p.style.setProperty('--dauer',(1.6+Math.random()*.7)+'s');
  p.style.setProperty('--farbe',i%3===0?'#ffffff':i%3===1?'#ffe773':'#ffb700');
  p.style.setProperty('--groesse',(i%3===0?22+Math.random()*22:24+Math.random()*20)+'px');
  if(reduced){p.style.animation='trefferRuhig 1.8s ease-out forwards';p.style.marginLeft=dx*.5+'px';p.style.marginTop=dy*.5+'px'}
  burst.append(p);
 }
 const stage=$('overlay');const rect=stage.getBoundingClientRect();burst.style.position='fixed';burst.style.left=(rect.left+(Math.min(...xs)+Math.max(...xs))/2*rect.width)+'px';burst.style.top=(rect.top+(Math.min(...ys)+Math.max(...ys))/2*rect.height)+'px';burst.style.zIndex='450';document.body?.append(burst);setTimeout(()=>{burst.remove();if(stage.isConnected)placeStar(region,stage);},2300);
}

  function reading(fresh=true){phase='text';document.body?.classList.remove('searching-image');const c=currentCard();if(fresh){found=new Set();targetOrder=c.targets.map(t=>t.label);if(round.config.sequence==='random')targetOrder=LD_TIME.shuffle(targetOrder);}$('task').innerHTML='<p class="eyebrow">'+(c.type==='Wortduell'?'Lies die Wörter':'Lies in Ruhe')+'</p><div class="reading'+(c.lines.length>2?' story':'')+'">'+escape(c.lines.join('\n'))+'</div><p class="read-actions"><button id="read" class="primary">Gelesen – Bild öffnen</button></p>';$('read').onclick=reveal;checkpoint();}
  function task(restoring=false){if($('playfield'))$('playfield').scrollTop=0;message('');$('roundLabel').textContent=labels[round.config.game]+' · '+sequenceName(round.config.sequence)+'e Reihenfolge · Aufgabe '+(round.solved+1);if(round.config.game==='reading'){const image=phase==='image';reading(!restoring);if(restoring&&image)reveal();return}
    const i=round.current();if(round.config.game==='sort'){const [w,group]=sorting[i];$('task').innerHTML='<p class="eyebrow">CH oder SCH?</p><p>Lies das Wort laut. Wie klingt es?</p><div class="reading">'+escape(w)+'</div><button id="hear">🔊 Wort hören</button><div class="answers">'+[['soft','CH wie in ich'],['rough','CH wie in ach'],['sh','SCH wie in Schule']].map(([g,t])=>'<button data-group="'+g+'">'+t+'</button>').join('')+'</div>';$('hear').onclick=()=>speak(w);for(const b of $('task').querySelectorAll('[data-group]'))b.onclick=()=>{if(!canAnswer())return;if(b.dataset.group===group)solve();else wrong('Hör noch einmal genau hin. Versuche es erneut.',b);};
    }else{const f=D.families[i];if(!restoring)question=Math.random()<.5?'ich':'ach';$('task').innerHTML='<p class="eyebrow">WIE KLINGT ES? · ICH ODER ACH?</p><h2>Lies beide Wörter.</h2><p>Die Buchstaben <strong>ch</strong> bleiben gleich. Lies dann den Text darunter.</p><div class="duel">'+f.slice(0,2).map((w,j)=>'<button data-hear="'+j+'">'+escape(w)+' 🔊</button>').join('')+'</div>'+(f[2]?'<p class="question">'+escape(f[2])+'</p>':'')+'<p class="question">In welchem Wort klingt <strong>ch</strong> wie in <strong>'+question+'</strong>?</p><div class="duel answers">'+f.slice(0,2).map((w,j)=>'<button data-answer="'+j+'">'+escape(w)+'</button>').join('')+'</div>';for(const b of $('task').querySelectorAll('[data-hear]'))b.onclick=()=>speak(f[Number(b.dataset.hear)]);for(const b of $('task').querySelectorAll('[data-answer]'))b.onclick=()=>{if(!canAnswer())return;if(Number(b.dataset.answer)===(question==='ich'?1:0))solve();else wrong('Sprich beide Wörter noch einmal. Suche den Klang wie in „'+question+'“.',b);};}
  }
  function start(chosen=config()){document.body.dataset.game=chosen.game;if(round?.running){round.stop(now());clearCheckpoint();record();}clearInterval(interval);$('setupResume').hidden=true;$('setupNotice').hidden=true;if('speechSynthesis'in window)speechSynthesis.cancel();saved=false;round=new LD_TIME.Round(chosen,sizes[chosen.game],now());$('modeLabel').textContent=chosen.mode==='normal'?'In Ruhe spielen':chosen.mode==='minute'?'Verbleibende Zeit':'Stoppuhr';$('clock').hidden=chosen.mode==='normal';show('play');clock();task();checkpoint();$('gameMenu').open=false;interval=chosen.mode==='normal'?null:setInterval(tick,50);$('play').scrollIntoView({block:'start'});}
  function history(){const body=$('records');body.replaceChildren();for(const r of [...records].reverse()){const tr=document.createElement('tr');for(const text of [new Date(r.date).toLocaleString('de-DE'),labels[r.game],modeName(r.mode),(r.packageId&&r.packageId!=='random'?r.packageId==='all'?'Alle Wortpaare':r.packageId.replace(/^.*-p/,'Paket '):sequenceName(r.sequence)),r.solved+(r.mode==='ten'?' / 10':'')+' Aufgaben',r.mode==='normal'?'ohne Zeitmessung':LD_TIME.duration(r.elapsed),r.errors,r.status]){const td=document.createElement('td');td.textContent=text;tr.append(td);}body.append(tr);}$('empty').hidden=records.length>0;$('storageStatus').textContent=persistent?'Die Ergebnisse werden nur lokal in dieser Prototypfassung gespeichert.':'Dein Browser erlaubt kein dauerhaftes Speichern. Die Ergebnisse gelten für diese Sitzung.';}
  $('start').onclick=()=>start();$('abort').onclick=()=>{if(!round?.running)return;round.stop(now());finish();};$('again').onclick=()=>start(round.config);$('choose').onclick=variants;
  let progressReady=false,progressIntro=false,introFallback=null;
  function sendProgress(){if(!progressReady)return;const active=round?.config||config();$('progressFrame').contentWindow?.postMessage({type:'LD_PROGRESS_DATA',records,config:active,animate:progressIntro},'*');}
  function finishIntro(){clearTimeout(introFallback);introFallback=null;progressIntro=false;document.body?.classList.toggle('progress-intro',false);$('progressFrame').contentWindow?.postMessage({type:'LD_PROGRESS_CANCEL_INTRO'},'*');if(!round?.running)$('again').focus();}
  function openProgress(animate=false){progressIntro=animate;document.body?.classList.toggle('progress-intro',animate);clearTimeout(introFallback);if(animate)introFallback=setTimeout(finishIntro,45000);show('progressScreen');const running=round?.running===true;const timed=running&&round.config.mode!=='normal';$('progressNotice').textContent=timed?'Deine Zeitrunde läuft weiter, während du die Ergebnisse ansiehst.':running?'Deine Aufgabe wartet auf dich. Mit „Zurück zum Spiel“ kannst du weitermachen.':'Deine Fortschritte aus den gespielten Aufgaben und Runden.';$('resume').hidden=!running;$('again').hidden=running||!round;$('choose').hidden=running;$('resultTitle').textContent=running?'Deine Ergebnisübersicht':'Deine Fortschritte';$('resultText').textContent='';sendProgress();$('progressScreen').scrollIntoView({block:'start'});}
  $('viewProgress').onclick=()=>openProgress();$('setupProgress').onclick=()=>openProgress();$('resume').onclick=()=>{if(round?.running){tick();if(round.running)show('play');}else show('setup');};
  window.addEventListener('message',event=>{if(event.source!==$('progressFrame').contentWindow)return;if(event.data?.type==='LD_PROGRESS_DONE'){finishIntro();return;}if(event.data?.type==='LD_PROGRESS_READY'){progressReady=true;sendProgress();}if(event.data?.type==='LD_PROGRESS_HEIGHT'&&Number.isFinite(event.data.height))$('progressFrame').style.height=Math.max(200,Math.min(12000,event.data.height))+'px';});
  const embeddedProgress=JSON.parse($('progressSource').textContent).html;if(embeddedProgress)$('progressFrame').srcdoc=embeddedProgress;else $('progressFrame').src='fortschritt/ansicht.html';
  function modeSelection(){window.dispatchEvent(new Event('ld-settings-change'));}
  for(const input of document.querySelectorAll('input[name="mode"]'))input.addEventListener('change',modeSelection);
  function variants(){finishIntro();show('setup');const running=round?.running===true;$('setupResume').hidden=!running;$('setupNotice').hidden=!running;$('setupNotice').textContent=running&&round.config.mode!=='normal'?'Die Zeit deiner laufenden Runde läuft weiter. Du kannst zurückkehren oder eine neue Variante starten.':running?'Deine laufende Runde wartet auf dich. Eine neue Runde beginnt erst mit Los!':'';window.dispatchEvent(new Event('ld-settings-change'));if(!running)prepare(config().game);$('setup').scrollIntoView({block:'start'});}
  function leave(){checkpoint();clearInterval(interval);interval=null;finishIntro();round=null;$('setupResume').hidden=true;$('setupNotice').hidden=true;if('speechSynthesis'in window)speechSynthesis.cancel();}
  $('variants').onclick=variants;$('setupResume').onclick=resumeRound;
  window.LDGame={leave,prepare,openView(view){if(view==='play'&&round?.running){show('play');$('play').scrollIntoView({block:'start'});}else if(view==='progress')openProgress();else variants();}};
  document.addEventListener('visibilitychange',()=>{tick();checkpoint();});window.addEventListener('pagehide',checkpoint);window.addEventListener('pageshow',tick);document.querySelectorAll('[data-profile-switch],[data-app-action=update]').forEach(b=>b.addEventListener('click',checkpoint));history();show('setup');
})();
