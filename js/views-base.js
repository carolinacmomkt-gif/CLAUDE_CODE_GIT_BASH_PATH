/* ============ NAVEGAÇÃO ============ */
const PAGES=[
 ['sec','Guia'],['home','home','Início'],['journey','route','Jornada'],['kb','book','Conhecimento'],['refs','layers','Referências'],['techs','spark','Técnicas'],
 ['sec','Produção'],['cal','cal','Calendário'],['posts','list','Conteúdos'],['write','pen','Escrever'],['feed','grid','Preview do feed'],
 ['sec','Estratégia'],['strategy','compass','Posicionamento'],['stories','circle','Stories'],['phases','rocket','Lançamentos'],['ads','mega','Anúncios'],['analise','chart','Análise'],
];
let kbId=null,kbQ='',kbCat='Todos';let cur=location.hash.slice(1)||'home',calMonth=new Date(),postView='table',storyTab='rituals',stratTab='dest',writeId=null;
function nav(){
  $('#nav').innerHTML=PAGES.map(p=>p[0]==='sec'?`<div class="navsec">${p[1]}</div>`:`<div class="nav ${cur===p[0]?'on':''}" data-go="${p[0]}">${ic(p[1])}${p[2]}</div>`).join('');
  const j=journey();$('#pmini').innerHTML=`<div class="lbl">Implementação</div><div class="v">${j.pct}%</div><div class="bar"><i style="width:${j.pct}%"></i></div>`;
}
function go(p,tab){cur=p;if(tab){if(p==='stories')storyTab=tab;if(p==='strategy')stratTab=tab}location.hash=p;render();$('#side').classList.remove('on');window.scrollTo(0,0)}
function render(){
  nav();const pg=PAGES.find(p=>p[0]===cur);$('#crumb').textContent=pg?pg[2]:'';
  $('#page').innerHTML=(VIEWS[cur]||VIEWS.home)();hydrate();applyTheme();
}
const head=(eb,t,s)=>`<div class="eyebrow">${eb}</div><h1>${t}</h1><p class="sub">${s}</p>`;
const guideBox=(techId,text)=>{const t=T(techId);return `<div class="guidebox"><div class="hd">${ic('spark')}O guia diz</div><div class="small">${text}</div>${t?`<div class="quote">${esc(t.ex)}<cite>Luana Carolina · ${esc(t.name)}</cite></div>`:''}${kbFor(techId)?`<button class="btn sm" data-kb="${kbFor(techId).id}">Ler a estratégia completa</button>`:''}</div>`};
const kbFor=tid=>KB.find(k=>k.tech===tid);
const VIEWS={};

