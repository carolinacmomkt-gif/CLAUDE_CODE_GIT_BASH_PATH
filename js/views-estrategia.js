/* ---------- COLEÇÃO GENÉRICA ---------- */
function collection(col,cols){
  const sc=SCHEMAS[col],L=S[col];
  return `<div class="row" style="margin:6px 0 12px"><span class="spacer"></span><button class="btn" data-new="${col}">${ic('plus')}${sc.title}</button></div>`+
  (L.length?`<div class="tablewrap"><table><tr><th>Nome</th>${cols.map(c=>`<th>${sc.fields.find(f=>f[0]===c)[1]}</th>`).join('')}</tr>
  ${L.map(x=>`<tr class="click" data-open="${col}:${x.id}"><td>${esc(x.title||'Sem título')}</td>${cols.map(c=>{const f=sc.fields.find(f=>f[0]===c),v=x[c];
   if(f[2]==='select')return `<td>${tag(v)}</td>`;if(f[2]==='date')return `<td class="muted">${fmtD(v)}</td>`;if(f[2]==='ref')return `<td>${esc(findRef(f[3],v)?.title||'')}</td>`;
   return `<td class="small">${esc(String(v??'').slice(0,80))}</td>`}).join('')}</tr>`).join('')}</table></div>`:`<div class="empty">Nada por aqui ainda.</div>`);
}

