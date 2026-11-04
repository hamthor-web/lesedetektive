'use strict';
(()=>{
 const menu=document.getElementById('gameMenu');
 if(!menu)return;
 const compact=matchMedia('(max-width:600px), (max-aspect-ratio:2/3), (max-height:500px)');
 function layout(){menu.open=!compact.matches;}
 layout();compact.addEventListener('change',layout);
 for(const button of menu.querySelectorAll('button'))button.addEventListener('click',()=>{if(compact.matches)menu.open=false;});
 document.addEventListener('pointerdown',event=>{if(compact.matches&&menu.open&&!menu.contains(event.target))menu.open=false;});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&compact.matches&&menu.open){menu.open=false;menu.querySelector('summary').focus();event.preventDefault();}});
})();
