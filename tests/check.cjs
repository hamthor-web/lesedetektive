const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');const dir=path.dirname(__dirname);
class E{constructor(){this.style={setProperty(){}};this.value='';this.textContent='';this.children=[];const classes=new Set();this.classList={toggle(k,b){if(b===undefined)b=!classes.has(k);b?classes.add(k):classes.delete(k)},add:k=>classes.add(k),remove:k=>classes.delete(k),contains:k=>classes.has(k)}}replaceChildren(...c){this.children=c}append(e){this.children.push(e)}setAttribute(){}removeAttribute(){}setPointerCapture(){}focus(){}querySelectorAll(){return this.children.filter(e=>e.className?.includes('treffer-erfolgstern')&&!e.removed)}remove(){this.removed=true}getBoundingClientRect(){return {left:0,top:0,width:1000,height:1000}}}
function load(file){const html=fs.readFileSync(path.join(dir,file),'utf8'),els={},$=id=>els[id]??=new E();const data=html.match(/<script id="initial" type="application\/json">([\s\S]*?)<\/script>/);if(data)$('initial').textContent=data[1];const timers=new Map(),handlers={};let serial=0;const ctx=vm.createContext({document:{getElementById:$,createElement:()=>new E(),createTextNode:s=>s,createElementNS:()=>new E()},window:{addEventListener:(type,fn)=>handlers[type]=fn},structuredClone,crypto:{randomUUID:()=>String(Math.random())},setTimeout(fn,ms){timers.set(++serial,{fn,ms});return serial},clearTimeout:id=>timers.delete(id),console});const script=html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];new vm.Script(script);vm.runInContext(script,ctx);return {$,run:s=>vm.runInContext(s,ctx),html,timers,profileReady(api){ctx.window.LDProfiles=api;handlers['ld-profile-ready']()}}}
const read=load('lesen.html');assert.ok(read.html.includes('id="search" class="primary">gelesen'));
assert.ok(!/id="edit"|id="export"|id="savePanel"|Für Erwachsene|JSON sichern|Trefferflächen bearbeiten/.test(read.html));assert.equal(read.$('readingCard').classList.contains('hidden'),false);assert.equal(read.$('reading').textContent,'Teich\nTisch');
const imageManifest=JSON.parse(fs.readFileSync(path.join(dir,'tests/images.json'),'utf8'));
const completeData=JSON.parse(read.$('initial').textContent).map(c=>{const image=imageManifest.find(a=>a.path===c.image);assert.ok(image);const bytes=fs.readFileSync(path.join(dir,c.image));assert.equal(require('crypto').createHash('sha256').update(bytes).digest('hex'),image.sha256);return {...c,image:'data:'+image.mime+';base64,'+bytes.toString('base64')}});
assert.equal(require('crypto').createHash('sha256').update(JSON.stringify(completeData.slice(0,10))).digest('hex'),fs.readFileSync(path.join(dir,'tests/data.sha256'),'utf8').trim());
assert.equal(require('crypto').createHash('sha256').update(JSON.stringify(completeData.slice(10))).digest('hex'),fs.readFileSync(path.join(dir,'tests/ei-ie.sha256'),'utf8').trim());
assert.equal(completeData.length,24);assert.equal(read.$('gameProgress').children.length,24);
let count=0;for(let i=0;i<24;i++){
 read.run(`go(${i})`);assert.equal(read.run('ready()'),true);assert.ok(read.$('searchPanel').classList.contains('hidden'));read.$('search').onclick();assert.equal(read.$('searchPanel').classList.contains('hidden'),false);assert.ok(read.$('readingCard').classList.contains('hidden'));
 const rs=JSON.parse(read.run('JSON.stringify(c().regions)'));for(const r of rs){
  read.run('order='+JSON.stringify([r.target,...JSON.parse(read.run('JSON.stringify(c().targets.map(t=>t.label))')).filter(t=>t!==r.target)]));
  const xs=r.points.map(p=>p[0]),ys=r.points.map(p=>p[1]);let hit;
  for(let a=1;a<40&&!hit;a++)for(let b=1;b<40&&!hit;b++){let p=[Math.min(...xs)+(Math.max(...xs)-Math.min(...xs))*a/40,Math.min(...ys)+(Math.max(...ys)-Math.min(...ys))*b/40];if(read.run(`inside(${JSON.stringify(p)},${JSON.stringify(r.points)})`))hit=p}
  assert.ok(hit);read.$('overlay').onpointerdown({button:0,clientX:hit[0]*1000,clientY:hit[1]*1000});count++;
 }assert.equal(read.run('found.size'),rs.length);
}assert.equal(count,82);
read.$('completeNext').onclick();assert.equal(read.$('roundComplete').classList.contains('hidden'),false);assert.ok(read.$('searchPanel').classList.contains('hidden'));read.$('newRound').onclick();assert.equal(read.run('index'),0);assert.ok(read.$('roundComplete').classList.contains('hidden'));
read.$('search').onclick();read.$('backToReading').onclick();assert.equal(read.$('readingCard').classList.contains('hidden'),false);assert.ok(read.$('searchPanel').classList.contains('hidden'));
const sound=load('laute.html');sound.run('startSort()');assert.equal(sound.run('queue.length'),59);
assert.equal(sound.run('new Set(queue.map(p=>p[0])).size'),59);
for(let i=0;i<59;i++){const target=sound.run('queue[qi][1]');sound.run('answer('+JSON.stringify(target==='sh'?'soft':'sh')+')');assert.equal(sound.run('locked'),false);sound.run('answer('+JSON.stringify(target)+')');assert.equal(sound.run('locked'),true);sound.run('advance()')}
assert.ok(sound.$('newcontent').innerHTML.includes('Alles entdeckt!'));
assert.equal(sound.run('families.length'),20);
const extra=[['Strauch','Sträucher'],['flach','Fläche'],['Fach','Fächer'],['Nacht','Nächte'],['acht','echt'],['wachen','Wächter'],['lachen','lächeln'],['Sprache','sprechen'],['schwach','schwächer'],['wach','weich'],['Rauch','räuchern'],['Tuch','Tücher'],['Kuchen','Küche'],['brauchen','Bräuche'],['kochen','Köche']];
assert.deepStrictEqual(JSON.parse(sound.run('JSON.stringify(families.slice(5))')),extra);
for(const ask of ['ich','ach']){
 sound.run('Math.random=()=>'+(ask==='ich'?'.25':'.75')+';startFamily()');
 for(let i=0;i<20;i++){assert.equal(sound.run('familyQuestion'),ask);assert.ok(sound.$('newcontent').innerHTML.includes('wie in <strong>'+ask+'</strong>'));assert.ok(!sound.$('newcontent').innerHTML.includes('undefined'));const correct=ask==='ich'?1:0;sound.run('familyAnswer('+(1-correct)+')');assert.equal(sound.run('locked'),false);assert.equal(sound.run('familyQuestion'),ask);sound.run('familyAnswer('+correct+')');assert.equal(sound.run('locked'),true);assert.ok(sound.$('feedback').textContent.includes(ask==='ich'?'Ich':'Ach'));sound.run('advance()')}
}
assert.ok(sound.$('newcontent').innerHTML.includes('Alles entdeckt!'));sound.run('home()');assert.equal(sound.$('menu').classList.contains('hidden'),false);
for(const file of ['index.html','lesen.html','laute.html']){const html=fs.readFileSync(path.join(dir,file),'utf8');for(const match of html.matchAll(/href="([^"#]+)"/g)){const url=match[1];if(!url.includes(':'))assert.ok(fs.existsSync(path.join(dir,url)),'Link fehlt: '+url)}}
console.log('BESTANDEN: beide Spiele; zehn bisherige Karten sowie 14 neue Karten identisch zu den Sicherungen einschließlich Bildern, Bereichen und Sternpositionen; alle 82 Treffer; Lesefreigabe; 59 Sortierwörter; 20 Paare in beiden Fragerichtungen; Abschluss und Links.');

sound.run('startFamily()');
const praises=new Set();
for(let i=0;i<8;i++){
 const before=sound.run('qi'),correct=sound.run("familyQuestion==='ich'?1:0");
 sound.run('familyAnswer('+(1-correct)+')');assert.equal(sound.timers.size,0);
 sound.run('familyAnswer('+correct+')');assert.equal(sound.run('qi'),before);assert.equal(sound.timers.size,1);assert.equal(sound.$('praiseOverlay').classList.contains('hidden'),false);assert.equal(sound.$('newcontent').inert,true);praises.add(sound.$('praiseText').textContent);
 assert.equal([...sound.timers.values()][0].ms,3000);
 if(i%2){const [id,timer]=[...sound.timers.entries()][0];sound.timers.delete(id);timer.fn()}else sound.$('praiseSkip').onclick();
 assert.equal(sound.run('qi'),before+1);sound.$('praiseSkip').onclick();assert.equal(sound.run('qi'),before+1);assert.equal(sound.$('praiseOverlay').classList.contains('hidden'),true);assert.equal(sound.$('newcontent').inert,false);
 const content=sound.$('newcontent').innerHTML;assert.ok(content.indexOf('Die Buchstaben')>content.indexOf('Lies beide Wörter.'));assert.ok(content.indexOf('Die Buchstaben')<content.indexOf('class="duel"'));assert.ok(!content.includes('Weiter →'));
}
assert.equal(praises.size,8);
sound.run("familyAnswer(familyQuestion==='ich'?1:0)");const stale=[...sound.timers.values()][0].fn;sound.run('home()');assert.equal(sound.timers.size,0);const at=sound.run('qi');stale();assert.equal(sound.run('qi'),at);
sound.run("startFamily();qi=19;renderNew();familyAnswer(familyQuestion==='ich'?1:0)");sound.$('praiseSkip').onclick();assert.ok(sound.$('newcontent').innerHTML.includes('Alles entdeckt!'));
console.log('BESTANDEN: Hinweis vor Wörtern; kein Weiter in Wortpaaren; acht gemischte Bestätigungen; 3000 ms; automatischer Wechsel; Überspringen ohne Doppelsprung; Fehlversuch ohne Übergang; Abbruch verwirft Timer; letzte Aufgabe endet korrekt.');

const saves={};const profileApi={save:(game,state)=>saves[game]=JSON.parse(JSON.stringify(state)),load:game=>saves[game]??null};
const persistedRead=load('lesen.html');persistedRead.profileReady(profileApi);persistedRead.run("go(4);searching=true;found.add(c().regions[0].id);saveReadingProgress()");
const resumedRead=load('lesen.html');resumedRead.profileReady(profileApi);assert.equal(resumedRead.run('index'),4);assert.equal(resumedRead.run('found.size'),1);assert.equal(resumedRead.run('searching'),true);
const savedQuestion=load('laute.html');savedQuestion.profileReady(profileApi);savedQuestion.run("startFamily();qi=6;renderNew();familyQuestion='ach';saveSoundProgress()");const resumedQuestion=load('laute.html');resumedQuestion.profileReady(profileApi);assert.equal(resumedQuestion.run('qi'),6);assert.equal(resumedQuestion.run('familyQuestion'),'ach');resumedQuestion.run('familyAnswer(0)');assert.equal(saves.laute.qi,7);
const afterPraiseReload=load('laute.html');afterPraiseReload.profileReady(profileApi);assert.equal(afterPraiseReload.run('qi'),7);
savedQuestion.run('startSort();qi=12;renderNew();saveSoundProgress()');const resumedSort=load('laute.html');resumedSort.profileReady(profileApi);assert.equal(resumedSort.run('qi'),12);assert.equal(resumedSort.run('kind'),'sort');assert.equal(resumedSort.run('queue.length'),59);
console.log('BESTANDEN: profilbezogene Wiederaufnahme der Bildtreffer, Wortpaare samt Ich-/Ach-Frage und Sortieraufgabe; richtige Antwort bleibt beim Neuladen erledigt.');

const oldFinished=load('lesen.html');const originalLast=completeData[9];const legacy={index:9,finished:true,searching:true,order:originalLast.targets.map(t=>t.label),found:originalLast.regions.map(r=>r.id)};const migrated={};oldFinished.profileReady({load:()=>legacy,save:(game,value)=>migrated[game]=JSON.parse(JSON.stringify(value))});assert.equal(oldFinished.run('index'),10);assert.equal(migrated.lesen.deckSize,24);assert.equal(oldFinished.run('finished'),false);
const newCardSave=load('lesen.html');newCardSave.profileReady(profileApi);newCardSave.run("go(17);searching=true;found.add(c().regions[0].id);saveReadingProgress()");const newCardResume=load('lesen.html');newCardResume.profileReady(profileApi);assert.equal(newCardResume.run('index'),17);assert.equal(newCardResume.run('found.size'),1);
console.log('BESTANDEN: alte abgeschlossene Zehner-Runde setzt bei der ersten neuen Karte fort; neue Karten und Einzeltreffer werden profilbezogen wiederaufgenommen.');
