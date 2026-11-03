const fs=require('fs'),vm=require('vm'),assert=require('assert');
function app(deep=false){
 const nodes={home:{hidden:deep},backButton:{hidden:true}},events={},touch={},opened=[];let left=0;
 const location={pathname:'/index.html',search:'',hash:deep?'#reading':''};
 const stack=[null];let cursor=0;
 const history={get state(){return stack[cursor]},replaceState(s,t,url){stack[cursor]=s;location.hash=url.includes('#')?url.slice(url.indexOf('#')):'';},pushState(s,t,url){stack.splice(++cursor);stack[cursor]=s;location.hash=url.includes('#')?url.slice(url.indexOf('#')):'';},back(){if(cursor>0){cursor--;events.popstate({state:stack[cursor]});}}};
 const window={LDConfig:()=>({game:'reading'}),LDSelection:{home(){left++},openGame(){}},LDGame:{openView:v=>opened.push(v)},addEventListener:(n,f)=>events[n]=f};
 const document={getElementById:id=>nodes[id],addEventListener:(n,f)=>touch[n]=f};
 vm.runInNewContext(fs.readFileSync(__dirname+'/../navigation.js','utf8'),{window,document,location,history,Date});
 return {nav:window.LDNavigation,history,nodes,stack,opened,touch,left:()=>left};
}
const a=app();assert.equal(a.history.state.view,'home');a.nav.show('setup','reading');a.nav.show('play','reading');assert.deepStrictEqual(a.stack.map(s=>s.view),['home','setup','play']);a.nav.back();assert.equal(a.opened.at(-1),'setup');assert.equal(a.history.state.view,'setup');
a.nodes.home.hidden=true;a.touch.touchstart({touches:[{clientX:80,clientY:200}],target:{closest:()=>null}});a.touch.touchend({changedTouches:[{clientX:190,clientY:210}]});assert.equal(a.history.state.view,'home');assert.equal(a.left(),1);
const d=app(true);assert.deepStrictEqual(d.stack.map(s=>s.view),['home','setup']);d.nav.show('play');d.nav.show('progress');d.nav.back();assert.equal(d.opened.at(-1),'play');d.nav.back();assert.equal(d.opened.at(-1),'setup');d.nav.back();assert.equal(d.history.state.view,'home');
const b=app(true);b.touch.touchstart({touches:[{clientX:80,clientY:200}],target:{closest:()=>({})}});b.touch.touchend({changedTouches:[{clientX:200,clientY:210}]});assert.equal(b.history.state.view,'setup');
console.log('BESTANDEN: Browser-Zurück und Rechtswischen führen innerhalb der App zurück; direkte Spiel-Links haben eine Hauptauswahl darunter; Bildverschieben und Bedienelemente lösen keinen App-Swipe aus.');
