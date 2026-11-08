const {chromium}=require('playwright'),assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.mp4':'video/mp4','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{const name=decodeURIComponent(req.url.split('?')[0]);const file=path.join(root,name==='/'?'index.html':name);fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(err?'Not found':data);});});
async function checkControls(page,context){
 const issues=await page.evaluate(()=>{
  const errors=[],field=document.querySelector('#playfield').getBoundingClientRect();
  for(const selector of ['.clockbar','.round-actions']){
   const b=document.querySelector(selector).getBoundingClientRect();
   const overlap=Math.max(0,Math.min(b.right,field.right)-Math.max(b.left,field.left))*Math.max(0,Math.min(b.bottom,field.bottom)-Math.max(b.top,field.top));
   if(overlap>2)errors.push(selector+' overlaps task');
  }
  for(const e of document.querySelectorAll('.clockbar strong,.clockbar button,#gameMenu>summary,#readingTools button')){
   if(!e.getClientRects().length)continue;
   const b=e.getBoundingClientRect(),label=e.getAttribute('aria-label')||e.textContent;
   if(b.left<0||b.top<0||b.right>innerWidth+1||b.bottom>innerHeight+1){errors.push(label+' outside viewport');continue;}
   const at=document.elementFromPoint(b.left+b.width/2,b.top+b.height/2);
   if(at!==e&&!e.contains(at))errors.push(label+' covered by '+at?.tagName);
  }
  return errors;
 });
 assert.deepEqual(issues,[],context);
}
(async()=>{await new Promise(r=>server.listen(8765,'127.0.0.1',r));const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader']});
for(const [width,height] of [[320,740],[393,852],[412,915],[806,1660],[980,2080],[844,390],[768,1024],[1024,768],[820,1180],[1180,820],[1024,1366],[1366,1024],[1440,1000]]){
 const page=await browser.newPage({viewport:{width,height},serviceWorkers:'block'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765');await page.locator('input[name=name]').fill('Lesetest');await page.getByRole('button',{name:'Profil anlegen',exact:true}).click();
 for(const scale of [100,150,200]){
 await page.locator('body>.zoom-controls [data-zoom=reset]').click();for(let i=0;i<({100:0,150:3,200:5}[scale]);i++)await page.locator('body>.zoom-controls [data-zoom=in]').click();await page.reload();await page.locator('#home').waitFor();await page.locator('#home [data-app-status]').evaluate(e=>e.textContent='Lesedetektive ist auf diesem Gerät auch ohne Internet bereit.');
 const check=await page.evaluate(()=>({bottom:document.querySelector('#home .platform-actions').getBoundingClientRect().bottom,screen:innerHeight,width:innerWidth,scroll:document.documentElement.scrollWidth,button:document.querySelector('.game-menu button').getBoundingClientRect().height,font:parseFloat(getComputedStyle(document.querySelector('.game-menu button')).fontSize),control:document.querySelector('body>.zoom-controls button').getBoundingClientRect().height}));
 assert.ok(check.scroll<=width+1,JSON.stringify({width,scale,...check}));assert.ok(check.font>=24*scale/100,JSON.stringify({width,scale,...check}));assert.ok(check.control>=48);assert.ok(check.bottom>=check.screen-35,`unused height ${width} ${scale} ${JSON.stringify(check)}`);
 for(const game of ['reading','sort','family']){await page.evaluate(g=>LDSelection.openGame(g),game);if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))console.log(await page.evaluate(()=>[...document.querySelectorAll('body *')].map(e=>({tag:e.tagName,id:e.id,cls:e.className,right:e.getBoundingClientRect().right,width:e.getBoundingClientRect().width,sw:e.scrollWidth,cw:e.clientWidth})).filter(e=>(e.right>innerWidth+1||e.sw>e.cw+1)&&e.width)));assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`setup overflow ${width} ${scale} ${game}`);if(width===806&&scale===150)await page.locator('input[name=mode][value=ten]').check();await page.locator('#start').click();await page.locator('#task').waitFor();await checkControls(page,`controls ${width} ${scale} ${game}`);if(game==='reading'){assert.equal(await page.locator('#readingTools').isVisible(),false);const primary=await page.locator('#read').evaluate(e=>({height:e.getBoundingClientRect().height,width:e.getBoundingClientRect().width,parent:document.querySelector('#task').getBoundingClientRect().width,font:parseFloat(getComputedStyle(e).fontSize)}));assert.ok(primary.height>=100&&primary.width>=primary.parent*.8&&primary.font>=32,JSON.stringify(primary));}const taskBox=await page.evaluate(()=>{const f=document.querySelector('#playfield').getBoundingClientRect(),t=document.querySelector('#task').getBoundingClientRect();return {gap:t.top-f.top,ratio:t.height/f.height}});assert.ok(taskBox.gap<24&&taskBox.ratio>=.95,`task workspace ${width} ${scale} ${game} ${JSON.stringify(taskBox)}`);if(width===806&&scale===150)await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR||require('node:os').tmpdir(),game+'-aufgabe.png'),fullPage:true});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`play overflow ${width} ${scale} ${game}`);if(game==='reading'){await page.locator('#read').click();await checkControls(page,`image controls ${width} ${scale}`);if(width===1024||width===1180||width===1366){for(let z=0;z<5;z++)await page.locator('.round-stats [data-zoom=in]').click();await checkControls(page,`zoom controls ${width} ${scale}`);await page.locator('.round-stats [data-zoom=reset]').click();}assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`image overflow ${width} ${scale}`);}if(!await page.locator('#gameMenu').evaluate(e=>e.open))await page.locator('#gameMenu>summary').click();await page.locator('#viewProgress').click({timeout:4000});await page.frameLocator('#progressFrame').locator('.layout').waitFor();await page.waitForFunction(()=>{const f=document.querySelector('#progressFrame');return f.contentDocument?.querySelector('main').getBoundingClientRect().height<=f.clientHeight+2});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))console.log(await page.evaluate(()=>[...document.querySelectorAll('body *')].map(e=>({tag:e.tagName,id:e.id,cls:e.className,right:e.getBoundingClientRect().right,width:e.getBoundingClientRect().width,sw:e.scrollWidth,cw:e.clientWidth})).filter(e=>(e.right>innerWidth+1||e.sw>e.cw+1)&&e.width)));assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`results overflow ${width} ${scale} ${game}`);assert.ok(await page.frameLocator('#progressFrame').locator('body').evaluate(e=>e.scrollWidth<=e.clientWidth+1),`frame overflow ${width} ${scale} ${game}`);if(width===806&&scale===150&&game==='family')await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR||require('node:os').tmpdir(),'ergebnisse-neu.png'),fullPage:true});await page.evaluate(()=>LDSelection.home());}
 if(width===806&&scale===150)await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR||require('node:os').tmpdir(),'mobile-neu.png'),fullPage:true});
 if(width===1440&&scale===100)await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR||require('node:os').tmpdir(),'desktop-neu.png'),fullPage:true});
 }
 if(width===820){
  for(const game of ['reading','sort','family']){
   await page.evaluate(g=>LDSelection.openGame(g),game);await page.locator('#start').click();
   if(game==='reading')await page.locator('#read').click();
   else{
    const wrong=await page.evaluate(g=>{if(g==='family')return [...document.querySelectorAll('[data-answer]')].findIndex(b=>Number(b.dataset.answer)===(document.querySelector('#task').textContent.includes('wie in ich')?0:1));const w=document.querySelector('#task .reading').textContent;return LD_DATA.soft.includes(w)?1:0},game);
    await page.locator('#task .answers button').nth(wrong).click();
    assert.ok(await page.locator('#feedback').evaluate(e=>e.getBoundingClientRect().bottom<=document.querySelector('#task').getBoundingClientRect().top+1),'feedback must not be hidden behind task');
   }
   await page.setViewportSize({width:1180,height:820});await page.evaluate(()=>new Promise(requestAnimationFrame));await checkControls(page,'rotation '+game);
   await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR||require('node:os').tmpdir(),'ipad-'+game+'-quer.png'),fullPage:true});
   await page.setViewportSize({width:820,height:1180});await page.evaluate(()=>new Promise(requestAnimationFrame));await checkControls(page,'rotation back '+game);await page.evaluate(()=>LDSelection.home());
  }
 }
 await page.locator('button[data-game=family]').click();await page.locator('#introDialog').waitFor();assert.ok(await page.locator('#introDialog').evaluate(e=>{const b=e.getBoundingClientRect();return b.width<=innerWidth+1&&b.height<=innerHeight+1}),`intro overflow ${width}`);await page.locator('#introBack').click();
 assert.equal(await page.locator('#export,main>footer').count(),0);await page.getByRole('button',{name:'Lesetest wechseln',exact:true}).click();assert.ok((await page.locator('#profileDialog').innerText()).includes('Dein Spielstand bleibt bei dir.'));assert.ok(await page.evaluate(()=>document.querySelector('.profile-panel').scrollWidth<=document.querySelector('.profile-panel').clientWidth+1),`profile overflow ${width}`);
 assert.deepEqual(errors,[]);console.log(`Layout ${width}×${height}: bestanden`);await page.close();
}await browser.close();server.close();console.log('BESTANDEN: 13 Handy-/Tablet-/PC-Formate, 100/150/200 %, alle Variantenwahlen, Aufgabenfläche, Ergebnisrahmen, Intro, Profil und Regler ohne horizontales Überlaufen; großer gelesen-Button, echte Trefferprüfung der Seitenregler auch mit Bildzoom, Speicherhinweis nur bei Anmeldung, kein Textexport.');})().catch(e=>{console.error(e);server.close();process.exit(1)});
