/* ============ O GUIA: jornada de implementação ============
   Cada passo vem de uma técnica da Luana. check() lê os dados e diz se está feito. */
const STAGES=[
 {id:'f',n:'01',t:'Fundação',d:'Quem você guia e para onde.'},
 {id:'p',n:'02',t:'Perfil',d:'Pontos de informação que geram autoridade.'},
 {id:'s',n:'03',t:'Stories',d:'Rituais, caixinhas e frequência.'},
 {id:'c',n:'04',t:'Conteúdo',d:'Trajetória, BDA e funil.'},
 {id:'a',n:'05',t:'Antecipação',d:'Quebrar objeções antes da oferta.'},
 {id:'v',n:'06',t:'Venda e análise',d:'Medir, aprender e escalar.'},
];
function lastDays(n){return [...Array(n)].map((_,i)=>addDays(-i))}
function storyDays(){return lastDays(7).filter(d=>Object.values(S.daily[d]||{}).filter(Boolean).length>=3).length}
function objCover(ph){const o=(ph.objections||'').split('\n').map(x=>x.trim()).filter(Boolean);return o.map(x=>({o:x,ok:S.posts.some(p=>p.phase===ph.id&&p.objection===x)}))}
const STEPS=[
 {s:'f',id:'guide',t:'Escreva de quem você é guia',tech:'guia',go:['strategy','dest'],
  how:'Complete a frase "Eu guio ___ de ___ até ___". Olhe para o que as pessoas já te procuram para saber.',
  check:()=>({done:!!S.strategy.guide.trim()})},
 {s:'f',id:'dest',t:'Defina o destino final',tech:'destino',go:['strategy','dest'],
  how:'A promessa para onde todo o seu conteúdo converge. Sem ela, você mostra a girafa para quem veio ver o leão.',
  check:()=>({done:!!S.strategy.dest.trim()})},
 {s:'f',id:'aud',t:'Descreva as formigas certas',tech:'acucar',go:['strategy','dest'],
  how:'Quem já tem predisposição a comprar de você. Não quem você acha que deveria querer.',
  check:()=>({done:S.strategy.audience.trim().length>20})},
 {s:'f',id:'desires',t:'Escute o que o público quer',tech:'acucar',go:['strategy','dest'],
  how:'Anote frases literais de caixinhas, comentários e DMs. Sem audiência? Leia os comentários das suas referências.',
  check:()=>({done:S.strategy.desires.split('\n').filter(x=>x.trim()).length>=3,p:S.strategy.desires.split('\n').filter(x=>x.trim()).length+'/3 frases'})},
 {s:'f',id:'diffs',t:'Registre seu núcleo (vaca roxa)',tech:'interessante',go:['strategy','dest'],
  how:'Crenças, hábitos, histórico e jeito que só você tem. É o que te diferencia num mercado de vacas comuns.',
  check:()=>({done:S.strategy.diffs.trim().length>20})},
 {s:'p',id:'audit',t:'Audite os 8 pontos de informação',tech:'pontos',go:['strategy','points'],
  how:'Dê nota de 0 a 3 para foto, bio, destaques, link, feed, visual dos stories, voz e provas.',
  check:()=>{const n=Object.keys(S.strategy.points||{}).length;return {done:n>=8,p:n+'/8 avaliados'}}},
 {s:'p',id:'score',t:'Leve o perfil a 18 de 24 pontos',tech:'pontos',go:['strategy','points'],
  how:'Ajuste o que estiver incoerente com o destino final. A coerência gera segurança no primeiro segundo.',
  check:()=>{const v=Object.values(S.strategy.points||{}).reduce((a,b)=>a+num(b),0);return {done:v>=18,p:v+'/24'}}},
 {s:'p',id:'bio',t:'Monte bio e destaques no preview',tech:'repost',go:['feed'],
  how:'Antes de qualquer collab ou repost, o perfil precisa estar pronto: feed cheio e destaques montados.',
  check:()=>({done:S.strategy.bio.trim().length>30&&!!S.strategy.highlights.trim()&&S.manual.bioOk,manual:'bioOk',p:S.manual.bioOk?'':'confirme quando o perfil real estiver ajustado'})},
 {s:'s',id:'ritual',t:'Ative um ritual diário',tech:'rituais',go:['stories','rituals'],
  how:'Algo que você repete todo dia, com frase de efeito, que o público consegue fazer junto.',
  check:()=>({done:S.rituals.some(r=>r.status==='Ativo'&&r.phrase)})},
 {s:'s',id:'boxes',t:'Abra 3 caixinhas ou enquetes',tech:'caixinha',go:['stories','boxes'],
  how:'Sem perguntas? Mande perguntas-semente para você mesma. Isso educa o público sobre o que você responde.',
  check:()=>({done:S.boxes.length>=3,p:S.boxes.length+'/3'})},
 {s:'s',id:'freq',t:'Apareça em blocos 5 dias na semana',tech:'video',go:['stories','week'],
  how:'Postar cedo e em vários horários. A barrinha só fica cheia à noite. Marque 3 ou mais blocos por dia.',
  check:()=>{const d=storyDays();return {done:d>=5,p:d+'/5 dias nos últimos 7'}}},
 {s:'c',id:'hist',t:'Reúna 5 histórias da sua trajetória',tech:'trajetoria',go:['strategy','traj'],
  how:'Conflito, virada e consequência. Toda caixinha aberta precisa ser fechada com solução.',
  check:()=>({done:S.stories.length>=5,p:S.stories.length+'/5'})},
 {s:'c',id:'plan',t:'Planeje 8 conteúdos para os próximos 30 dias',tech:'destino',go:['cal'],
  how:'Cada um com o campo "Como leva ao destino final" preenchido.',
  check:()=>{const n=S.posts.filter(p=>p.date>=today()&&p.date<=addDays(30)).length;return {done:n>=8,p:n+'/8'}}},
 {s:'c',id:'funnel',t:'Equilibre topo, meio e fundo',tech:'funil',go:['posts'],
  how:'Cada estágio com pelo menos 20% dos conteúdos. Básico para quem chega, profundo para quem está pronto.',
  check:()=>{const P=S.posts;if(P.length<5)return {done:false,p:'mínimo 5 conteúdos'};const ok=OPTS.funnel.every(f=>P.filter(p=>p.funnel===f).length/P.length>=.2);return {done:ok}}},
 {s:'c',id:'pyr',t:'Mostre base e topo da pirâmide',tech:'piramide',go:['strategy','pyr'],
  how:'Alterne a vida que o seguidor deseja com o lugar onde ele está hoje (e onde você já esteve).',
  check:()=>{const b=S.posts.filter(p=>p.pyramid?.startsWith('Base')).length,t=S.posts.filter(p=>p.pyramid?.startsWith('Topo')).length;return {done:b>=2&&t>=2,p:`base ${b} · topo ${t}`}}},
 {s:'c',id:'bda',t:'Passe 3 roteiros no checklist completo',tech:'bda',go:['write'],
  how:'Básico, didático e aplicável. Se a pessoa não consegue aplicar hoje, não vira prova social.',
  check:()=>{const n=S.posts.filter(p=>Object.values(p.bda||{}).filter(Boolean).length>=8).length;return {done:n>=3,p:n+'/3'}}},
 {s:'a',id:'launch',t:'Crie um lançamento com as objeções',tech:'antecipacao',go:['phases'],
  how:'Liste as objeções do produto. Você vai quebrá-las no conteúdo, semanas antes de abrir as vendas.',
  check:()=>({done:S.phases.some(p=>(p.objections||'').trim())})},
 {s:'a',id:'cover',t:'Um conteúdo para cada objeção',tech:'antecipacao',go:['phases'],
  how:'Use o botão "Criar conteúdo" ao lado de cada objeção.',
  check:()=>{const all=S.phases.flatMap(objCover);if(!all.length)return {done:false};const ok=all.filter(x=>x.ok).length;return {done:ok===all.length,p:ok+'/'+all.length}}},
 {s:'a',id:'mech',t:'Defina estágio de mercado e mecanismo único',tech:'oferta',go:['phases'],
  how:'Em que estágio está o seu mercado? Se está cético, você precisa de um mecanismo único.',
  check:()=>({done:S.phases.some(p=>p.marketStage&&p.mechanism)})},
 {s:'a',id:'life',t:'Mostre o estilo de vida que você vende',tech:'estilovida',go:['posts'],
  how:'Pelo menos 3 conteúdos de bastidor e estilo de vida. Ninguém compra o caderno, compra a organização.',
  check:()=>{const n=S.posts.filter(p=>p.pillar==='Bastidores / Estilo de vida').length;return {done:n>=3,p:n+'/3'}}},
 {s:'v',id:'metrics',t:'Registre métricas de 5 publicados',tech:'tres',go:['analise'],
  how:'Sem número, a análise vira achismo.',
  check:()=>{const n=S.posts.filter(p=>p.status==='Publicado'&&eng(p)!==null).length;return {done:n>=5,p:n+'/5'}}},
 {s:'v',id:'learn',t:'Escreva 3 aprendizados de conteúdo',tech:'acucar',go:['analise'],
  how:'O que funcionou, que perguntas surgiram, que objeções apareceram nos comentários.',
  check:()=>{const n=S.posts.filter(p=>(p.analysis||'').trim().length>15).length;return {done:n>=3,p:n+'/3'}}},
 {s:'v',id:'ad',t:'Impulsione o conteúdo que já provou',tech:'oferta',go:['ads'],
  how:'Anuncie o que já performou no orgânico. Vincule o anúncio ao conteúdo base.',
  check:()=>({done:S.ads.some(a=>a.post)})},
];
function journey(){
  const r=STEPS.map(s=>({...s,...s.check()}));
  const nxt=r.find(s=>!s.done);
  const stages=STAGES.map(g=>{const st=r.filter(s=>s.s===g.id);return {...g,done:st.filter(s=>s.done).length,total:st.length}});
  return {steps:r,next:nxt,stages,pct:Math.round(r.filter(s=>s.done).length/r.length*100)};
}
/* Alertas do dia: leitura do que está acontecendo agora */
function alerts(){
  const A=[],t=today(),dt=S.daily[t]||{};
  const done=Object.values(dt).filter(Boolean).length;
  if(done<3)A.push({ic:'circle',t:`Stories de hoje: ${done} de 7 blocos`,d:'Poste em vários horários. Cada atualização leva sua bolinha para o começo da fila.',tech:'video',go:['stories','week']});
  const late=S.posts.filter(p=>p.date&&p.date<t&&!['Publicado'].includes(p.status));
  if(late.length)A.push({ic:'alert',t:`${late.length} conteúdo(s) com data vencida`,d:'Reagende ou publique. Constância é decisão diária.',go:['posts']});
  const noM=S.posts.filter(p=>p.status==='Publicado'&&eng(p)===null&&p.date<=addDays(-2));
  if(noM.length)A.push({ic:'chart',t:`${noM.length} publicado(s) sem métricas`,d:'Registre alcance, salvos e comentários para o guia aprender o que funciona.',go:['analise']});
  if(!S.posts.some(p=>p.date>=t&&p.date<=addDays(7)))A.push({ic:'cal',t:'Nada planejado para os próximos 7 dias',d:'Pegue uma história do banco e transforme em conteúdo com a estrutura IHC.',tech:'trajetoria',go:['cal']});
  if(S.posts.length>=5){const f=OPTS.funnel.map(x=>[x,S.posts.filter(p=>p.funnel===x).length/S.posts.length]);const low=f.filter(x=>x[1]<.2);if(low.length)A.push({ic:'layers',t:`Pouco conteúdo de ${low.map(x=>x[0].toLowerCase()).join(' e ')} de funil`,d:'Produza para os diferentes estágios da sua audiência.',tech:'funil',go:['posts']})}
  S.phases.forEach(ph=>{const c=objCover(ph).filter(x=>!x.ok);if(c.length)A.push({ic:'rocket',t:`${ph.title||'Lançamento'}: ${c.length} objeção(ões) sem conteúdo`,d:'"Seu conteúdo precisa ser uma quebra de objeções diária."',tech:'antecipacao',go:['phases']})});
  const pub=S.posts.filter(p=>eng(p)!==null);
  if(pub.length>=3){const best=[...pub].sort((a,b)=>eng(b)-eng(a))[0];A.push({ok:1,ic:'spark',t:`Seu melhor conteúdo: ${best.title}`,d:`${eng(best).toFixed(1)}% de engajamento (${best.format}, ${best.structure||'sem estrutura'}). Repita a estrutura ou impulsione.`,open:'posts:'+best.id})}
  return A;
}