/* ---------- INÍCIO ---------- */
VIEWS.home=()=>{
  const j=journey(),n=j.next,h=new Date().getHours();
  const hi=h<12?'Bom dia':h<18?'Boa tarde':'Boa noite';
  const t=n&&T(n.tech);const wk=S.posts.filter(p=>p.date>=today()&&p.date<=addDays(7)).sort((a,b)=>a.date.localeCompare(b.date));
  const dt=S.daily[today()]||{};const B=[['07h','Ritual de bom dia'],['10h','Bloco da manhã'],['12h','Almoço'],['15h','Meio da tarde'],['20h','Horário de pico'],['caixinha','Caixinha ou enquete'],['estilo','Prova de estilo de vida']];
  const al=alerts();
  return `<div class="eyebrow">${new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'})}</div><h1>${hi}, Carol.</h1><p class="sub">Aqui está o que o método pede de você agora, com base no que já está no sistema.</p>
  ${n?`<div class="next"><div><div class="eyebrow">Próximo passo · ${STAGES.find(s=>s.id===n.s).t}</div><h2>${esc(n.t)}</h2><p>${esc(n.how)}</p>${n.p?`<p class="small" style="margin-top:8px">Progresso: ${esc(n.p)}</p>`:''}${t?`<div class="why">${esc(t.what)}</div>`:''}</div>
   <div class="row">${n.manual?`<button class="btn" data-manual="${n.manual}">Já fiz</button>`:''}<button class="btn" data-goto="${n.go.join('|')}">Fazer agora ${ic('arrow')}</button></div></div>`
  :`<div class="next"><div><div class="eyebrow">Jornada completa</div><h2>Você implementou todo o método.</h2><p>Agora o trabalho é constância: siga os alertas do dia e repita o que performa.</p></div></div>`}
  <div class="journey">${j.stages.map(s=>`<div class="jstage ${n&&n.s===s.id?'cur':''}" data-go="journey"><div class="k">${s.n}</div><div class="t">${s.t}</div><div class="bar"><i style="width:${s.done/s.total*100}%"></i></div><div class="small muted" style="margin-top:6px">${s.done} de ${s.total}</div></div>`).join('')}</div>
  <div class="grid split" style="grid-template-columns:1.3fr 1fr;margin-top:22px">
   <div class="card"><h3>Leitura do dia</h3>${al.length?al.map(a=>`<div class="alert ${a.ok?'ok':''}"><div class="ic">${ic(a.ic)}</div><div style="flex:1"><div style="font-weight:500">${esc(a.t)}</div><div class="small muted">${esc(a.d)}</div></div>${a.go?`<button class="btn sm" data-goto="${a.go.join('|')}">Abrir</button>`:a.open?`<button class="btn sm" data-open="${a.open}">Ver</button>`:''}</div>`).join(''):'<p class="muted small">Tudo em dia.</p>'}</div>
   <div class="card"><h3>Stories de hoje</h3><p class="small muted" style="margin-top:-4px">Frequência do Stories para Enriquecer</p><div class="checks">${B.map(([k,l])=>`<label><input type="checkbox" data-daily="${k}" ${dt[k]?'checked':''}><span>${k.length===3?`<b>${k}</b> · `:''}${l}</span></label>`).join('')}</div></div>
  </div>
  <h2>Próximos 7 dias</h2>
  ${wk.length?`<div class="tablewrap"><table>${wk.map(p=>`<tr class="click" data-open="posts:${p.id}"><td class="muted" style="width:80px">${fmtD(p.date)}</td><td>${esc(p.title||'Sem título')}</td><td>${tag(p.format)}</td><td>${tag(p.funnel)}</td><td>${tag(p.status)}</td></tr>`).join('')}</table></div>`:`<div class="empty">Nenhum conteúdo nesta semana. <a href="#" data-go="cal">Abrir o calendário</a></div>`}`;
};

/* ---------- JORNADA ---------- */
VIEWS.journey=()=>{
  const j=journey();
  return head('O guia','Jornada de implementação','Seis etapas, na ordem do método da Luana. Os passos se marcam sozinhos conforme você preenche o sistema.')+
  `<div class="card" style="margin-bottom:18px"><div class="row"><div style="flex:1"><div class="bar"><i style="width:${j.pct}%"></i></div></div><b>${j.pct}%</b></div></div>`+
  j.stages.map(g=>`<h2><span class="muted" style="font-size:14px;margin-right:10px">${g.n}</span>${g.t}</h2><p class="muted" style="margin-top:-8px">${g.d}</p><div class="card" style="padding:4px 20px">
   ${j.steps.filter(s=>s.s===g.id).map(s=>{const t=T(s.tech);const now=j.next&&j.next.id===s.id;return `<div class="step"><div class="dot ${s.done?'done':now?'now':''}">${s.done?ic('check'):''}</div>
   <div><div class="t">${esc(s.t)} ${now?'<span class="tag" style="margin-left:6px">agora</span>':''}</div><div class="d">${esc(s.how)}</div>${s.p?`<div class="small" style="margin-top:4px;color:var(--brand2)">${esc(s.p)}</div>`:''}
   ${t&&now?`<div class="quote small">${esc(t.ex)}<cite>Luana Carolina · ${esc(t.name)}</cite></div>`:''}</div>
   <div class="row">${kbFor(s.tech)?`<button class="btn sm ghost" data-kb="${kbFor(s.tech).id}">Estudar</button>`:''}${s.manual&&!s.done?`<button class="btn sm" data-manual="${s.manual}">Já fiz</button>`:''}<button class="btn sm ${now?'pri':''}" data-goto="${s.go.join('|')}">${s.done?'Ver':'Fazer'}</button></div></div>`}).join('')}</div>`).join('');
};