/* ---------- STORIES ---------- */
VIEWS.stories=()=>{
  const t=storyTab,tabs=[['rituals','Rituais'],['boxes','Caixinhas e enquetes'],['week','Semana'],['plan','Plano 30 dias'],['guide','Como fazer']];
  let body='';
  if(t==='rituals')body=guideBox('rituais','Crie algo que você repete todo dia, com frase de efeito, que o público consegue fazer junto. Quando alguém marcar você, reposte com um comentário que incentive os outros.')+collection('rituals',['phrase','freq','status']);
  if(t==='boxes')body=guideBox('enquete','Comece simples e aprofunde. Para gerar opinião, escolha temas que dividem (oito ou oitenta) e deixe lacunas para o seguidor completar.')+collection('boxes',['kind','style','date']);
  if(t==='week'){const d0=new Date();d0.setDate(d0.getDate()-((d0.getDay()+6)%7));const B=['07h','10h','12h','15h','20h','caixinha','estilo'];
   body=guideBox('video','Postar cedo aumenta a audiência. Evite postar tudo de uma vez: a barrinha deve encher ao longo do dia.')+`<div class="tablewrap" style="margin-top:14px"><table><tr><th>Dia</th>${B.map(b=>`<th>${b}</th>`).join('')}<th></th></tr>
   ${[...Array(7)].map((_,i)=>{const d=new Date(d0);d.setDate(d0.getDate()+i);const k=iso(d),r=S.daily[k]||{},n=B.filter(b=>r[b]).length;
    return `<tr><td style="text-transform:capitalize">${d.toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit'})}</td>${B.map(b=>`<td><input type="checkbox" data-dailyk="${k}|${b}" ${r[b]?'checked':''}></td>`).join('')}<td class="small muted">${n}/7</td></tr>`}).join('')}</table></div>`}
  if(t==='plan'){const pl=S.plan30,dn=Object.values(pl.done).filter(Boolean).length;
   body=guideBox('rituais','Um roteiro de 30 dias adaptado do planner do Stories para Enriquecer. A ordem pode mudar. Escolha a data de início e agende tudo no calendário com um clique.')+
   `<div class="row" style="margin:16px 0"><label class="small muted">Início</label><input class="f" type="date" style="max-width:180px" data-plan-start value="${esc(pl.start)}"><button class="btn pri" data-act="plansched">Agendar no calendário</button><span class="spacer"></span><span class="small">${dn}/30 feitos</span></div>
   <div class="tablewrap"><table><tr><th>Dia</th><th>Ação</th><th>Como</th><th>Referência</th><th>Feito</th></tr>${PLAN30.map((x,i)=>{let dd='';if(pl.start){const d=new Date(pl.start+'T12:00');d.setDate(d.getDate()+i);dd=fmtD(iso(d))}
    return `<tr><td class="muted" style="white-space:nowrap">${String(i+1).padStart(2,'0')} ${dd?'· '+dd:''}</td><td style="font-weight:500">${esc(x[0])}</td><td class="small muted">${esc(x[1])}</td><td class="thumbs" style="white-space:nowrap">${(()=>{const r=PLANREF[i]||[[],[]];const ig=r[0].map(exByCode).filter(Boolean);const imgs=[...ig.flatMap(e=>sl(e.code,e.n).slice(0,2)),...r[1].flatMap(b=>PINMAP[b].slice(0,1))];return imgs.map((s,j)=>`<img src="${s}" loading="lazy" ${lbAttr(imgs,j)} alt="">`).join('')+(ig[0]?`<div class="small"><a href="#" data-refopen="${ig[0].code}">${esc(ig[0].title)}</a></div>`:'')})()}</td><td><input type="checkbox" data-plan="${i}" ${pl.done[i]?'checked':''}></td></tr>`}).join('')}</table></div>`}
  if(t==='guide')body=`<div class="grid g2">${['caixinha','enquete','camadas','video','rituais','repost'].map(id=>{const x=T(id);return `<div class="card"><h3>${esc(x.name)}</h3><p class="small">${esc(x.what)}</p><div class="quote small">${esc(x.ex)}<cite>Luana Carolina</cite></div></div>`}).join('')}
   <div class="card"><h3>Temas de caixinha</h3><div class="small">Tudo menos trabalho · O que você quer ver no meu celular? · Eu nunca… · Conselhos sobre (seu tema) · O que eu faria se…</div></div>
   <div class="card"><h3>Story em camadas</h3><ol class="small" style="padding-left:18px;margin:0"><li>Crie um story de texto ocupando a tela</li><li>Salve na galeria</li><li>Suba de novo</li><li>Pinte por cima, de cima para baixo</li><li>Poste parte por parte</li></ol></div></div>`;
  return head('Estratégia','Stories','Rituais, caixinhas, enquetes e frequência. O sistema do Stories para Enriquecer.')+`<div class="tabs">${tabs.map(([k,n])=>`<div class="tab ${t===k?'on':''}" data-st-tab="${k}">${n}</div>`).join('')}</div>`+body;
};

/* ---------- POSICIONAMENTO ---------- */
VIEWS.strategy=()=>{
  const st=S.strategy,t=stratTab,tabs=[['dest','Destino final'],['points','Pontos de informação'],['pyr','Pirâmide'],['traj','Banco de histórias']];
  const fld=(k,l,ph,ta)=>`<label class="lab">${l}</label>${ta?`<textarea class="f" data-st="${k}" placeholder="${esc(ph)}">${esc(st[k]||'')}</textarea>`:`<input class="f" data-st="${k}" placeholder="${esc(ph)}" value="${esc(st[k]||'')}">`}`;
  let body='';
  if(t==='dest')body=`<div class="grid split" style="grid-template-columns:1.5fr 1fr;align-items:start"><div class="card">${fld('guide','Eu sou guia de','Eu guio ___ de ___ até ___')}${fld('dest','Destino final (a promessa)','Para onde todo o conteúdo leva')}${fld('audience','As formigas certas','Quem já tem predisposição a comprar',1)}${fld('desires','O que eles dizem querer (uma frase por linha)','Frases literais de caixinhas, comentários e DMs',1)}${fld('diffs','Meu núcleo (vaca roxa)','Crenças, hábitos, histórico, jeito',1)}</div>
   <div class="grid">${guideBox('guia','As pessoas seguem quem já fez o caminho que elas querem fazer. Você não precisa estar no topo, só um passo à frente.')}${guideBox('destino','Depois de preencher, revise seus últimos 9 posts: cada um leva para esse destino?')}</div></div>`;
  if(t==='points'){const items=[['foto','Foto de perfil'],['bio','Bio'],['destaques','Destaques'],['link','Link e página'],['feed','Últimos 9 posts'],['visual','Identidade visual dos stories'],['voz','Jeito de falar e energia'],['provas','Provas sociais visíveis']];
   const sc=Object.values(st.points||{}).reduce((a,b)=>a+num(b),0);
   body=`<div class="grid split" style="grid-template-columns:1.5fr 1fr;align-items:start"><div><div class="tablewrap"><table><tr><th>Ponto de informação</th><th>0</th><th>1</th><th>2</th><th>3</th></tr>${items.map(([k,l])=>`<tr><td>${l}</td>${[0,1,2,3].map(v=>`<td><input type="radio" name="pt-${k}" data-pt="${k}" value="${v}" ${st.points?.[k]!==undefined&&num(st.points[k])===v?'checked':''}></td>`).join('')}</tr>`).join('')}</table></div>
   <div class="card" style="margin-top:14px">${fld('pointsNotes','O que ajustar','',1)}</div></div>
   <div class="grid"><div class="card stat"><div class="n">${sc}/24</div><div class="l">pontuação do perfil · meta 18</div><div class="bar" style="margin-top:8px"><i style="width:${sc/24*100}%"></i></div></div>${guideBox('pontos','0 = incoerente com o destino, 3 = comunica autoridade em segundos. A primeira impressão influencia todo o resto.')}</div></div>`}
  if(t==='pyr')body=`<div class="grid g2"><div class="card">${fld('top','Topo: resultados e estilo de vida que posso mostrar','',1)}</div><div class="card">${fld('base','Base: dificuldades que já vivi e meu público vive hoje','',1)}</div></div>
   <div class="grid g3" style="margin-top:14px">${OPTS.pyramid.map(p=>`<div class="card stat"><div class="n">${S.posts.filter(x=>x.pyramid===p).length}</div><div class="l">${p}</div></div>`).join('')}</div><div style="margin-top:14px">${guideBox('piramide','Mostrar só o topo afasta. Mostrar só a base não gera desejo. Percorra os extremos.')}</div>`;
  if(t==='traj')body=guideBox('trajetoria','Use a memória como ferramenta de produção. Cada história precisa de conflito, virada e consequência. Clique em uma história para transformá-la em conteúdo.')+collection('stories',['problem','lesson','used']);
  return head('Estratégia','Posicionamento','O Método Guia aplicado ao seu perfil: de quem você é guia, para onde leva e como o perfil comunica isso.')+`<div class="tabs">${tabs.map(([k,n])=>`<div class="tab ${t===k?'on':''}" data-strat-tab="${k}">${n}</div>`).join('')}</div>`+body;
};

/* ---------- LANÇAMENTOS ---------- */
VIEWS.phases=()=>head('Estratégia','Lançamentos','Antecipação, quebra de objeções e diagnóstico pelos três fatores determinantes.')+
  guideBox('antecipacao','Você precisa de tempo. Comece a quebrar as objeções semanas antes de abrir as vendas. Cada objeção listada aqui vira um conteúdo.')+
  collection('phases',['stage','product','start','end','marketStage'])+
  S.phases.map(ph=>{const L=S.posts.filter(p=>p.phase===ph.id),oc=objCover(ph);
   return `<h2>${esc(ph.title||'Lançamento')}</h2><div class="grid g2"><div class="card"><h3>Objeções</h3>${oc.length?oc.map(x=>`<div class="row small" style="padding:6px 0;border-bottom:1px solid var(--line)"><span class="dot ${x.ok?'done':''}" style="width:18px;height:18px;margin:0">${x.ok?ic('check'):''}</span>${esc(x.o)}<span class="spacer"></span>${x.ok?'':`<button class="btn sm" data-objpost="${ph.id}" data-obj="${esc(x.o)}">Criar conteúdo</button>`}</div>`).join(''):'<p class="muted small">Liste as objeções na ficha do lançamento.</p>'}</div>
   <div class="card"><h3>Conteúdos vinculados · ${L.length}</h3>${L.map(p=>`<div class="row small" style="padding:5px 0;cursor:pointer" data-open="posts:${p.id}">${tag(p.status)} ${esc(p.title)} <span class="muted">${fmtD(p.date)}</span></div>`).join('')||'<p class="muted small">Nenhum ainda</p>'}</div></div>`}).join('');

/* ---------- ANÚNCIOS ---------- */
VIEWS.ads=()=>{const A=S.ads,sp=A.reduce((a,x)=>a+num(x.spend),0),res=A.reduce((a,x)=>a+num(x.results),0),cl=A.reduce((a,x)=>a+num(x.clicks),0),im=A.reduce((a,x)=>a+num(x.impr),0);
  const best=S.posts.filter(p=>eng(p)!==null).sort((a,b)=>eng(b)-eng(a))[0];
  return head('Estratégia','Anúncios','Impulsione o que já provou no orgânico. O formato precisa parecer conteúdo, não pitch.')+
  `<div class="grid g4"><div class="card stat"><div class="n">R$ ${sp.toFixed(0)}</div><div class="l">investido</div></div><div class="card stat"><div class="n">${res}</div><div class="l">resultados</div></div><div class="card stat"><div class="n">${res?'R$ '+(sp/res).toFixed(2):'—'}</div><div class="l">custo por resultado</div></div><div class="card stat"><div class="n">${im?(cl/im*100).toFixed(2)+'%':'—'}</div><div class="l">CTR</div></div></div>
  <div style="margin-top:14px">${guideBox('oferta',best?`Candidato a impulsionar: <b>${esc(best.title)}</b> (${eng(best).toFixed(1)}% de engajamento).`:'Quando tiver métricas, o guia indica qual conteúdo impulsionar.')}</div>`+collection('ads',['status','objective','post','start','spend','results']);};

