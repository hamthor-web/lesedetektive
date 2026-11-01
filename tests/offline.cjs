const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');const dir=path.dirname(__dirname),scope='https://example.test/lesedetektive/';
const listeners={},cacheMaps=new Map(),messages=[];let failing=false,skipped=0,claimed=0;
cacheMaps.set('anderes-spiel-cache',new Map());cacheMaps.set('lesedetektive-offline-alt',new Map());
const caches={keys:async()=>[...cacheMaps.keys()],delete:async name=>cacheMaps.delete(name),open:async name=>{if(!cacheMaps.has(name))cacheMaps.set(name,new Map());const data=cacheMaps.get(name);return {put:async(k,r)=>data.set(k,r.clone()),match:async k=>data.get(k)?.clone()}}};
const ctx=vm.createContext({self:{registration:{scope},clients:{claim:async()=>claimed++,matchAll:async()=>[{postMessage:m=>messages.push(m)}]},addEventListener:(k,f)=>listeners[k]=f,skipWaiting:async()=>skipped++},caches,URL,Response,Headers,fetch:async url=>{if(failing)throw Error('Offline');return new Response(url.endsWith('.mp4')?new Uint8Array([0,1,2,3,4,5,6,7,8,9]):'app',{headers:{'Content-Type':url.endsWith('.mp4')?'video/mp4':'text/plain'}})}});
vm.runInContext(fs.readFileSync(path.join(dir,'sw.js'),'utf8'),ctx);
async function lifecycle(name){let wait;listeners[name]({waitUntil:p=>wait=p});await wait}
async function request(url,headers={}){let response;listeners.fetch({request:new Request(url,{headers}),respondWith:p=>response=p});return await response}
(async()=>{
 const files=vm.runInContext('FILES',ctx);for(const f of files)assert.ok(fs.existsSync(path.join(dir,f)),f);
 await lifecycle('install');assert.equal(skipped,0);assert.ok(messages.some(m=>m.type==='LD_OFFLINE_PROGRESS'&&m.completed===files.length));await lifecycle('activate');assert.equal(claimed,1);assert.ok(cacheMaps.has('anderes-spiel-cache'));assert.equal(cacheMaps.has('lesedetektive-offline-alt'),false);
 failing=true;assert.equal(await (await request(scope)).text(),'app');assert.equal(await (await request(scope+'lesen.html?test=1')).text(),'app');
 const video=await request(scope+'assets/intro-lesen.mp4',{'Range':'bytes=2-5'});assert.equal(video.status,206);assert.equal(video.headers.get('Content-Range'),'bytes 2-5/10');assert.deepStrictEqual([...new Uint8Array(await video.arrayBuffer())],[2,3,4,5]);
 const suffix=await request(scope+'assets/intro-lesen.mp4',{'Range':'bytes=-3'});assert.deepStrictEqual([...new Uint8Array(await suffix.arrayBuffer())],[7,8,9]);
 let wait;listeners.message({data:{type:'LD_ACTIVATE_UPDATE'},waitUntil:p=>wait=p});await wait;assert.equal(skipped,1);
 assert.ok(cacheMaps.has('anderes-spiel-cache'));console.log('BESTANDEN: vollständiges Offline-Paket; Navigation ohne Netz; Video-Teilabrufe 206; Aktivierung nur nach Updateaktion; Cache anderer Apps bleibt erhalten.');
})().catch(e=>{console.error(e);process.exitCode=1});
