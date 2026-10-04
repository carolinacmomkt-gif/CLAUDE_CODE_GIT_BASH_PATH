/* ============ LINKS E ANEXOS DO CONTEÚDO ============
   Links externos (Drive, Notion, Canva...) ficam em post.links = [{t,u}].
   Arquivos ficam no IndexedDB (gaveta "anexos"); o conteúdo guarda só post.anexos = [{id,nome,tipo,tam}]. */
const Anexos=(()=>{
  const L='anexos',MAX=50*1024*1024;
  const tamanho=n=>n>=1048576?(n/1048576).toFixed(1).replace('.',',')+' MB':Math.max(1,Math.round(n/1024))+' KB';
  const postAtual=()=>open&&open.col==='posts'?S.posts.find(i=>i.id===open.id):null;

  /* ---- links ---- */
  const normalizarUrl=v=>{
    v=(v||'').trim();if(!v)return null;
    if(!/^[a-z][a-z0-9+.-]*:/i.test(v))v='https://'+v;
    try{const u=new URL(v);return /^https?:$/.test(u.protocol)&&u.hostname.includes('.')?u.href:null}catch(e){return null}
  };
  const host=u=>{try{return new URL(u).hostname.replace(/^www\./,'')}catch(e){return u}};
  function addLink(){
    const x=postAtual();if(!x)return;
    const u=normalizarUrl($('[data-lk-u]').value);
    if(!u){toast('Cole um link válido, como https://drive.google.com/...');return}
    x.links=x.links||[];x.links.push({t:$('[data-lk-t]').value.trim(),u});
    save();openItem('posts',x.id);
  }

  /* ---- arquivos ---- */
  const guardar=(id,blob)=>IDB.put(L,id,blob);
  function enviar(files){
    const x=postAtual();if(!x||!files||!files.length)return;
    const lista=[...files],ok=[];let pulou=0;
    Promise.all(lista.map(f=>{
      if(f.size>MAX){pulou++;return null}
      const id=uid();
      return guardar(id,f).then(()=>ok.push({id,nome:f.name,tipo:f.type||'',tam:f.size}));
    })).then(()=>{
      x.anexos=(x.anexos||[]).concat(ok);save();openItem('posts',x.id);
      toast(pulou?`${ok.length} anexado(s). ${pulou} passou de 50 MB e foi ignorado`:`${ok.length} arquivo(s) anexado(s)`);
    }).catch(()=>toast('Não foi possível salvar o anexo'));
  }
  const abrirArq=(id,baixar)=>{
    const x=postAtual(),a=x&&(x.anexos||[]).find(i=>i.id===id);if(!a)return;
    IDB.get(L,id).then(b=>{
      if(!b){toast('Arquivo não encontrado neste navegador');return}
      const url=URL.createObjectURL(b);
      if(baixar){const el=document.createElement('a');el.href=url;el.download=a.nome;document.body.appendChild(el);el.click();el.remove()}
      else window.open(url,'_blank','noopener');
      setTimeout(()=>URL.revokeObjectURL(url),60000);
    });
  };

  /* Remove da gaveta os arquivos que nenhum conteúdo usa mais */
  const limpar=()=>{
    const usados=new Set(S.posts.flatMap(p=>(p.anexos||[]).map(a=>a.id)));
    return IDB.keys(L).then(ks=>Promise.all(ks.filter(k=>!usados.has(k)).map(k=>IDB.del(L,k)))).catch(()=>{});
  };

  /* HTML da seção na ficha */
  const secao=x=>{
    const links=x.links||[],arqs=x.anexos||[];
    return `<h2 style="margin-top:28px">Links e anexos</h2>
    <label class="lab" style="margin-top:0">Links externos (Drive, Notion, Canva, vídeo...)</label>
    ${links.length?`<div class="anx-list">${links.map((l,i)=>`<div class="anx-item"><a href="${esc(l.u)}" target="_blank" rel="noopener noreferrer"><b>${esc(l.t||host(l.u))}</b></a><span class="muted small anx-sub">${esc(host(l.u))}</span><span class="spacer"></span><button class="btn sm ghost" data-lk-del="${i}">Remover</button></div>`).join('')}</div>`:''}
    <div class="anx-add"><input class="f" data-lk-t placeholder="Nome (opcional)"><input class="f" data-lk-u placeholder="Cole o link aqui"><button class="btn sm" data-lk-add>Adicionar</button></div>
    <label class="lab">Arquivos anexados</label>
    ${arqs.length?`<div class="anx-list">${arqs.map(a=>`<div class="anx-item"><b>${esc(a.nome)}</b><span class="muted small anx-sub">${tamanho(a.tam)}</span><span class="spacer"></span><button class="btn sm ghost" data-an-open="${a.id}">Abrir</button><button class="btn sm ghost" data-an-down="${a.id}">Baixar</button><button class="btn sm ghost" data-an-del="${a.id}">Remover</button></div>`).join('')}</div>`:''}
    <div class="cover-drop" data-androp tabindex="0"><span>Arraste arquivos aqui ou clique para escolher (até 50 MB cada)</span></div>
    <input type="file" multiple data-anfile hidden>
    <p class="small muted" style="margin:6px 0 0">Os anexos ficam guardados neste navegador e entram no backup exportado.</p>`;
  };

  /* ---- eventos ---- */
  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-lk-add],[data-lk-del],[data-an-open],[data-an-down],[data-an-del],[data-androp]');if(!t)return;
    const d=t.dataset;
    if(t.matches('[data-lk-add]'))addLink();
    else if(d.lkDel!==undefined){const x=postAtual();if(x){x.links.splice(+d.lkDel,1);save();openItem('posts',x.id)}}
    else if(d.anOpen)abrirArq(d.anOpen,false);
    else if(d.anDown)abrirArq(d.anDown,true);
    else if(d.anDel){const x=postAtual();if(x&&window.confirm('Remover este anexo?')){x.anexos=x.anexos.filter(a=>a.id!==d.anDel);save();limpar();openItem('posts',x.id)}}
    else if(t.matches('[data-androp]')){const f=t.parentElement.querySelector('[data-anfile]');f&&f.click()}
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Enter'&&e.target.matches&&e.target.matches('[data-lk-u],[data-lk-t]')){e.preventDefault();addLink()}
    if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('[data-androp]')){e.preventDefault();e.target.click()}
  });
  document.addEventListener('change',e=>{if(e.target.matches&&e.target.matches('[data-anfile]')){enviar(e.target.files);e.target.value=''}});
  document.addEventListener('dragover',e=>{const z=e.target.closest&&e.target.closest('[data-androp]');if(z){e.preventDefault();z.classList.add('over')}});
  document.addEventListener('dragleave',e=>{const z=e.target.closest&&e.target.closest('[data-androp]');if(z)z.classList.remove('over')});
  document.addEventListener('drop',e=>{const z=e.target.closest&&e.target.closest('[data-androp]');if(z){e.preventDefault();z.classList.remove('over');enviar(e.dataTransfer.files)}});

  /* ---- backup ---- */
  const exportar=()=>{
    const m=new Map();S.posts.forEach(p=>(p.anexos||[]).forEach(a=>m.set(a.id,a)));
    return Promise.all([...m.values()].map(a=>IDB.get(L,a.id).then(b=>b?blobParaDataUrl(b).then(d=>[a.id,{nome:a.nome,tipo:a.tipo,dados:d}]):null)))
      .then(r=>Object.fromEntries(r.filter(Boolean))).catch(()=>({}));
  };
  const importar=mapa=>Promise.all(Object.entries(mapa||{}).map(([id,o])=>dataUrlParaBlob(o.dados).then(b=>guardar(id,b)))).catch(()=>{});

  return {secao,limpar,exportar,importar};
})();

/* Limpa do navegador as capas e anexos que nenhum conteúdo usa mais */
const limparArquivos=()=>Promise.all([Capas.limpar(),Anexos.limpar()]);
