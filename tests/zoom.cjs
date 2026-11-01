const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const code=fs.readFileSync(path.join(__dirname,'../zoom.js'),'utf8');
class Bar{constructor(){this.parts={}}setAttribute(){}querySelector(s){return this.parts[s]??={addEventListener(type,fn){this.click=fn}}}}
function load(storage,stored){const nodes=[],props={},attrs={};const panel={prepend:n=>nodes.push(n)};const document={documentElement:{style:{setProperty:(k,v)=>props[k]=v},toggleAttribute:(k,v)=>attrs[k]=v},body:{prepend:n=>nodes.push(n)},createElement:()=>new Bar(),querySelector:()=>panel,getElementById:()=>panel};vm.runInNewContext(code,{document,localStorage:storage});return {nodes,props,attrs}}
const values=new Map(),storage={getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)};
const first=load(storage);assert.equal(first.nodes.length,3);const bar=first.nodes[0],button=a=>bar.querySelector('[data-zoom="'+a+'"]');
assert.equal(first.props['--app-zoom'],1);for(let i=0;i<9;i++)button('in').click();assert.equal(first.props['--app-zoom'],2);assert.equal(button('in').disabled,true);
assert.equal(first.nodes[1].querySelector('[data-zoom="reset"]').textContent,'200 %');
const next=load(storage);assert.equal(next.props['--app-zoom'],2);button('reset').click();assert.equal(first.props['--app-zoom'],1);assert.equal(first.attrs['data-app-zoomed'],false);
for(let i=0;i<9;i++)button('out').click();assert.equal(first.props['--app-zoom'],.75);assert.equal(button('out').disabled,true);
assert.doesNotThrow(()=>load({getItem(){throw Error()},setItem(){throw Error()}}));
values.set('lesedetektive:zoom:v1','900');assert.equal(load(storage).props['--app-zoom'],1);
for(const file of ['index.html','lesen.html','laute.html']){const html=fs.readFileSync(path.join(__dirname,'..',file),'utf8');assert.ok(html.includes('src="zoom.js"'));assert.ok(!/user-scalable=no|maximum-scale=1/.test(html))}
console.log('BESTANDEN: Zoom auf allen Seiten und im Profildialog; Grenzen 75–200 %, Zurücksetzen, synchronisierte Anzeigen, Speicherung und gesperrter Speicher; Browserzoom bleibt erlaubt.');
