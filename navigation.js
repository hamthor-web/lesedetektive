'use strict';
(async()=>{
  if(window.LDProfiles)await window.LDProfiles.ready;
  const $=id=>document.getElementById(id),known=new Set(['home','setup','play','progress']);
  let rendering=false;
  const game=()=>window.LDConfig?.().game||location.hash.slice(1).split('/')[0]||'reading';
  const state=(view,g=game())=>({ld:true,view,game:g});
  const url=s=>location.pathname+location.search+(s.view==='home'?'':'#'+s.game+(s.view==='setup'?'':'/'+s.view));
  function controls(s){$('backButton').hidden=s.view==='home';}
  function show(view,g=game()){
    if(rendering||!known.has(view))return;
    const s=state(view,g),old=history.state;
    if(!old?.ld||old.view!==s.view||old.game!==s.game)history.pushState(s,'',url(s));
    controls(s);
  }
  function render(s){
    rendering=true;
    try{
      if(s.view==='home')window.LDSelection.home();
      else{
        if(window.LDConfig?.().game!==s.game)window.LDSelection.openGame(s.game);
        window.LDGame.openView(s.view);
      }
      controls(s);
    }finally{rendering=false;}
  }
  function back(){if(history.state?.ld&&history.state.view!=='home')history.back();}
  window.LDNavigation={show,back};
  const initial=$('home').hidden?state('setup'):state('home');
  // Keep a real app-home entry beneath deep links, so the system back gesture stays within the app.
  const base=state('home');history.replaceState(base,'',url(base));
  if(initial.view!=='home')history.pushState(initial,'',url(initial));
  controls(initial);
  window.addEventListener('popstate',event=>{if(event.state?.ld&&known.has(event.state.view))render(event.state);});
  $('backButton').onclick=back;
  let touch=null;
  document.addEventListener('touchstart',event=>{
    const t=event.touches[0];if(!t||event.touches.length!==1)return;
    const target=event.target;
    if(target.closest?.('button,input,select,textarea,a,.stage,dialog')||$('home').hidden===false){touch=null;return;}
    // Leave native edge gestures to the browser; our history entries give them the same destination.
    touch=t.clientX>40?{x:t.clientX,y:t.clientY,started:Date.now()}:null;
  },{passive:true});
  document.addEventListener('touchmove',event=>{
    if(!touch||event.touches.length!==1)return;
    const t=event.touches[0],dx=t.clientX-touch.x,dy=t.clientY-touch.y;
    if(Math.abs(dy)>55){touch=null;return;}
    if(dx>35&&dx>Math.abs(dy)*2&&event.cancelable)event.preventDefault();
  },{passive:false});
  document.addEventListener('touchend',event=>{
    if(!touch)return;const t=event.changedTouches[0],start=touch;touch=null;
    if(t&&t.clientX-start.x>85&&Math.abs(t.clientY-start.y)<55&&Date.now()-start.started<900)back();
  },{passive:true});
  document.addEventListener('touchcancel',()=>{touch=null;},{passive:true});
})();
