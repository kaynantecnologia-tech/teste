/* Vibe a sós — interactive client review. No trackers, cookies, or backend. */
(()=>{
 const MODELS=[{id:'c1',code:'C-01',name:'Original',label:'Flor original, pétalas delicadas',flor:'assets/flor-c-original.png'},{id:'c2',code:'C-02',name:'Flor ampliada',label:'Mesmas pétalas, 18% maior',flor:'assets/flor-c-ampliada.png'},{id:'c3',code:'C-03',name:'Flor aberta',label:'Cinco pétalas para comparar',flor:'assets/flor-c-petalas.png'}];
 const COLORS=[
 {id:'v01',name:'Verde + cobre',surface:'#ffffff',letter:'#19494c',flower:'#ac7358',shine:'#ffe3a8',paper:'#f9f6f0',main:'#19494c',mainText:'#fff',tone:'#b67e60'},
 {id:'v02',name:'Verde + dourado',surface:'#ffffff',letter:'#19494c',flower:'#d6aa68',shine:'#fff1c4',paper:'#f9f6f0',main:'#19494c',mainText:'#fff',tone:'#bc9061'},
 {id:'v03',name:'Dourado no verde',surface:'#19494c',letter:'#f6e9d6',flower:'#d9ad65',shine:'#fffad7',paper:'#f6f2eb',main:'#102f32',mainText:'#fff',tone:'#ba8869'},
 {id:'v04',name:'Branco no verde',surface:'#19494c',letter:'#ffffff',flower:'#ffffff',shine:'#fff',paper:'#f7f5f1',main:'#113739',mainText:'#fff',tone:'#b98a68'},
 {id:'v05',name:'Preto & branco',surface:'#ffffff',letter:'#181918',flower:'#181918',shine:'#fff4dd',paper:'#faf8f4',main:'#19494c',mainText:'#fff',tone:'#b88c6a'},
 {id:'v06',name:'Preto + cobre',surface:'#ffffff',letter:'#181918',flower:'#ac7358',shine:'#fff2bc',paper:'#faf8f4',main:'#19494c',mainText:'#fff',tone:'#af795d'},
 {id:'v07',name:'Cobre total',surface:'#fffaf5',letter:'#a77156',flower:'#a77156',shine:'#ffe4b2',paper:'#f8f1e9',main:'#19494c',mainText:'#fff',tone:'#ac7358'},
 {id:'v08',name:'Verde total',surface:'#f7f5ef',letter:'#19494c',flower:'#19494c',shine:'#e8f5ec',paper:'#f9f7f3',main:'#19494c',mainText:'#fff',tone:'#ac7358'}
 ];
 const $=s=>document.querySelector(s);const params=new URLSearchParams(location.search);let model=MODELS.find(x=>x.id===params.get('modelo'))||MODELS[0];let color=COLORS.find(x=>x.id===params.get('cor'))||COLORS[0];
 function applyToShop(){const el=$('#shop');if(!el)return;
  const vars={surface:color.surface,letter:color.letter,flower:color.flower,shine:color.shine,paper:color.paper,main:color.main,maintext:color.mainText,tone:color.tone,'header-text':color.surface==='#19494c'?'#fff':'#19494c',button:color.main,'button-text':color.mainText};
  for(const [key,value] of Object.entries(vars))el.style.setProperty('--'+key,value);
  el.querySelectorAll('.logo-unit').forEach(x=>x.style.setProperty('--flower-url',`url("${model.flor}")`));
  document.querySelectorAll('.logo-unit').forEach(x=>{x.style.setProperty('--flower-url',`url("${model.flor}")`);x.querySelectorAll('.logo-letters,.logo-flower,.logo-shimmer,.petal').forEach(y=>{y.style.animation='none';void y.offsetWidth;y.style.animation='';});});
 }
 function safeStored(){try{return JSON.parse(localStorage.getItem('vibe-favoritos')||'[]')}catch{return []}}
 function writeStored(x){try{localStorage.setItem('vibe-favoritos',JSON.stringify(x))}catch{}}
 const preview=params.get('preview')==='1';
 if(preview){document.body.classList.add('shop-mode');$('#shop-preview').hidden=false;$('#studio').hidden=true;applyToShop();addEventListener('message',ev=>{if(ev.source!==parent)return;if(ev.data?.type==='vibe-update'){model=MODELS.find(x=>x.id===ev.data.model)||model;color=COLORS.find(x=>x.id===ev.data.color)||color;applyToShop()}});return}
 const iframe=$('#previewIframe'),swatchBox=$('#swatches');let mode='desktop',timer=null,presentation=params.get('apresentacao')==='1';let auto=false;
 for(const c of COLORS){const btn=document.createElement('button');btn.className='swatch';btn.dataset.color=c.id;btn.title=c.name;btn.innerHTML=`<span class="swatch-colors"><i style="background:${c.surface}"></i><i style="background:${c.letter}"></i><i style="background:${c.flower}"></i></span><span>${c.id.toUpperCase()} · ${c.name}</span>`;btn.addEventListener('click',()=>{stopAuto();color=c;update()});swatchBox.append(btn)}
 function send(){iframe.contentWindow?.postMessage({type:'vibe-update',model:model.id,color:color.id},location.protocol==='file:'?'*':location.origin)}
 function update(){const code=`${model.code} · ${color.id.toUpperCase()}`;$('#currentCode').textContent=code;$('#currentName').textContent=`${model.name} · ${color.name}`;$('#codeSub').textContent=code;document.querySelectorAll('[data-model]').forEach(b=>b.classList.toggle('is-selected',b.dataset.model===model.id));document.querySelectorAll('[data-color]').forEach(b=>b.classList.toggle('is-selected',b.dataset.color===color.id));const u=new URL(location.href);u.searchParams.set('modelo',model.id);u.searchParams.set('cor',color.id);u.searchParams.delete('preview');u.searchParams.delete('apresentacao');history.replaceState({},'',u);send();updateFavs()}
 function updateFavs(){const fav=safeStored(),key=`${model.code} · ${color.id.toUpperCase()}`;$('#favoritesText').textContent=fav.length?fav.join('  ·  '):'nenhuma ainda';$('#favorite').textContent=fav.includes(key)?'♥ Salva':'♡ Salvar favorita'}
 function stopAuto(){if(timer)clearInterval(timer);timer=null;auto=false;$('#autoplay').textContent='▶ Automático'}
 function step(){const i=COLORS.indexOf(color);if(i<COLORS.length-1)color=COLORS[i+1];else {color=COLORS[0];model=MODELS[(MODELS.indexOf(model)+1)%MODELS.length]}update()}
 function startAuto(){stopAuto();auto=true;$('#autoplay').textContent='Ⅱ Pausar';timer=setInterval(step,7500)}
 document.querySelectorAll('[data-model]').forEach(b=>b.addEventListener('click',()=>{stopAuto();model=MODELS.find(x=>x.id===b.dataset.model);update()}));document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.view;$('#previewViewport').classList.toggle('mobile',mode==='mobile');$('#previewViewport').classList.toggle('desktop',mode!=='mobile');$('#viewLabel').textContent=mode==='mobile'?'MOBILE · LARGURA REAL':'DESKTOP · VISÃO REAL';document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('is-active',x===b))}));
 $('#replay').addEventListener('click',()=>{send()});$('#autoplay').addEventListener('click',()=>auto?stopAuto():startAuto());$('#favorite').addEventListener('click',()=>{const key=`${model.code} · ${color.id.toUpperCase()}`,f=safeStored();writeStored(f.includes(key)?f.filter(v=>v!==key):[...f,key]);updateFavs()});$('#copyFavs').addEventListener('click',async()=>{await copyText('Minhas favoritas da Vibe a sós: '+(safeStored().join(', ')||'nenhuma'));$('#copyFavs').textContent='✓ Copiado'});
 function shareText(){return `Gostei desta opção da Vibe a sós: ${model.code} · ${color.id.toUpperCase()} (${model.name}, ${color.name}). Veja: ${location.href}`}
 async function copyText(t){try{await navigator.clipboard.writeText(t);return true}catch{const x=document.createElement('textarea');x.value=t;document.body.append(x);x.select();document.execCommand('copy');x.remove();return true}}
 $('#share').addEventListener('click',async()=>{if(navigator.share){try{await navigator.share({title:'Minha escolha — Vibe a sós',text:shareText(),url:location.href});return}catch{}}await copyText(shareText());$('#share').textContent='✓ Escolha copiada'});
 $('#goPresentation').addEventListener('click',()=>{presentation=!presentation;document.body.classList.toggle('presentation',presentation);$('#goPresentation').textContent=presentation?'×':'↗'});$('.preview-heading').addEventListener('click',ev=>{if(document.body.classList.contains('presentation')&&ev.offsetX>innerWidth*.55){document.body.classList.remove('presentation');presentation=false}});
 iframe.addEventListener('load',send);update();if(presentation)document.body.classList.add('presentation');
})();
