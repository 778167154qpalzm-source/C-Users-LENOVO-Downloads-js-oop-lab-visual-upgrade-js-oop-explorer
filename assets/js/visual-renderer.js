/* Safe, data-driven visual demonstrations for educational outputs. */
(() => {
 'use strict';
 const NS='http://www.w3.org/2000/svg';
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=String(text);return n};
 function svgNode(tag,attrs){const n=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,String(v)));return n}
 function shapeCard(item){
  const card=el('article','visual-shape-card');const head=el('div','visual-shape-head');head.append(el('b','',item.name),el('span','visual-type',item.type==='circle'?'دائرة':item.type==='rectangle'?'مستطيل':'مثلث'));card.append(head);
  const svg=svgNode('svg',{viewBox:'0 0 320 190',role:'img','aria-label':`رسم ${item.name}`});svg.append(svgNode('defs',{}));
  if(item.type==='circle'){
   const r=Math.max(14,Math.min(66,(Number(item.a)||1)*8));svg.append(svgNode('circle',{cx:160,cy:88,r,fill:'rgba(111,91,230,.16)',stroke:'#7257e8','stroke-width':4}));svg.append(svgNode('line',{x1:160,y1:88,x2:160+r,y2:88,stroke:'#e18b43','stroke-width':3}));const label=svgNode('text',{x:160+r/2,y:80,'text-anchor':'middle',fill:'currentColor','font-size':11});label.textContent=`r = ${item.a}`;svg.append(label);
   }else if(item.type==='rectangle'){
   const scale=Math.min(22,210/Math.max(Number(item.a)||1,Number(item.b)||1));const w=Math.max(24,(Number(item.a)||1)*scale),h=Math.max(20,(Number(item.b)||1)*scale);svg.append(svgNode('rect',{x:(320-w)/2,y:(150-h)/2,width:w,height:h,rx:5,fill:'rgba(48,171,155,.16)',stroke:'#2da99a','stroke-width':4}));const label=svgNode('text',{x:160,y:168,'text-anchor':'middle',fill:'currentColor','font-size':11});label.textContent=`${item.a} × ${item.b}`;svg.append(label);
  }else{
   const scale=Math.min(22,210/Math.max(Number(item.a)||1,Number(item.b)||1));const b=Math.max(30,(Number(item.a)||1)*scale),h=Math.max(25,(Number(item.b)||1)*scale);svg.append(svgNode('polygon',{points:`${160-b/2},${140} ${160+b/2},${140} 160,${140-h}`,fill:'rgba(229,157,67,.17)',stroke:'#d99037','stroke-width':4,'stroke-linejoin':'round'}));
  }
  card.append(svg);const formula=item.type==='circle'?`π × ${item.a}²`:item.type==='rectangle'?`${item.a} × ${item.b}`:`${item.a} × ${item.b} ÷ 2`;card.append(el('div','visual-formula',formula));card.append(el('div','visual-area',`المساحة: ${Number(item.area).toFixed(2)}`));return card;
 }
 function render(data){if(!data)return null;const wrap=el('section','visual-stage');wrap.append(el('div','visual-stage-heading','المحاكاة المرئية الناتجة عن تشغيل JavaScript'));
  if(data.kind==='shapes'){const grid=el('div','visual-shapes-grid');data.items.forEach(x=>grid.append(shapeCard(x)));wrap.append(grid)}
  if(data.kind==='vehicle'){const card=el('article','visual-object-card vehicle-card');card.append(el('div','visual-object-icon','🚘'));const info=el('div','visual-object-info');info.append(el('span','visual-type',data.type),el('h3','',data.name),el('p','',data.status));const metrics=el('div','visual-metrics');if(data.speed!==undefined)metrics.append(metric('السرعة',`${data.speed} كم/س`));if(data.range!==undefined)metrics.append(metric('مدى البطارية',`${data.range} كم`));card.append(info,metrics);wrap.append(card)}
  if(data.kind==='employees'){const grid=el('div','visual-object-grid');data.items.forEach(x=>{const c=el('article','visual-object-card');c.append(el('div','visual-object-icon',x.icon));const i=el('div','visual-object-info');i.append(el('span','visual-type','موظف'),el('h3','',x.name),el('b','',x.role),el('p','',x.task));c.append(i);grid.append(c)});wrap.append(grid)}
  if(data.kind==='profile'){const c=el('article','visual-object-card profile-card');c.append(el('div','visual-avatar',String(data.name||'?').trim().slice(0,1).toUpperCase()));const i=el('div','visual-object-info');i.append(el('span','visual-type','بطاقة موظف'),el('h3','',data.name),el('b','',data.role),el('p','',`القسم: ${data.department}`));c.append(i);wrap.append(c)}
  if(data.kind==='pet'){const c=el('article','visual-object-card pet-card');c.append(el('div','visual-object-icon',data.emoji||'🐾'));const i=el('div','visual-object-info');i.append(el('span','visual-type',data.animal),el('h3','',data.name),el('p','',`الصوت الناتج من makeSound(): ${data.sound}`));c.append(i);wrap.append(c)}
  return wrap;
 }
 function metric(label,value){const m=el('div','visual-metric');m.append(el('span','',label),el('b','',value));return m}
 window.OOPVisualRenderer={render};
})();
