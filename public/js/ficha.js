/* ============ FICHA (drawer) ============ */
let open=null;
function openItem(col,id){
  const x=S[col].find(i=>i.id===id);if(!x)return;open={col,id};const sc=SCHEMAS[col];
  const field=([k,l,type,opt])=>{const v=x[k];let inp;
   if(type==='select')inp=`<select class="f" data-f="${k}"><option value=""></option>${opt.map(o=>`<option ${v===o?'selected':''}>${esc(o)}</option>`).join('')}</select>`;
   else if(type==='ref')inp=`<select class="f" data-f="${k}"><option value=""></option>${S[opt].filter(o=>o.id!==x.id).map(o=>`<option value="${o.id}" ${v===o.id?'selected':''}>${esc(o.title||'Sem título')}</option>`).join('')}</select>`;
   else if(type==='multi')inp=`<div>${opt.map(o=>`<label class="pill"><input type="checkbox" data-multi="${k}" value="${esc(o)}" ${(v||[]).includes(o)?'checked':''}>${esc(o)}</label>`).join('')}</div>`;
   else if(type==='cover')inp=Capas.campo(x,k);
   else if(type==='textarea')inp=`<textarea class="f" data-f="${k}">${esc(v)}</textarea>`;
   else inp=`<input class="f" type="${type}" data-f="${k}" value="${esc(v)}">`;
   return `<label>${l}</label>${inp}`};
  let extra='';
  if(col==='posts'){const m=x.metrics||{};
   extra=`<div class="row" style="margin-top:20px"><h2 style="margin:0">Texto</h2><span class="spacer"></span><button class="btn sm" data-go2write="${x.id}">Abrir no modo foco</button></div>
   <label class="lab">Gancho</label><input class="f" data-f="hook" value="${esc(x.hook)}">
   <label class="lab">Roteiro</label><textarea class="f" data-f="script" style="min-height:180px">${esc(x.script)}</textarea>
   <label class="lab">Legenda</label><textarea class="f" data-f="caption">${esc(x.caption)}</textarea>
   <label class="lab">CTA</label><input class="f" data-f="cta" value="${esc(x.cta)}">
   ${Anexos.secao(x)}
   <h2>Análise</h2><div class="grid g4">${[['reach','Alcance'],['views','Visualizações'],['likes','Curtidas'],['comments','Comentários'],['shares','Compartilhamentos'],['saves','Salvos'],['follows','Seguidores'],['dms','DMs e leads']].map(([k,l])=>`<div><label class="lab" style="margin-top:0">${l}</label><input class="f" type="number" data-m="${k}" value="${esc(m[k]??'')}"></div>`).join('')}</div>
   <p>Engajamento: <b id="engv">${eng(x)!==null?eng(x).toFixed(2)+'%':'—'}</b></p>
   <label class="lab">Aprendizados (o que funcionou, perguntas e objeções que surgiram)</label><textarea class="f" data-f="analysis">${esc(x.analysis)}</textarea>`}
  if(col==='stories')extra=`<div style="margin-top:18px"><button class="btn pri" data-story2post="${x.id}">Transformar em conteúdo (IHC)</button></div>`;
  $('#drawerIn').innerHTML=`<div class="row"><span class="eyebrow" style="margin:0">${sc.title}</span><span class="spacer"></span><button class="btn sm ghost" data-act="dup">Duplicar</button><button class="btn sm ghost" data-act="del">Excluir</button><button class="btn sm" data-act="close">Fechar</button></div>
   <input class="titlein" data-f="title" value="${esc(x.title)}" placeholder="Sem título">
   <div class="props">${sc.fields.map(field).join('')}</div>${extra}`;
  $('#drawer').classList.add('on');$('#ov').classList.add('on');
}
function closeDrawer(){$('#drawer').classList.remove('on');$('#ov').classList.remove('on');open=null;render()}
function newItem(col,extra={},show=true){
  const x={id:uid(),title:'',...(col==='posts'?{status:'Ideia',format:'Reels',funnel:'Topo',techs:[],metrics:{},bda:{},hook:'',script:'',caption:'',cta:''}:{}),...extra};
  S[col].push(x);save();if(show)openItem(col,x.id);return x;
}