/* ---------- CALENDÁRIO ---------- */
VIEWS.cal=()=>{
  const y=calMonth.getFullYear(),m=calMonth.getMonth(),first=new Date(y,m,1),start=new Date(first);start.setDate(1-first.getDay());
  const days=[...Array(42)].map((_,i)=>{const d=new Date(start);d.setDate(start.getDate()+i);return d});
  const items=[...S.posts.map(p=>({...p,_c:'posts'})),...S.ads.filter(a=>a.start).map(a=>({...a,date:a.start,format:'Anúncio',_c:'ads'})),...S.phases.filter(p=>p.start).map(p=>({...p,date:p.start,format:'Lançamento',title:'Início: '+p.title,_c:'phases'}))];
  const mc=S.posts.filter(p=>p.date&&p.date.startsWith(`${y}-${String(m+1).padStart(2,'0')}`));
  return head('Produção','Calendário','Clique em um dia para criar um conteúdo naquela data.')+
  `<div class="row" style="margin-bottom:14px"><button class="btn sm" data-act="calprev">Anterior</button><b style="min-width:160px;text-align:center;font-family:var(--display);font-size:18px;font-weight:500;text-transform:capitalize">${first.toLocaleDateString('pt-BR',{month:'long',year:'numeric'})}</b><button class="btn sm" data-act="calnext">Próximo</button><button class="btn sm ghost" data-act="caltoday">Hoje</button><span class="spacer"></span><span class="small muted">${mc.length} conteúdos no mês</span></div>
  <div class="cal">${['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(x=>`<div class="dh">${x}</div>`).join('')}
  ${days.map(d=>{const k=iso(d);const its=items.filter(p=>p.date===k);
   return `<div class="d ${d.getMonth()!==m?'out':''} ${k===today()?'today':''}" data-newdate="${k}"><div class="num"><span>${d.getDate()}</span></div>
   ${its.map(p=>`<div class="chip" data-open="${p._c}:${p.id}" style="background:var(${TONE[p.format]||'--t1'})">${p.status==='Publicado'?'✓ ':''}${esc(p.title||'Sem título')}</div>`).join('')}</div>`}).join('')}</div>
  <div class="row small muted" style="margin-top:10px">${OPTS.format.map(tag).join(' ')}</div>`;
};

/* ---------- CONTEÚDOS ---------- */
VIEWS.posts=()=>{
  const P=[...S.posts].sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  return head('Produção','Conteúdos','Do rascunho à análise. Cada conteúdo carrega a técnica, o funil e o destino que ele serve.')+
  `<div class="tabs"><div class="tab ${postView==='table'?'on':''}" data-pv="table">Tabela</div><div class="tab ${postView==='board'?'on':''}" data-pv="board">Quadro</div></div>`+
  (postView==='board'?`<div class="kanban">${OPTS.status.map(s=>`<div class="col"><div class="row" style="margin-bottom:8px">${tag(s)}<span class="muted small">${P.filter(p=>p.status===s).length}</span></div>
    ${P.filter(p=>p.status===s).map(p=>`<div class="kc" data-open="posts:${p.id}"><div>${esc(p.title||'Sem título')}</div><div class="row small" style="margin-top:6px">${tag(p.format)}<span class="muted">${fmtD(p.date)}</span></div></div>`).join('')}
    <button class="btn ghost sm" data-newstatus="${s}">${ic('plus')}Novo</button></div>`).join('')}</div>`
  :P.length?`<div class="tablewrap"><table><tr><th>Título</th><th>Data</th><th>Formato</th><th>Status</th><th>Funil</th><th>Estrutura</th><th>Engaj.</th></tr>
   ${P.map(p=>`<tr class="click" data-open="posts:${p.id}"><td>${esc(p.title||'Sem título')}</td><td class="muted">${fmtD(p.date)}</td><td>${tag(p.format)}</td><td>${tag(p.status)}</td><td>${tag(p.funnel)}</td><td class="small">${esc(p.structure)}</td><td>${eng(p)!==null?eng(p).toFixed(1)+'%':'—'}</td></tr>`).join('')}</table></div>`
  :`<div class="empty">Nenhum conteúdo ainda. Comece pelo banco de histórias: cada história vira um conteúdo.</div>`);
};

