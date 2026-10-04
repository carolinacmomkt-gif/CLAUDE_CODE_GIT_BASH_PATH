/* ---------- ESCREVER ---------- */
const CHECK=['A primeira frase prende (identificação ou spoiler)','Básico: quem chegou hoje entende','Didático: tem estrutura ou analogia','Aplicável: dá para fazer hoje','Leva ao destino final','Todo problema mostrado tem solução','O seguidor é o protagonista, não eu','Tem um CTA claro','Coerente com meus pontos de informação'];
const TPL={
 IHC:'IDENTIFICAÇÃO\n(a frase que faz a pessoa pensar "sou eu")\n\nHISTÓRIA\nConflito: \nVirada: \nConsequência: \n\nCONTEÚDO (a moral da história)\n\n\nCONTRASTE: que emoção ruim vem antes da boa?\n',
 'Lista BDA':'BÁSICO: o conceito em uma frase simples\n\nDIDÁTICO: analogia ou exemplo do dia a dia\n\n1.\n2.\n3.\n\nAPLICÁVEL: o que a pessoa faz hoje\n',
 Spoiler:'CLÍMAX PRIMEIRO\n(ex.: "Quebrei um prato super caro e já vou te contar o que aconteceu")\n\nO que aconteceu:\n\nO que aprendi:\n\nO que você faz com isso:\n',
 Confissão:'CONFISSÃO\n(algo que você errou ou sentiu e o público vive hoje)\n\nO que eu fazia:\nO que mudou:\nO que eu faço hoje:\n\nPara você:\n',
 Contraste:'ANTES (a dor, a emoção ruim):\n\nDEPOIS (o destino final):\n\nA PONTE (o que mudou no meio):\n',
 Caixinha:'PERGUNTA (é ela que faz a pessoa parar)\n\nPOSIÇÃO: concordo aprofundando ou quebro o senso comum?\n\nEXEMPLO PRÁTICO:\n\nLISTA:\n1.\n2.\n3.\n\nFRASE DE IMPACTO FINAL:\n',
};
const STRUCT_TECH={IHC:'ihc','Lista BDA':'bda',Tutorial:'bda',Spoiler:'video',Confissão:'trajetoria',Contraste:'piramide','Pergunta aberta':'enquete',Alerta:'antecipacao'};
VIEWS.write=()=>{
  const p=S.posts.find(x=>x.id===writeId)||[...S.posts].filter(p=>p.status!=='Publicado').sort((a,b)=>(a.date||'z').localeCompare(b.date||'z'))[0];
  if(!p)return head('Produção','Escrever','Um espaço focado para gancho, roteiro, legenda e CTA.')+`<div class="empty">Crie um conteúdo primeiro. <a href="#" data-act="newpost">Novo conteúdo</a></div>`;
  writeId=p.id;const sc=Object.values(p.bda||{}).filter(Boolean).length;
  const tid=STRUCT_TECH[p.structure]||'ihc';
  const tip=p.funnel==='Topo'?'Conteúdo de topo: fale com quem acabou de chegar. Comece pelo básico e evite siglas.':p.funnel==='Fundo'?'Conteúdo de fundo: aprofunde, mostre o método e quebre uma objeção específica.':p.funnel==='Meio'?'Conteúdo de meio: conexão. Mostre a trajetória, a base e o topo da pirâmide.':'Defina o estágio de funil na ficha.';
  return head('Produção','Escrever','Escreva aqui. Tudo salva sozinho.')+
  `<div class="row" style="margin-bottom:18px"><select class="f" style="max-width:380px" data-act="writesel">${S.posts.map(x=>`<option value="${x.id}" ${x.id===p.id?'selected':''}>${esc(x.title||'Sem título')}</option>`).join('')}</select>
   ${tag(p.format)}${tag(p.funnel)}${tag(p.structure)}<span class="spacer"></span><button class="btn sm" data-open="posts:${p.id}">Ficha completa</button></div>
  <div class="grid split" style="grid-template-columns:1.7fr 1fr;align-items:start">
   <div class="card">
    <label class="lab" style="margin-top:0">Gancho</label><input class="f" data-w="hook" value="${esc(p.hook)}" style="font-family:var(--display);font-size:18px">
    <label class="lab">Roteiro ou texto dos slides</label>
    <div class="row" style="margin-bottom:8px"><span class="small muted">Estrutura:</span>${Object.keys(TPL).map(k=>`<button class="btn sm" data-tpl="${k}">${k}</button>`).join('')}</div>
    <textarea class="f big" data-w="script">${esc(p.script)}</textarea>
    <label class="lab">Legenda</label><textarea class="f" data-w="caption" style="min-height:140px">${esc(p.caption)}</textarea>
    <label class="lab">CTA</label><input class="f" data-w="cta" value="${esc(p.cta)}">
    <p class="small muted" id="wc"></p>
   </div>
   <div class="grid">
    ${guideBox(tid,esc(tip))}
    <div class="card"><h3>Antes de publicar</h3><div class="checks">${CHECK.map((c,i)=>`<label><input type="checkbox" data-bda="${i}" ${p.bda&&p.bda[i]?'checked':''}>${c}</label>`).join('')}</div>
     <div class="row" style="margin-top:10px"><div class="bar" style="flex:1"><i style="width:${sc/CHECK.length*100}%"></i></div><span class="small">${sc}/${CHECK.length}</span></div></div>
    <div class="card"><h3>Ganchos de identificação</h3>${['Eu já me senti assim quando...','Eu já passei por essa situação...','Isso me lembrou alguém...','E foi assim que eu aprendi...','Eu já sei por que você...'].map(g=>`<div class="pill" data-hook="${esc(g)}">${esc(g)}</div>`).join('')}
     ${S.stories.length?`<label class="lab">Do seu banco de histórias</label>${S.stories.slice(0,5).map(s=>`<div class="pill" data-usestory="${s.id}">${esc(s.title||s.lesson||'História')}</div>`).join('')}`:''}</div>
   </div></div>`;
};

