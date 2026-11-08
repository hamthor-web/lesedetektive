const {chromium}=require('playwright'),assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.mp4':'video/mp4','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{const name=decodeURIComponent(req.url.split('?')[0]);const file=path.join(root,name==='/'?'index.html':name);fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(err?'Not found':data);});});
async function checkButtonHeights(page,selector,context){
 const groups=await page.locator(selector).evaluateAll(gs=>gs.map(g=>[...g.querySelectorAll('button')].filter(b=>b.getClientRects().length).map(b=>({text:b.textContent,height:b.getBoundingClientRect().height,clipped:b.scrollHeight>b.clientHeight+1}))));
 for(const group of groups){if(group.length<2)continue;const heights=group.map(b=>b.height);assert.ok(Math.max(...heights)-Math.min(...heights)<1,context+' '+JSON.stringify(group));assert.ok(group.every(b=>!b.clipped),context+' clipped label '+JSON.stringify(group));}
}
(async()=>{let browser;try{await new Promise(r=>server.listen(8767,'127.0.0.1',r));browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
for(const [width,height] of [[320,740],[393,852],[806,1795],[844,390],[1024,768]]){
const page=await browser.newPage({viewport:{width,height},serviceWorkers:'block'});await page.goto('http://127.0.0.1:8767');await page.locator('input[name=name]').fill('Test');await page.locator('.profile-create button').click();
for(const scale of [1,1.5,2]){
await page.evaluate(s=>document.documentElement.style.setProperty('--menu-text-scale',s),scale);
await checkButtonHeights(page,'#home .game-menu','home');
for(const game of ['reading','sort','family']){
await page.evaluate(g=>LDSelection.openGame(g),game);
for(const mode of ['normal','minute','ten']){await page.locator('input[name=mode][value='+mode+']').check();for(const seq of ['fixed','random']){await page.locator('input[name=sequence][value='+seq+']').check();await checkButtonHeights(page,'.setup-actions','setup '+width+' '+scale+' '+game+' '+mode+' '+seq);}}
if(process.env.SCREENSHOT_DIR&&width===806&&scale===1&&game==='sort')await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR,'rundenauswahl-buttonhoehen.png'),fullPage:true});
await page.locator('#start').click();await checkButtonHeights(page,'#task .answers,#task .duel:not(.answers)','task');await page.locator('#gameMenu').evaluate(e=>e.open=true);await checkButtonHeights(page,'.game-menu-items','menu');await page.locator('#viewProgress').click();await page.evaluate(()=>document.querySelector('#abort').click());await checkButtonHeights(page,'.result-actions','progress');await page.evaluate(()=>LDSelection.home());
}
}
console.log(width+'×'+height+': alle Spiele, Varianten und Reihenfolgen bei 100/150/200 % – Buttonhöhen gleich, Beschriftungen vollständig');await page.close();
}
}finally{await browser?.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
