/* ---------- CONHECIMENTO ---------- */
const md=s=>{let o='',ul=0;s.split('\n').forEach(l=>{if(l.startsWith('- ')||/^\d+\. /.test(l)){if(!ul){o+='<ul>';ul=1}o+=`<li>${esc(l.replace(/^(- |\d+\. )/,''))}</li>`;return}if(ul){o+='</ul>';ul=0}
 if(l.startsWith('## '))o+=`<h3 style="margin-top:26px">${esc(l.slice(3))}</h3>`;else if(l.startsWith('> '))o+=`<div class="quote">${esc(l.slice(2))}</div>`;else if(l.trim())o+=`<p>${esc(l)}</p>`});return o+(ul?'</ul>':'')};
VIEWS.kb=()=>{
  const cats=['Todos',...new Set(KB.map(k=>k.cat))];
  const q=kbQ.toLowerCase();
  const L=KB.filter(k=>(kbCat==='Todos'||k.cat===kbCat)&&(!q||(k.title+' '+k.sum+' '+k.body).toLowerCase().includes(q)));
  const a=KB.find(k=>k.id===kbId);
  if(a){const i=KB.indexOf(a),prev=KB[i-1],next=KB[i+1],st=STEPS.filter(s=>s.tech===a.tech);
   return `<button class="btn sm ghost" data-kbback>Voltar ao banco</button><div style="max-width:720px;margin:18px auto 0"><div class="eyebrow">${esc(a.cat)} · ${a.src.map(s=>SRC[s]).join(' · ')}</div><h1>${esc(a.title)}</h1>
    <div class="callout">${ic('spark')}<div><b>Resumo.</b> ${esc(a.sum)}</div></div>
    <div class="article" style="font-size:15px;line-height:1.75">${md(a.body)}</div>
    ${IGX.filter(x=>x.kb.includes(a.id)).length?`<h3 style="margin-top:26px">Exemplos reais nos stories dela</h3>${IGX.filter(x=>x.kb.includes(a.id)).map(x=>`<div style="margin:12px 0"><div class="row"><b style="font-weight:500">${esc(x.title)}</b><span class="spacer"></span><a class="small" href="${IGURL(x.code)}" target="_blank" rel="noopener">Instagram</a></div><div class="strip" style="margin-top:6px">${sl(x.code,x.n).map((s,i,arr)=>`<img src="${s}" style="height:150px" loading="lazy" ${lbAttr(arr,i)} alt="">`).join('')}</div><p class="small muted" style="margin:4px 0 0">${esc(x.adapt)}</p></div>`).join('')}`:''}
    ${a.links?`<h3 style="margin-top:26px">Fontes</h3><ul>${a.links.map(([t,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join('')}</ul>`:''}
    <div class="card" style="margin-top:28px"><h3>Aplicar no sistema</h3><ul class="small" style="padding-left:18px">${a.apply.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
     <div class="row" style="margin-top:10px">${st.map(s=>`<button class="btn sm ${s.check().done?'':'pri'}" data-goto="${s.go.join('|')}">${s.check().done?'Feito: ':''}${esc(s.t)}</button>`).join('')}
     <span class="spacer"></span><label class="small" style="display:flex;gap:6px;align-items:center"><input type="checkbox" data-read="${a.id}" ${S.read[a.id]?'checked':''}>Estudado</label></div></div>
    <div class="row" style="margin-top:22px">${prev?`<button class="btn sm" data-kb="${prev.id}">Anterior: ${esc(prev.title)}</button>`:''}<span class="spacer"></span>${next?`<button class="btn sm" data-kb="${next.id}">Próximo: ${esc(next.title)}</button>`:''}</div></div>`}
  const rd=KB.filter(k=>S.read[k.id]).length;
  return head('O guia','Banco de conhecimento',`Cada estratégia dos cursos da Luana, com resumo, explicação completa, exemplos e onde aplicar no sistema. ${rd} de ${KB.length} estudadas.`)+
  `<div class="row" style="margin-bottom:14px"><input class="f" placeholder="Buscar estratégia, exemplo ou termo" data-kbq value="${esc(kbQ)}" style="max-width:380px"></div>
  <div class="tabs">${cats.map(c=>`<div class="tab ${kbCat===c?'on':''}" data-kbcat="${c}">${c}</div>`).join('')}</div>
  <div class="grid g3">${L.map(k=>`<div class="card" style="cursor:pointer" data-kb="${k.id}"><div class="row"><span class="eyebrow" style="margin:0">${esc(k.cat)}</span><span class="spacer"></span>${S.read[k.id]?'<span class="tag" style="background:var(--ok)">estudado</span>':''}</div><h3 style="margin-top:6px">${esc(k.title)}</h3><p class="small muted" style="margin:0">${esc(k.sum)}</p></div>`).join('')||'<div class="empty">Nada encontrado.</div>'}</div>`;
};

/* ---------- REFERÊNCIAS ---------- */
let refTab='ig';
const lbAttr=(arr,i)=>`data-lb="${esc(arr.join('|'))}" data-lbi="${i}"`;
const exCard=x=>`<div class="card" style="margin-bottom:16px"><div class="row"><div><div class="eyebrow" style="margin:0">${esc(x.tag)} · ${x.n} stories</div><h3 style="margin:4px 0 0;font-size:19px">${esc(x.title)}</h3></div><span class="spacer"></span><a class="btn sm" href="${IGURL(x.code)}" target="_blank" rel="noopener">Ver no Instagram</a></div>
 <div class="strip" style="margin:14px 0">${sl(x.code,x.n).map((s,i,a)=>`<img src="${s}" loading="lazy" ${lbAttr(a,i)} alt="">`).join('')}</div>
 <div class="grid g3 split"><div><label class="lab" style="margin-top:0">O que ela fez</label><p class="small" style="margin:0">${esc(x.what)}</p></div>
 <div><label class="lab" style="margin-top:0">O que observar</label><ul class="small" style="margin:0;padding-left:16px">${x.learn.map(l=>`<li>${esc(l)}</li>`).join('')}</ul></div>
 <div><label class="lab" style="margin-top:0">Como a Carol adapta</label><p class="small" style="margin:0">${esc(x.adapt)}</p><div class="row" style="margin-top:10px">${x.kb.map(k=>{const a=KB.find(z=>z.id===k);return a?`<button class="btn sm" data-kb="${k}">${esc(a.title)}</button>`:''}).join('')}</div></div></div></div>`;
VIEWS.refs=()=>{
  const tabs=[['ig','Stories da Luana'],['pin','Moodboard do Pinterest'],['look','Padrão visual']];
  let body='';
  if(refTab==='ig')body=`<p class="muted small">Do perfil oficial de stories @luanacarolinastories (destaques do método SPE). Clique em uma imagem para ampliar.</p>`+IGX.map(exCard).join('');
  if(refTab==='pin')body=`<p class="muted small">Pastas do Pinterest dela (luanacarolinaoficial). Use como referência de cenário, luz e objetos, não para copiar.</p>`+Object.entries(PINB).map(([k,b])=>`<h2>${esc(b.n)}</h2><p class="muted" style="margin-top:-8px">${esc(b.use)} <a href="https://br.pinterest.com/luanacarolinaoficial/${k}/" target="_blank" rel="noopener">Abrir pasta</a></p><div class="pingrid">${PINMAP[k].map((s,i,a)=>`<img src="${s}" loading="lazy" ${lbAttr(a,i)} alt="">`).join('')}</div>`).join('');
  if(refTab==='look')body=`<div class="grid g2 split"><div class="card"><h3>O padrão dos stories dela</h3><ul class="small" style="padding-left:16px">
   <li><b>Texto:</b> caixa branca com fonte serifada preta (estilo máquina de escrever do Instagram). Uma ideia por story.</li>
   <li><b>Destaque:</b> uma ou duas palavras em rosa ou vermelho, nunca a frase inteira.</li>
   <li><b>Fundo de texto longo:</b> foto desfocada de objeto (bolsa, mesa) em vez de cor chapada.</li>
   <li><b>Capa de sequência:</b> fundo claro liso, serifa grande, seta para baixo.</li>
   <li><b>Cenários:</b> carro, cozinha, penteadeira, escritório em casa. Tons neutros, madeira, luz natural.</li>
   <li><b>Prova:</b> prints reais (WhatsApp, perfil de aluna, editor de vídeo) entram como elemento visual.</li>
   <li><b>Sem enfeite:</b> quase nenhum GIF ou figurinha; o capricho está na luz e no texto curto.</li></ul></div>
   <div class="card"><h3>Como traduzir para a sua identidade</h3><ul class="small" style="padding-left:16px">
   <li>Caixa off-white #fffdf9 com texto marrom #4a3426, em vez de branco e preto.</li>
   <li>Palavra de destaque em caramelo #8a6a52.</li>
   <li>Capa de sequência em bege #efe5d8 com título em Neue Montreal.</li>
   <li>Cenários: chácara, mesa de trabalho, café, setup Apple. Combina com a estética cozy e minimalista.</li>
   <li>Mesma regra dela: uma ideia por story e nada de enfeite.</li></ul>
   <div class="row" style="margin-top:12px">${['#fffdf9','#efe5d8','#d9c7b3','#8a6a52','#4a3426'].map(c=>`<span style="width:42px;height:42px;border-radius:10px;background:${c};border:1px solid var(--line)" title="${c}"></span>`).join('')}</div></div></div>
   <h2>Exemplos de capa e texto</h2><div class="strip">${['Dcb3z8DmCnr_0','DcejelsGGC__0','DcTZU6LnOc5_0','DVrORKvD4u3_1','DVrORKvD4u3_2','DchIRCHmAH2_3','DVrMypUCWCH_3'].map(x=>im(`exemplos/${x}.jpg`)).map((s,i,a)=>`<img src="${s}" ${lbAttr(a,i)} alt="">`).join('')}</div>`;
  return head('O guia','Referências reais','Exemplos de stories da Luana e o moodboard dela, ligados às estratégias e ao plano de 30 dias.')+`<div class="tabs">${tabs.map(([k,n])=>`<div class="tab ${refTab===k?'on':''}" data-reftab="${k}">${n}</div>`).join('')}</div>`+body;
};

/* ---------- BIBLIOTECA ---------- */
VIEWS.techs=()=>{const mods=[...new Set(TECHS.map(t=>t.mod))];let i=0;
  return head('O guia','Técnicas','As 20 técnicas em formato rápido, cada uma com o exemplo real da Luana. Para a explicação completa, abra o banco de conhecimento.')+
  mods.map(m=>`<h2>${m}</h2>`+TECHS.filter(t=>t.mod===m).map(t=>{i++;const st=STEPS.filter(s=>s.tech===t.id);
   return `<details class="tech"><summary><span class="num">${String(i).padStart(2,'0')}</span><b style="font-weight:500">${esc(t.name)}</b><span class="spacer"></span>${st.length?`<span class="small muted">${st.filter(s=>s.check().done).length}/${st.length} na jornada</span>`:''}</summary>
   <div class="body"><p>${esc(t.what)}</p><div class="quote">${esc(t.ex)}<cite>Exemplo real · Luana Carolina</cite></div>
   <label class="lab">Como aplicar</label><ul class="small" style="padding-left:18px;margin:0">${t.apply.map(a=>`<li>${esc(a)}</li>`).join('')}</ul>
   ${kbFor(t.id)?`<div style="margin-top:12px"><button class="btn sm" data-kb="${kbFor(t.id).id}">Ler a estratégia completa</button></div>`:''}${st.length?`<div class="row" style="margin-top:12px">${st.map(s=>`<button class="btn sm" data-goto="${s.go.join('|')}">${esc(s.t)}</button>`).join('')}</div>`:''}</div></details>`}).join('')).join('');
};

