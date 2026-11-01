'use strict';
const VERSION = '2026.11.01.4';
const PREFIX = 'lesedetektive-offline-';
const CACHE = PREFIX + VERSION;
const FILES = ['index.html','lesen.html','laute.html','icon.svg','app.css','profiles.js','pwa.js','intro.js','manifest.webmanifest','version.json','assets/intro-lesen.mp4','assets/intro-zischlaute.mp4','assets/icon-192.png','assets/icon-512.png','assets/apple-touch-icon.png','assets/startbildschirm.png'];
const base = self.registration.scope;
const key = path => new URL(path, base).href;
async function tell(data) { for (const client of await self.clients.matchAll({ includeUncontrolled:true, type:'window' })) client.postMessage(data); }
self.addEventListener('install', event => event.waitUntil((async () => {
  const cache = await caches.open(CACHE);
  try {
    for (let i=0;i<FILES.length;i++) {
      const response = await fetch(key(FILES[i]), { cache:'reload' });
      if (!response.ok) throw Error(FILES[i]);
      await cache.put(key(FILES[i]), response);
      await tell({ type:'LD_OFFLINE_PROGRESS', completed:i+1, total:FILES.length });
    }
  } catch (error) {
    await caches.delete(CACHE);
    await tell({ type:'LD_OFFLINE_ERROR' });
    throw error;
  }
})()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  await self.clients.claim();
  for (const name of await caches.keys()) if (name.startsWith(PREFIX) && name !== CACHE) await caches.delete(name);
  await tell({ type:'LD_OFFLINE_READY', version:VERSION });
})()));
self.addEventListener('message', event => {
  if (event.data?.type === 'LD_ACTIVATE_UPDATE') event.waitUntil(self.skipWaiting());
  if (event.data?.type === 'LD_STATUS') event.source?.postMessage({ type:'LD_OFFLINE_READY', version:VERSION });
});
async function rangeResponse(request, response) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get('range') || '');
  if (!match) return response;
  const data = await response.arrayBuffer();
  let start = match[1] ? Number(match[1]) : Math.max(0,data.byteLength-Number(match[2]));
  let end = match[1] && match[2] ? Number(match[2]) : data.byteLength-1;
  end = Math.min(end,data.byteLength-1);
  if (start > end || start >= data.byteLength) return new Response(null,{status:416,headers:{'Content-Range':'bytes */'+data.byteLength}});
  const headers = new Headers(response.headers);
  headers.set('Content-Range',`bytes ${start}-${end}/${data.byteLength}`);
  headers.set('Accept-Ranges','bytes');headers.set('Content-Length',String(end-start+1));
  return new Response(data.slice(start,end+1),{status:206,headers});
}
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || !url.href.startsWith(base)) return;
  if (url.pathname.endsWith('/version.json')) { event.respondWith(fetch(request,{cache:'no-store'})); return; }
  url.search = '';url.hash = '';
  if (url.pathname.endsWith('/')) url.pathname += 'index.html';
  event.respondWith((async () => {
    const cache = await caches.open(CACHE), cached = await cache.match(url.href);
    if (cached) return request.headers.has('range') ? rangeResponse(request,cached) : cached;
    try { return await fetch(request); }
    catch { return new Response('Bitte diese Seite einmal mit Internet öffnen.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}}); }
  })());
});
