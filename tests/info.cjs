const {chromium}=require('playwright'),assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.mp4':'video/mp4','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{const name=decodeURIComponent(req.url.split('?')[0]);const file=path.join(root,name==='/'?'index.html':name);fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(err?'Not found':data);});});
(async()=>{let browser;try{
 await new Promise(r=>server.listen(8768,'127.0.0.1',r));browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 for(const [width,height] of [[320,740],[393,852],[806,1795],[844,390]]){
 const page=await browser.newPage({viewport:{width,height},serviceWorkers:'block'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8768');await page.locator('#profileDialog .app-info-trigger').click();await page.locator('#appInfoDialog').waitFor();
 assert.equal(await page.locator('#profileDialog').evaluate(e=>e.open),true);
 const expected=['https://lesespiele.heike-amthor.de/','https://lesespiele.heike-amthor.de/impressum','https://lesespiele.heike-amthor.de/datenschutz'];
 assert.deepEqual(await page.locator('#appInfoDialog nav a').evaluateAll(as=>as.map(a=>a.href)),expected);
 assert.ok((await page.locator('#appInfoDialog .app-info-email').getAttribute('href')).startsWith('mailto:lesespiele.heike.amthor@gmx.de'));
 assert.ok(await page.locator('#appInfoDialog nav a').evaluateAll(as=>as.every(a=>a.target==='_blank'&&a.rel.includes('noopener')&&a.rel.includes('noreferrer'))));
 await page.keyboard.press('Escape');assert.equal(await page.locator('#appInfoDialog').evaluate(e=>e.open),false);assert.equal(await page.locator('#profileDialog').evaluate(e=>e.open),true);
 await page.locator('input[name=name]').fill('Info-Test');await page.locator('.profile-create button').click();
 for(const scale of [1,1.5,2]){
 await page.evaluate(s=>document.documentElement.style.setProperty('--menu-text-scale',s),scale);
 await page.locator('#appInfoButton').click();await page.locator('#appInfoDialog').waitFor();
 assert.ok(await page.locator('#appInfoDialog').evaluate(e=>{const b=e.getBoundingClientRect();return b.left>=0&&b.top>=0&&b.right<=innerWidth+1&&b.bottom<=innerHeight+1&&e.scrollWidth<=e.clientWidth+1;}));
 if(process.env.SCREENSHOT_DIR&&width===393&&scale===1)await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR,'info-kontakt.png'),fullPage:true});
 await page.locator('#appInfoDialog button').click();assert.equal(await page.evaluate(()=>document.activeElement.id),'appInfoButton');
 }
 await page.context().setOffline(true);await page.locator('#appInfoButton').click();await page.locator('#appInfoDialog').waitFor();assert.ok((await page.locator('#appInfoDialog').innerText()).includes('lesespiele.heike.amthor@gmx.de'));await page.keyboard.press('Escape');await page.context().setOffline(false);
 for(const game of ['reading','sort','family']){
 await page.evaluate(g=>LDSelection.openGame(g),game);await page.locator('#start').click();await page.locator('#gameMenu').evaluate(e=>e.open=true);await page.locator('#gameMenu [data-open-info]').click();await page.locator('#appInfoDialog').waitFor();await page.locator('#appInfoDialog button').click();assert.equal(await page.locator('#play').isVisible(),true);assert.equal(await page.locator('#score').textContent(),'0 / 10');await page.evaluate(()=>LDSelection.home());
 }
 assert.deepEqual(errors,[]);console.log(width+'×'+height+': Info bei Profilwahl, Spielauswahl und allen Spielen, Links, Fokus, Offline und große Schrift bestanden');await page.close();
 }
 }finally{await browser?.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
