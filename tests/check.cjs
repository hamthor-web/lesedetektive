const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');const dir=path.dirname(__dirname);
class E{constructor(){this.style={setProperty(){}};this.value='';this.textContent='';this.children=[];const classes=new Set();this.classList={toggle(k,b){if(b===undefined)b=!classes.has(k);b?classes.add(k):classes.delete(k)},add:k=>classes.add(k),remove:k=>classes.delete(k),contains:k=>classes.has(k)}}replaceChildren(...c){this.children=c}append(e){this.children.push(e)}setAttribute(){}removeAttribute(){}setPointerCapture(){}focus(){}querySelectorAll(){return this.children.filter(e=>e.className?.includes('treffer-erfolgstern')&&!e.removed)}remove(){this.removed=true}getBoundingClientRect(){return {left:0,top:0,width:1000,height:1000}}}
function load(file){const html=fs.readFileSync(path.join(dir,file),'utf8'),els={},$=id=>els[id]??=new E();const data=html.match(/<script id="initial" type="application\/json">([\s\S]*?)<\/script>/);if(data)$('initial').textContent=data[1];const timers=new Map();let serial=0;const ctx=vm.createContext({document:{getElementById:$,createElement:()=>new E(),createTextNode:s=>s,createElementNS:()=>new E()},window:{addEventListener(){}},structuredClone,crypto:{randomUUID:()=>String(Math.random())},setTimeout(fn,ms){timers.set(++serial,{fn,ms});return serial},clearTimeout:id=>timers.delete(id),console});const script=html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];new vm.Script(script);vm.runInContext(script,ctx);return {$,run:s=>vm.runInContext(s,ctx),html,timers}}
const read=load('lesen.html');assert.ok(read.html.includes('id="search" class="primary">gelesen'));
assert.ok(!/id="edit"|id="export"|id="savePanel"|Für Erwachsene|JSON sichern|Trefferflächen bearbeiten/.test(read.html));assert.equal(read.$('readingCard').classList.contains('hidden'),false);assert.equal(read.$('reading').textContent,'Teich\nTisch');
assert.equal(require('crypto').createHash('sha256').update(JSON.stringify(JSON.parse(read.$('initial').textContent))).digest('hex'),fs.readFileSync(path.join(dir,'tests/data.sha256'),'utf8').trim());
let count=0;for(let i=0;i<10;i++){
 read.run(`go(${i})`);assert.equal(read.run('ready()'),true);assert.ok(read.$('searchPanel').classList.contains('hidden'));read.$('search').onclick();assert.equal(read.$('searchPanel').classList.contains('hidden'),false);assert.ok(read.$('readingCard').classList.contains('hidden'));
 const rs=JSON.parse(read.run('JSON.stringify(c().regions)'));for(const r of rs){
  read.run('order='+JSON.stringify([r.target,...JSON.parse(read.run('JSON.stringify(c().targets.map(t=>t.label))')).filter(t=>t!==r.target)]));
  const xs=r.points.map(p=>p[0]),ys=r.points.map(p=>p[1]);let hit;
  for(let a=1;a<40&&!hit;a++)for(let b=1;b<40&&!hit;b++){let p=[Math.min(...xs)+(Math.max(...xs)-Math.min(...xs))*a/40,Math.min(...ys)+(Math.max(...ys)-Math.min(...ys))*b/40];if(read.run(`inside(${JSON.stringify(p)},${JSON.stringify(r.points)})`))hit=p}
  assert.ok(hit);read.$('overlay').onpointerdown({button:0,clientX:hit[0]*1000,clientY:hit[1]*1000});count++;
 }assert.equal(read.run('found.size'),rs.length);
}assert.equal(count,34);
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
console.log('BESTANDEN: beide Spiele; unveränderte Bilddaten; 34 Treffer; Lesefreigabe; 59 unterschiedliche Sortierwörter; alle 15 neuen Paare; insgesamt 20 Paare jeweils mit Ich- und Ach-Abfrage und Fehlversuchen; kein undefined-Text; Abschluss und Links.');

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
