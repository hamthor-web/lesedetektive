const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
class Node{constructor(attrs={}){this.attrs=attrs;this.events={};this.hidden=false}addEventListener(k,f){this.events[k]=f}getAttribute(k){return this.attrs[k]??null}setAttribute(k,v){this.attrs[k]=v}removeAttribute(k){delete this.attrs[k]}set src(v){this.attrs.src=v}get src(){return this.attrs.src}pause(){this.paused=true}load(){}play(){return this.fail?Promise.reject(Error()):Promise.resolve()}showModal(){this.open=true}close(){this.open=false;this.events.close?.()}}
async function test(){const els={},get=id=>els[id]??=new Node(),links=[new Node({href:'lesen.html'}),new Node({href:'laute.html'})],visits=[];
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../intro.js'),'utf8'),{document:{getElementById:get,querySelectorAll:()=>links},window:{location:{assign:p=>visits.push(p)}}});
const click=i=>links[i].events.click({button:0,preventDefault(){}});
click(0);assert.equal(get('introVideo').src,'assets/intro-lesen.mp4');assert.equal(get('introDialog').open,true);assert.equal(visits.length,0);get('introVideo').events.ended();assert.equal(visits.pop(),'lesen.html');
click(1);assert.equal(get('introVideo').src,'assets/intro-zischlaute.mp4');get('introSkip').events.click();assert.equal(visits.pop(),'laute.html');
click(0);get('introBack').events.click();assert.equal(get('introDialog').open,false);assert.equal(visits.length,0);assert.equal(get('introVideo').src,undefined);
get('introVideo').fail=true;click(1);await new Promise(setImmediate);assert.equal(get('introStart').hidden,false);get('introSkip').events.click();assert.equal(visits.pop(),'laute.html');
get('introVideo').fail=false;click(0);get('introVideo').events.error();assert.ok(get('introNote').textContent.includes('nicht geladen'));get('introSkip').events.click();assert.equal(visits.pop(),'lesen.html');
for(const f of ['intro-lesen.mp4','intro-zischlaute.mp4'])assert.ok(fs.statSync(path.join(__dirname,'../assets',f)).size>0);
console.log('BESTANDEN: richtige Videozuordnung; Spiel erst nach Videoende; Überspringen; Abbrechen und Stoppen; blockierte Wiedergabe; Ladefehler; beide Videodateien.');}
test().catch(e=>{console.error(e);process.exitCode=1});
