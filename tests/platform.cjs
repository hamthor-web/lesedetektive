const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');const dir=path.dirname(__dirname);
class Node{
 constructor(){this.events={};this.children=[];this.value='';this.hidden=false;this.attrs={};this.classList={add(){},remove(){}}}
 addEventListener(type,fn){this.events[type]=fn}setAttribute(k,v){this.attrs[k]=v}append(n){this.children.push(n)}replaceChildren(...nodes){this.children=nodes}querySelector(s){return this.parts[s]}
 showModal(){this.open=true}close(){this.open=false}set innerHTML(v){this.html=v;this.parts={};for(const s of ['.profile-list','.profile-error','form','.profile-cancel','.profile-storage'])this.parts[s]=new Node();const input=new Node();this.parts.form.elements={namedItem:()=>input}}
}
function profiles(storage,session){const nodes=[],events={},badge=new Node(),switcher=new Node();const ctx=vm.createContext({document:{body:{append:n=>nodes.push(n)},documentElement:{classList:{remove(){}}},createElement:()=>new Node(),querySelectorAll:s=>s==='[data-profile-name]'?[badge]:s==='[data-profile-switch]'?[switcher]:[]},localStorage:storage,sessionStorage:session,crypto:{randomUUID:()=>String(Math.random())},Event:class{constructor(type){this.type=type}},window:{dispatchEvent:e=>events[e.type]?.(),location:{reload(){}}}});vm.runInContext(fs.readFileSync(path.join(dir,'profiles.js'),'utf8'),ctx);return {api:ctx.window.LDProfiles,dialog:nodes[0],badge,switcher}}
function store(){const map=new Map();return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v),map}}
const storage=store(),session=store(),p=profiles(storage,session);assert.equal(p.dialog.open,true);
function create(name){p.dialog.parts.form.elements.namedItem().value=name;p.dialog.parts.form.events.submit({preventDefault(){}})}
create('Mia');assert.equal(p.badge.textContent,'Mia');assert.equal(p.dialog.open,false);p.api.save('lesen',{index:4});const first=p.api.active().id;
p.api.choose();create('Ben');assert.notEqual(p.api.active().id,first);assert.equal(p.api.load('lesen'),null);p.api.save('lesen',{index:1});p.api.choose();p.dialog.parts['.profile-list'].children[0].events.click();assert.equal(p.api.load('lesen').index,4);
p.api.choose();create('mia');assert.ok(p.dialog.parts['.profile-error'].textContent.includes('gibt es schon'));assert.equal(p.api.list().length,2);
const restart=profiles(storage,session);assert.equal(restart.dialog.open,false);assert.equal(restart.api.load('lesen').index,4);
const nextSession=profiles(storage,store());assert.equal(nextSession.dialog.open,true);assert.equal(nextSession.dialog.parts['.profile-list'].children.length,2);
const privateStorage={getItem(){throw Error()},setItem(){throw Error()}};const privateProfile=profiles(privateStorage,store());privateProfile.dialog.parts.form.elements.namedItem().value='Gast';privateProfile.dialog.parts.form.events.submit({preventDefault(){}});privateProfile.api.save('lesen',{index:2});assert.equal(privateProfile.api.load('lesen').index,2);

async function platform(ua){const listeners={},swListeners={},install=new Node(),update=new Node(),notice=new Node();install.dataset={appAction:'install'};update.dataset={appAction:'update'};let reloads=0,activated=0;const registration={update:async()=>{},addEventListener(){},active:{postMessage(){}}};const nav={userAgent:ua,serviceWorker:{addEventListener:(t,f)=>swListeners[t]=f,register:async()=>registration,getRegistration:async()=>registration}};
 const context=vm.createContext({document:{querySelectorAll:s=>s==='[data-app-action="install"]'?[install]:s==='[data-app-action="update"]'?[update]:s==='[data-app-status]'?[notice]:s==='[data-app-action]'?[install,update]:[]},navigator:nav,matchMedia:()=>({matches:false}),addEventListener:(t,f)=>listeners[t]=f,location:{protocol:'https:',reload(){reloads++}},fetch:async()=>({ok:true,json:async()=>({version:'2026.11.01.1'})})});vm.runInContext(fs.readFileSync(path.join(dir,'pwa.js'),'utf8'),context);await new Promise(setImmediate);
 return {listeners,install,update,notice,swListeners,registration,get reloads(){return reloads}};
}
(async()=>{
 const android=await platform('Android');let prompted=0;android.listeners.beforeinstallprompt({preventDefault(){},prompt:async()=>prompted++,userChoice:Promise.resolve({outcome:'accepted'})});await android.install.events.click();assert.equal(prompted,1);assert.ok(android.notice.textContent.includes('bestätigt'));
 android.listeners.appinstalled();assert.equal(android.install.disabled,true);
 await android.update.events.click();assert.ok(android.notice.textContent.includes('aktuelle Version'));
 let activation=false;android.registration.waiting={postMessage:m=>{activation=m.type==='LD_ACTIVATE_UPDATE'}};await android.update.events.click();assert.equal(activation,true);android.swListeners.controllerchange();assert.equal(android.reloads,1);
 const iphone=await platform('iPhone');await iphone.install.events.click();assert.ok(iphone.notice.textContent.includes('Zum Home-Bildschirm'));assert.ok(iphone.notice.textContent.includes('Safari'));
 console.log('BESTANDEN: Profilerstellung/-wahl, getrennte lokale Spielstände, Wiederaufnahme, neue Sitzung, gesperrter Speicher; Android-Installationsdialog; iPhone-Anleitung; Aktualisieren und kontrolliertes Neuladen.');
})().catch(e=>{console.error(e);process.exitCode=1});
