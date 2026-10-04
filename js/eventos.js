/* ============ EVENTOS ============ */
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-go],[data-goto],[data-act],[data-open],[data-new],[data-newdate],[data-pv],[data-newstatus],[data-st-tab],[data-strat-tab],[data-tpl],[data-hook],[data-go2write],[data-objpost],[data-manual],[data-usestory],[data-story2post],[data-kb],[data-kbback],[data-kbcat],[data-lb],[data-lbnav],[data-reftab],[data-refopen],#lb');
  if(!t||t.tagName==='SELECT')return;const d=t.dataset;
  if(d.lb){e.stopPropagation();LB={a:d.lb.split('|'),i:+d.lbi};showLB();return}
  if(d.lbnav){e.stopPropagation();LB.i=(LB.i+ +d.lbnav+LB.a.length)%LB.a.length;showLB();return}
  if(t.id==='lb'){$('#lb').classList.remove('on');return}
  if(d.reftab){refTab=d.reftab;render();return}
  if(d.refopen){e.preventDefault();refTab='ig';go('refs');setTimeout(()=>{const el=[...document.querySelectorAll('.card h3')].find(h=>h.textContent===exByCode(d.refopen).title);el&&el.scrollIntoView({behavior:'smooth'})},50);return}
  if(d.kb!==undefined&&t.dataset.kb){kbId=d.kb;if(open)closeDrawer();go('kb');return}
  if(d.kbback!==undefined){kbId=null;render();return}
  if(d.kbcat){kbCat=d.kbcat;render();return}
  if(d.go){e.preventDefault();if(d.go==='kb')kbId=null;go(d.go)}
  else if(d.goto){const[p,tab]=d.goto.split('|');if(open)closeDrawer();go(p,tab)}
  else if(d.open){e.stopPropagation();const[c,i]=d.open.split(':');openItem(c,i)}
  else if(d.new)newItem(d.new);
  else if(d.newdate)newItem('posts',{date:d.newdate});
  else if(d.newstatus)newItem('posts',{status:d.newstatus});
  else if(d.pv){postView=d.pv;render()}
  else if(d.stTab){storyTab=d.stTab;render()}
  else if(d.stratTab){stratTab=d.stratTab;render()}
  else if(d.manual){S.manual[d.manual]=true;save();render();toast('Passo concluído')}
  else if(d.go2write){writeId=d.go2write;closeDrawer();go('write')}
  else if(d.objpost)newItem('posts',{phase:d.objpost,objection:d.obj,funnel:'Fundo',pillar:'Venda / Oferta',title:'Objeção: '+d.obj,techs:['Antecipação e quebra de objeções diária']});
  else if(d.story2post||d.usestory){const s=S.stories.find(x=>x.id===(d.story2post||d.usestory));
    const body=`IDENTIFICAÇÃO\n\n\nHISTÓRIA\nConflito: ${s.problem||''}\nVirada: ${s.decision||''}\nConsequência: ${s.result||''}\n\nCONTEÚDO\n${s.lesson||''}\n`;
    if(d.usestory){const p=S.posts.find(x=>x.id===writeId);p.script=(p.script?p.script+'\n\n':'')+body;save();render()}
    else{s.used='Sim';const p=newItem('posts',{title:s.lesson||s.title,structure:'IHC',pillar:'Conexão (trajetória)',funnel:'Meio',pyramid:'Ponte (trajetória)',script:body},false);writeId=p.id;closeDrawer();go('write')}}
  else if(d.tpl){const p=S.posts.find(x=>x.id===writeId);p.script=(p.script?p.script+'\n\n':'')+TPL[d.tpl];if(['IHC','Lista BDA','Spoiler','Confissão','Contraste'].includes(d.tpl))p.structure=d.tpl;save();render()}
  else if(d.hook){const p=S.posts.find(x=>x.id===writeId);p.hook=d.hook;save();render()}
  else if(d.act){const a=d.act;
   if(a==='theme'){S.theme=curTheme()==='dark'?'light':'dark';save();applyTheme()}
   if(a==='menu')$('#side').classList.toggle('on');
   if(a==='newpost'){e.preventDefault();newItem('posts',{date:today()})}
   if(a==='close')closeDrawer();
   if(a==='del'&&open&&window.confirm('Excluir este item?')){S[open.col]=S[open.col].filter(x=>x.id!==open.id);save();Capas.limpar();closeDrawer()}
   if(a==='dup'&&open){const x=JSON.parse(JSON.stringify(S[open.col].find(i=>i.id===open.id)));x.id=uid();x.title+=' (cópia)';S[open.col].push(x);save();openItem(open.col,x.id)}
   if(a==='calprev'){calMonth.setMonth(calMonth.getMonth()-1);render()}
   if(a==='calnext'){calMonth.setMonth(calMonth.getMonth()+1);render()}
   if(a==='caltoday'){calMonth=new Date();render()}
   if(a==='export')exportarBackup();
   if(a==='import')$('#fileIn').click();
   if(a==='coverclear'&&open){const x=S[open.col].find(i=>i.id===open.id);x.cover='';save();Capas.limpar();openItem(open.col,open.id)}
   if(a==='plansched'){if(!S.plan30.start){toast('Escolha a data de início');return}PLAN30.forEach((x,i)=>{const d=new Date(S.plan30.start+'T12:00');d.setDate(d.getDate()+i);const k=iso(d);if(!S.posts.some(p=>p.plan30===i&&p.date===k))S.posts.push({id:uid(),title:x[0],date:k,format:'Stories',status:'Ideia',funnel:'Meio',techs:[],metrics:{},bda:{},hook:'',script:x[1],caption:'',cta:'',plan30:i})});save();toast('30 stories agendados');render()}}
});
document.addEventListener('input',e=>{
  const t=e.target,d=t.dataset;
  if(open&&(d.f||d.m||d.multi)){const x=S[open.col].find(i=>i.id===open.id);
   if(d.f)x[d.f]=t.value;
   if(d.m){x.metrics=x.metrics||{};x.metrics[d.m]=t.value;const v=$('#engv');if(v)v.textContent=eng(x)!==null?eng(x).toFixed(2)+'%':'—'}
   if(d.multi)x[d.multi]=[...document.querySelectorAll(`[data-multi="${d.multi}"]:checked`)].map(i=>i.value);
   save();return}
  if(d.w){const p=S.posts.find(x=>x.id===writeId);p[d.w]=t.value;save();const w=(p.script||'').trim().split(/\s+/).filter(Boolean).length;$('#wc').textContent=`${w} palavras · cerca de ${Math.round(w/2.5)}s falados · legenda ${(p.caption||'').length}/2200`;return}
  if(d.st){S.strategy[d.st]=t.value;save();nav()}
  if(d.kbq!==undefined){kbQ=t.value;const pos=t.selectionStart;render();const n=$('[data-kbq]');n.focus();n.setSelectionRange(pos,pos)}
});
document.addEventListener('change',e=>{
  const t=e.target,d=t.dataset;if(open)return;
  if(d.daily){(S.daily[today()]=S.daily[today()]||{})[d.daily]=t.checked;save();render()}
  if(d.dailyk){const[k,b]=d.dailyk.split('|');(S.daily[k]=S.daily[k]||{})[b]=t.checked;save();render()}
  if(d.bda!==undefined){const p=S.posts.find(x=>x.id===writeId);p.bda=p.bda||{};p.bda[d.bda]=t.checked;save();render()}
  if(d.pt){S.strategy.points[d.pt]=+t.value;save();render()}
  if(d.read){S.read[d.read]=t.checked;save()}
  if(d.plan!==undefined){S.plan30.done[d.plan]=t.checked;save();render()}
  if(d.planStart!==undefined){S.plan30.start=t.value;save();render()}
  if(d.manualcb){S.manual[d.manualcb]=t.checked;save();nav()}
  if(d.act==='writesel'){writeId=t.value;render()}
  if(t.id==='fileIn'&&t.files[0]){importarBackup(t.files[0]);t.value=''}
});
document.addEventListener('keydown',e=>{if($('#lb').classList.contains('on')){if(e.key==='Escape')$('#lb').classList.remove('on');if(e.key==='ArrowRight'){LB.i=(LB.i+1)%LB.a.length;showLB()}if(e.key==='ArrowLeft'){LB.i=(LB.i-1+LB.a.length)%LB.a.length;showLB()}return}if(e.key==='Escape'&&open)closeDrawer()});
window.addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(h&&h!==cur){cur=h;render()}});
let LB={a:[],i:0};function showLB(){$('#lbimg').src=LB.a[LB.i];$('#lb').classList.add('on')}
function curTheme(){return S.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}
function applyTheme(){document.documentElement.dataset.theme=curTheme();$('#themeLbl').textContent=curTheme()==='dark'?'Modo claro':'Modo escuro'}
