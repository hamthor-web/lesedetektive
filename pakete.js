'use strict';
const LD_PACKAGES={};
for(const [game,size,count]of [['reading',24,3],['sort',59,6],['family',20,4]]){
 const length=game==='family'?15:20;
 LD_PACKAGES[game]=Array.from({length:count},(_,p)=>({id:game+'-p'+(p+1),label:'Paket '+(p+1),indices:Array.from({length},(_,i)=>(p*10+i)%size)}));
}
if(typeof module!=='undefined')module.exports=LD_PACKAGES;

// Fixed, reproducible mixing within each ten-task block preserves catalogue coverage.
function mixPackageBlock(block,seed){let state=seed;const out=[...block];for(let i=out.length-1;i>0;i--){state=(Math.imul(1664525,state)+1013904223)>>>0;const j=Math.floor(state/4294967296*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
LD_PACKAGES.sort.forEach((p,i)=>{p.indices=[...mixPackageBlock(p.indices.slice(0,10),3107+i*7919),...mixPackageBlock(p.indices.slice(10),9109+i*3571)];});