/* ---------- FEED ---------- */
VIEWS.feed=()=>{
  const st=S.strategy,P=S.posts.filter(p=>['Reels','Carrossel','Post estático'].includes(p.format)).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  const tile=p=>{const bg=coverSrc(p.cover)?`background-image:url('${esc(coverSrc(p.cover))}');color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.5)`:`background:var(${TONE[p.format]})`;
   return `<div class="tile" style="${bg}" data-open="posts:${p.id}">${p.status!=='Publicado'?`<span class="draft">${esc(p.status)} · ${fmtD(p.date)}</span>`:''}<span class="fmt">${p.format==='Reels'?ic('play'):p.format==='Carrossel'?ic('layers'):''}</span>${p.cover?'':esc(p.hook||p.title)}</div>`};
  return head('Produção','Preview do feed','Veja o grid antes de publicar. Lembre: antes de ouvirem você, as pessoas veem você.')+
  `<div class="grid split" style="grid-template-columns:1fr 1fr;align-items:start"><div class="phone">
   <div style="text-align:center;font-weight:600;margin-bottom:12px">${esc(st.handle||'seu_perfil')}</div>
   <div class="ig-head"><div class="ig-av"><div style="${st.avatar?`background-image:url('${esc(st.avatar)}')`:''}">${st.avatar?'':'C'}</div></div>
    <div class="ig-stats"><div><b>${P.filter(p=>p.status==='Publicado').length}</b>posts</div><div><b>${esc(st.followers||'—')}</b>seguidores</div><div><b>${esc(st.following||'—')}</b>seguindo</div></div></div>
   <div class="ig-bio">${esc(st.bio)}</div>
   <div class="hl">${(st.highlights||'').split(',').filter(x=>x.trim()).map(h=>`<div><span></span>${esc(h.trim())}</div>`).join('')}</div>
   <div class="ig-grid">${P.map(tile).join('')||'<div class="empty" style="grid-column:1/-1;margin:12px">Sem posts de feed ainda</div>'}</div></div>
  <div class="grid">${guideBox('pontos','Foto, bio, destaques e os últimos 9 posts são seus primeiros pontos de informação. Eles precisam dizer, em segundos, de quem você é guia e para onde leva.')}
   <div class="card"><h3>Perfil do preview</h3>${[['handle','Usuário'],['avatar','URL da foto de perfil'],['followers','Seguidores'],['following','Seguindo'],['highlights','Destaques (separados por vírgula)']].map(([k,l])=>`<label class="lab">${l}</label><input class="f" data-st="${k}" value="${esc(st[k]||'')}">`).join('')}
   <label class="lab">Bio</label><textarea class="f" data-st="bio">${esc(st.bio)}</textarea>
   <label class="checks" style="margin-top:12px;display:flex;gap:8px"><input type="checkbox" data-manualcb="bioOk" ${S.manual.bioOk?'checked':''}> Já ajustei isso no Instagram real</label></div></div></div>`;
};

