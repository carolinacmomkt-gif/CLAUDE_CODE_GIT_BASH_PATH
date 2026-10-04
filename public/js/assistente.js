/* ============ ASSISTENTE DE IA ============
   Conversa que revisa o conteúdo segundo os métodos do banco de conhecimento (KB).
   A chamada vai para /api/ia (função do Netlify), que guarda a chave da API. */
const Chat=(()=>{
  let msgs=[],postId=null,busy=false,ctrl=null,metodos=null,erro='';
  const RAPIDAS_POST=[
    ['Revisar este conteúdo pelos métodos','Revise este conteúdo de acordo com os métodos. Aponte o que funciona, o que falha e como melhorar.'],
    ['3 opções de gancho','Me dê 3 opções de gancho para este conteúdo, cada uma indicando qual método usa.'],
    ['Leva ao destino final?','Este conteúdo leva a pessoa ao destino final do meu perfil? O que eu ajusto para levar?'],
    ['Revisar legenda e CTA','Revise só a legenda e o CTA e proponha uma versão melhor.'],
  ];
  const RAPIDAS_GERAL=[
    ['Qual método usar?','Tenho uma ideia de conteúdo de topo de funil. Qual método devo usar e por quê? Pergunte o que precisar.'],
    ['Transformar uma história em conteúdo','Quero transformar uma história pessoal em conteúdo. Me guie com as perguntas do método IHC.'],
  ];
  const metodosTexto=()=>metodos||(metodos=KB.map(k=>`## ${k.title} (${k.cat})\n${k.sum}\n${k.body}`).join('\n\n'));
  const post=()=>S.posts.find(p=>p.id===postId);
  const contexto=()=>{
    const p=post();if(!p)return null;
    return {titulo:p.title,formato:p.format,status:p.status,funil:p.funnel,linha_editorial:p.pillar,estrutura:p.structure,piramide:p.pyramid,
      destino_final:p.destino,tecnicas_aplicadas:p.techs,gancho:p.hook,roteiro:p.script,legenda:p.caption,cta:p.cta,
      checklist_marcado:Object.keys(p.bda||{}).filter(k=>p.bda[k]).map(k=>CHECK[+k]).filter(Boolean)};
  };
  const mdIa=s=>md((s||'').replace(/^#{3,4} /gm,'## ')).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');

  function esqueleto(){
    $('#chat').innerHTML=`<div class="chat-in">
      <div class="row" style="padding:18px 22px 10px"><span class="eyebrow" style="margin:0">Assistente</span><span class="spacer"></span>
        <button class="btn sm ghost" data-ia="nova">Nova conversa</button><button class="btn sm" data-ia="fechar">Fechar</button></div>
      <div style="padding:0 22px 10px"><select class="f" data-ia-sel id="chatSel"></select></div>
      <div class="chat-msgs" id="chatMsgs"></div>
      <div class="chat-foot"><div id="chatErro" class="small" style="color:var(--bad-ink,#a4442c);margin-bottom:6px"></div>
        <div class="row" style="align-items:flex-end"><textarea class="f" id="chatTxt" rows="2" placeholder="Peça uma revisão ou uma sugestão. Enter envia, Shift+Enter quebra a linha."></textarea>
        <button class="btn pri" data-ia="enviar" id="chatBtn">Enviar</button></div></div></div>`;
    $('#chatSel').onchange=e=>{postId=e.target.value||null;pintar()};
  }
  function opcoes(){
    const s=$('#chatSel');if(!s)return;
    s.innerHTML=`<option value="">Sem conteúdo anexado</option>`+S.posts.map(p=>`<option value="${p.id}" ${p.id===postId?'selected':''}>Conteúdo: ${esc(p.title||'Sem título')}</option>`).join('');
  }
  function pintar(){
    opcoes();
    const m=$('#chatMsgs');if(!m)return;
    if(!msgs.length){
      const r=postId?RAPIDAS_POST:RAPIDAS_GERAL;
      m.innerHTML=`<p class="small muted">${postId?'O assistente vê a versão atual deste conteúdo (gancho, roteiro, legenda e CTA) e revisa com base nos métodos do banco de conhecimento.':'Escolha um conteúdo acima para revisar, ou converse sobre os métodos.'}</p>
      <div class="chat-quick">${r.map((q,i)=>`<button class="btn sm" data-ia="rapida:${i}">${esc(q[0])}</button>`).join('')}</div>`;
    }else{
      m.innerHTML=msgs.map((x,i)=>x.role==='user'?`<div class="cmsg me">${esc(x.content)}</div>`
        :`<div class="cmsg ia" data-i="${i}">${x.content?mdIa(x.content):'<span class="muted">Pensando...</span>'}${x.content&&!(busy&&i===msgs.length-1)?`<div class="row" style="margin-top:8px"><button class="btn sm ghost" data-ia="copiar:${i}">Copiar</button></div>`:''}</div>`).join('');
      m.scrollTop=m.scrollHeight;
    }
    $('#chatErro').textContent=erro;
    $('#chatBtn').textContent=busy?'Parar':'Enviar';
  }
  function pintarUltima(){
    const m=$('#chatMsgs'),el=m&&m.querySelector(`.cmsg.ia[data-i="${msgs.length-1}"]`);
    if(el){el.innerHTML=mdIa(msgs[msgs.length-1].content);m.scrollTop=m.scrollHeight}
  }
  function abrir(id){
    if(id!==undefined)postId=id||null;
    if(!$('#chatTxt'))esqueleto();
    $('#chat').classList.add('on');pintar();setTimeout(()=>$('#chatTxt').focus(),50);
  }
  function fechar(){$('#chat').classList.remove('on')}
  function nova(){if(busy&&ctrl)ctrl.abort();msgs=[];erro='';busy=false;pintar()}

  async function enviar(texto){
    texto=(texto||'').trim();if(!texto||busy)return;
    erro='';msgs.push({role:'user',content:texto},{role:'assistant',content:''});busy=true;ctrl=new AbortController();
    $('#chatTxt').value='';pintar();
    try{
      const r=await fetch('/api/ia',{method:'POST',headers:{'content-type':'application/json'},signal:ctrl.signal,
        body:JSON.stringify({messages:msgs.slice(0,-1),metodos:metodosTexto(),conteudo:contexto()})});
      if(!r.ok){
        let m='';try{m=(await r.json()).erro}catch(e){}
        if(r.status===404)m='O assistente só funciona no site publicado no Netlify (ou rodando npm run dev).';
        throw new Error(m||'Erro '+r.status);
      }
      const rd=r.body.getReader(),dec=new TextDecoder();
      for(;;){const {done,value}=await rd.read();if(done)break;msgs[msgs.length-1].content+=dec.decode(value,{stream:true});pintarUltima()}
    }catch(e){
      if(e.name!=='AbortError'){
        const a=msgs[msgs.length-1];
        if(!a.content){msgs.splice(-2,2);$('#chatTxt').value=texto}   // falhou antes de responder: devolve o texto para tentar de novo
        erro=e.message||'Falha ao falar com a IA.';
      }else if(!msgs[msgs.length-1].content)msgs.pop();
    }finally{busy=false;ctrl=null;pintar()}
  }

  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-ia]');if(!t)return;
    e.stopPropagation();
    const [a,v]=t.dataset.ia.split(':');
    if(a==='abrir')abrir(v||undefined);
    else if(a==='post')abrir(v);
    else if(a==='fechar')fechar();
    else if(a==='nova')nova();
    else if(a==='enviar'){if(busy&&ctrl)ctrl.abort();else enviar($('#chatTxt').value)}
    else if(a==='rapida')enviar((postId?RAPIDAS_POST:RAPIDAS_GERAL)[+v][1]);
    else if(a==='copiar')navigator.clipboard&&navigator.clipboard.writeText(msgs[+v].content).then(()=>toast('Copiado'));
  },true);
  document.addEventListener('keydown',e=>{
    if(e.target.id==='chatTxt'&&e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();enviar(e.target.value)}
    else if(e.key==='Escape'&&$('#chat').classList.contains('on')&&!$('#drawer').classList.contains('on'))fechar();
  });
  return {abrir,fechar};
})();
