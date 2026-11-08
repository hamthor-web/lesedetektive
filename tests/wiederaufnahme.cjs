const {chromium}=require('playwright'),assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const file=path.join(root,req.url.split('?')[0]==='/'?'index.html':req.url.split('?')[0]);fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.mp4':'video/mp4'})[path.extname(file)]||'application/octet-stream'});res.end(err?'Not found':data);});});
(async()=>{let browser;try{
 await new Promise(r=>server.listen(8766,'127.0.0.1',r));browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:393,height:852},serviceWorkers:'block'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8766');await page.locator('input[name=name]').fill('Anna');await page.locator('.profile-create button').click();
 await page.evaluate(()=>LDSelection.openGame('sort'));await page.locator('#start').click();assert.equal(await page.locator('#gameMenu').evaluate(e=>e.open),false);
 const word=await page.locator('#task .reading').textContent();
 const group=await page.evaluate(w=>LD_DATA.soft.includes(w)?'soft':LD_DATA.rough.includes(w)?'rough':'sh',word);await page.locator('[data-group='+group+']').click();assert.equal(await page.locator('#score').textContent(),'1 / 10');
 const next=await page.locator('#task .reading').textContent();await page.reload();await page.locator('#setupResume').click();assert.equal(await page.locator('#task .reading').textContent(),next);assert.equal(await page.locator('#score').textContent(),'1 / 10');
 await page.evaluate(()=>LDSelection.home());await page.evaluate(()=>LDSelection.openGame('sort'));await page.locator('#setupResume').click();assert.equal(await page.locator('#score').textContent(),'1 / 10');
 await page.evaluate(()=>LDSelection.home());await page.locator('[data-profile-switch]').click();await page.locator('input[name=name]').fill('Ben');await page.locator('.profile-create button').click();await page.waitForLoadState('load');await page.evaluate(()=>LDSelection.openGame('sort'));assert.equal(await page.locator('#setupResume').isVisible(),false);
 await page.locator('[data-profile-switch]').click();await page.locator('.profile-list button').filter({hasText:'Anna'}).click();await page.waitForLoadState('load');await page.evaluate(()=>LDSelection.openGame('sort'));await page.locator('#setupResume').click();assert.equal(await page.locator('#score').textContent(),'1 / 10');
 await page.evaluate(()=>LDSelection.home());await page.evaluate(()=>LDSelection.openGame('reading'));await page.locator('#start').click();await page.locator('#read').click();await page.locator('#picture').waitFor();
 await page.waitForFunction(()=>document.querySelector('#picture').naturalWidth>0);
 const point=await page.evaluate(()=>{const s=LDProfiles.load('round-v1:reading'),c=LD_DATA.cards[s.queue[s.position]],target=s.targetOrder[0],r=c.regions.find(r=>r.target===target),b=document.querySelector('#overlay').getBoundingClientRect();for(let y=0;y<1;y+=.002)for(let x=0;x<1;x+=.002)if(LD_TIME.inside([x,y],r.points))return {x:b.left+x*b.width,y:b.top+y*b.height};});
 await page.mouse.click(point.x,point.y);const found=await page.evaluate(()=>LDProfiles.load('round-v1:reading').found);assert.equal(found.length,1);
 await page.reload();await page.locator('#setupResume').click();await page.locator('#picture').waitFor({state:'visible'});assert.deepEqual(await page.evaluate(()=>LDProfiles.load('round-v1:reading').found),found);
 await page.evaluate(()=>LDSelection.home());await page.evaluate(()=>LDSelection.openGame('family'));
 for(const q of [.1,.9])for(const order of [.1,.9]){
  await page.evaluate(([q,order])=>{const original=Math.random,values=[q,order];Math.random=()=>values.length?values.shift():original();document.querySelector('#start').click();Math.random=original;},[q,order]);
  const expected=order<.5?[1,0]:[0,1],correct=q<.5?1:0;
  assert.deepEqual(await page.locator('[data-answer]').evaluateAll(bs=>bs.map(b=>Number(b.dataset.answer))),expected);
  assert.deepEqual(await page.locator('[data-hear]').evaluateAll(bs=>bs.map(b=>Number(b.dataset.hear))),expected);
  const wording=await page.locator('#task').textContent();
  await page.reload();await page.locator('#setupResume').click();assert.equal(await page.locator('#task').textContent(),wording);
  assert.deepEqual(await page.locator('[data-answer]').evaluateAll(bs=>bs.map(b=>Number(b.dataset.answer))),expected);
  await page.locator('[data-answer="'+(1-correct)+'"]').click();assert.equal(await page.locator('#score').textContent(),'0 / 10');assert.equal(await page.evaluate(()=>LDProfiles.load('round-v1:family').errors),1);
  await page.locator('[data-answer="'+correct+'"]').click();assert.equal(await page.locator('#score').textContent(),'1 / 10');
  await page.evaluate(()=>LDSelection.home());await page.evaluate(()=>LDSelection.openGame('family'));
 }
 // Legacy saves used the original left/right order.
 await page.evaluate(()=>{const s=LDProfiles.load('round-v1:family');delete s.familyOrder;LDProfiles.save('round-v1:family',s);});await page.reload();await page.locator('#setupResume').click();assert.deepEqual(await page.locator('[data-answer]').evaluateAll(bs=>bs.map(b=>Number(b.dataset.answer))),[0,1]);
 await page.evaluate(()=>LDSelection.home());await page.evaluate(()=>LDSelection.openGame('family'));await page.locator('input[name=mode][value=minute]').check();await page.locator('#start').click();await page.evaluate(()=>LDSelection.home());await page.evaluate(()=>{const s=LDProfiles.load('round-v1:family');s.at-=61000;LDProfiles.save('round-v1:family',s);LDSelection.openGame('family');});await page.locator('#setupResume').click();await page.waitForFunction(()=>document.querySelector('#resultTitle').textContent==='Zeit abgelaufen');
 assert.equal(await page.evaluate(()=>LDProfiles.load('round-v1:family')),null);assert.deepEqual(errors,[]);console.log('BESTANDEN: Wiederaufnahme nach Neuladen und Spielauswahl, Profiltrennung, Bildansicht, beide Wortpositionen für ich/ach mit korrekter Trefferprüfung, gespeicherte und ältere Wortanordnungen sowie abgelaufene Zeitrunde.');
 }finally{await browser?.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