/* ---------- ANÁLISE ---------- */
VIEWS.analise=()=>{
  const P=S.posts.filter(p=>p.status==='Publicado');
  const agg=k=>{const g={};P.forEach(p=>{const e=eng(p);if(e===null||!p[k])return;(g[p[k]]=g[p[k]]||[]).push(e)});return Object.entries(g).map(([n,a])=>[n,a.reduce((x,y)=>x+y,0)/a.length,a.length]).sort((a,b)=>b[1]-a[1])};
  const block=(t,k)=>{const a=agg(k),mx=Math.max(...a.map(x=>x[1]),1);return `<div class="card"><h3>${t}</h3>${a.length?a.map(([n,v,c])=>`<div style="margin:8px 0"><div class="row small"><span>${esc(n)}</span><span class="spacer"></span><span class="muted">${v.toFixed(1)}% · ${c}</span></div><div class="bar"><i style="width:${v/mx*100}%"></i></div></div>`).join(''):'<p class="muted small">Sem dados ainda</p>'}</div>`};
  const bf=agg('format')[0],bs=agg('structure')[0];
  const insight=bf?`Seu formato mais forte é <b>${esc(bf[0])}</b>${bs?` e a estrutura que mais engaja é <b>${esc(bs[0])}</b>`:''}. O que dá certo, repita: o público espera previsibilidade.`:'Registre as métricas dos publicados. Com 3 ou mais, o guia mostra o que está funcionando.';
  return head('Estratégia','Análise','Engajamento = curtidas, comentários, compartilhamentos e salvos divididos pelo alcance.')+
  `<div style="margin-bottom:16px">${guideBox('caixinha',insight)}</div>
  <div class="grid g3">${block('Por formato','format')}${block('Por estrutura','structure')}${block('Por linha editorial','pillar')}${block('Por funil','funnel')}${block('Por pirâmide','pyramid')}</div>
  <h2>Publicados</h2>
  ${P.length?`<div class="tablewrap"><table><tr><th>Conteúdo</th><th>Data</th><th>Alcance</th><th>Curt.</th><th>Com.</th><th>Comp.</th><th>Salvos</th><th>Seg.</th><th>Engaj.</th></tr>
  ${P.map(p=>{const m=p.metrics||{};return `<tr class="click" data-open="posts:${p.id}"><td>${esc(p.title)}</td><td class="muted">${fmtD(p.date)}</td><td>${num(m.reach)||num(m.views)}</td><td>${num(m.likes)}</td><td>${num(m.comments)}</td><td>${num(m.shares)}</td><td>${num(m.saves)}</td><td>${num(m.follows)}</td><td><b>${eng(p)!==null?eng(p).toFixed(1)+'%':'—'}</b></td></tr>`}).join('')}</table></div>`:'<div class="empty">Marque conteúdos como Publicado para analisá-los aqui.</div>'}`;
};

