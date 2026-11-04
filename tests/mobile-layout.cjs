const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true});
for(const [width,height] of [[320,740],[393,852],[412,915],[844,390],[1440,1000]]){
 const page=await browser.newPage({viewport:{width,height},serviceWorkers:'block'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765');await page.locator('input[name=name]').fill('Lesetest');await page.getByRole('button',{name:'Profil anlegen',exact:true}).click();
 for(const scale of [100,150,200]){
 await page.evaluate(s=>{localStorage.setItem('lesedetektive:ansichtzoom:v1',s)},String(scale));await page.reload();await page.locator('#home').waitFor();
 const check=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,button:document.querySelector('.game-menu button').getBoundingClientRect().height,font:parseFloat(getComputedStyle(document.querySelector('.game-menu button')).fontSize),control:document.querySelector('body>.zoom-controls button').getBoundingClientRect().height}));
 assert.ok(check.scroll<=width+1,JSON.stringify({width,scale,...check}));assert.ok(check.font>=24*scale/100);assert.ok(check.control>=48);
 for(const game of ['reading','sort','family']){await page.evaluate(g=>LDSelection.openGame(g),game);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`setup overflow ${width} ${scale} ${game}`);await page.evaluate(()=>LDSelection.home());}
 if(width===393&&scale===150)await page.screenshot({path:'/workspace/scratch/1d96fd1b8234/mobile-neu.png',fullPage:true});
 if(width===1440&&scale===100)await page.screenshot({path:'/workspace/scratch/1d96fd1b8234/desktop-neu.png',fullPage:true});
 }
 await page.getByRole('button',{name:'Lesetest wechseln',exact:true}).click();assert.ok(await page.evaluate(()=>document.querySelector('.profile-panel').scrollWidth<=document.querySelector('.profile-panel').clientWidth+1),`profile overflow ${width}`);
 assert.deepEqual(errors,[]);await page.close();
}await browser.close();console.log('BESTANDEN: 320/393/412/844/1440 px, 100/150/200 %, alle Variantenwahlen, Profil und Regler ohne horizontales Überlaufen; Schrift skaliert, Tasten mindestens 48 px.');})().catch(e=>{console.error(e);process.exitCode=1});
