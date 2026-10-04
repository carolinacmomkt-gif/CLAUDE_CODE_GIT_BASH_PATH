/* ============ CAPAS (IndexedDB) ============
   Imagens enviadas ficam no IndexedDB do navegador; o conteúdo guarda só a referência "idb:<id>".
   Também aceita URL comum. Várias capas podem apontar para a mesma imagem (ex.: ao duplicar). */
const Capas=(()=>{
  const L='capas',cache={};   // cache: id -> blob: URL
  const guardar=(id,blob)=>IDB.put(L,id,blob).then(()=>{cache[id]=URL.createObjectURL(blob)});
  const apagar=id=>IDB.del(L,id).then(()=>{if(cache[id]){URL.revokeObjectURL(cache[id]);delete cache[id]}});
  const ler=id=>IDB.get(L,id);
  const ids=()=>IDB.keys(L);

  /* Carrega todas as capas para a memória antes do primeiro render */
  const carregar=()=>ids().then(ks=>Promise.all(ks.map(id=>ler(id).then(b=>{if(b)cache[id]=URL.createObjectURL(b)})))).catch(()=>{});

  /* Reduz a imagem (máx. 1080 px de largura) para não pesar no navegador */
  const reduzir=file=>new Promise((ok,no)=>{
    const url=URL.createObjectURL(file),img=new Image();
    img.onload=()=>{
      const k=Math.min(1,1080/img.width),c=document.createElement('canvas');
      c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);
      c.getContext('2d').drawImage(img,0,0,c.width,c.height);
      URL.revokeObjectURL(url);
      c.toBlob(b=>b?ok(b):no(new Error('falha ao converter')),'image/jpeg',.88);
    };
    img.onerror=()=>{URL.revokeObjectURL(url);no(new Error('imagem inválida'))};
    img.src=url;
  });

  /* Remove do IndexedDB as imagens que nenhum conteúdo usa mais */
  const limpar=()=>{
    const usadas=new Set(S.posts.map(p=>p.cover).filter(c=>(c||'').startsWith('idb:')).map(c=>c.slice(4)));
    return ids().then(ks=>Promise.all(ks.filter(k=>!usadas.has(k)).map(apagar))).catch(()=>{});
  };

  const enviar=file=>{
    if(!open||open.col!=='posts')return;
    if(!file||!file.type.startsWith('image/')){toast('Escolha um arquivo de imagem');return}
    const x=S.posts.find(i=>i.id===open.id),id=uid();
    reduzir(file).then(b=>guardar(id,b)).then(()=>{
      x.cover='idb:'+id;save();limpar();openItem('posts',x.id);toast('Capa salva');
    }).catch(()=>toast('Não foi possível salvar a imagem'));
  };

  /* HTML do campo "Capa" na ficha: área de arrastar + URL */
  const campo=(x,k)=>{
    const v=x[k]||'',src=resolver(v),idb=v.startsWith('idb:');
    return `<div class="cover-field">
      <div class="cover-drop" data-coverdrop tabindex="0">
        ${src?`<img src="${esc(src)}" alt="Capa">`:''}
        <span>${src?'Arraste outra imagem ou clique para trocar':'Arraste uma imagem aqui ou clique para escolher'}</span>
      </div>
      <input type="file" accept="image/*" data-coverfile hidden>
      <input class="f" type="text" data-f="${k}" placeholder="ou cole a URL da imagem" value="${idb?'':esc(v)}">
      ${v?`<button class="btn sm ghost" data-act="coverclear">Remover capa</button>`:''}
    </div>`;
  };

  function resolver(v){
    if(!v)return '';
    if(v.startsWith('idb:'))return cache[v.slice(4)]||'';
    return v;
  }

  /* Backup: capas locais vão dentro do JSON como data URL */
  const exportar=()=>{
    const usadas=[...new Set(S.posts.map(p=>p.cover).filter(c=>(c||'').startsWith('idb:')).map(c=>c.slice(4)))];
    return Promise.all(usadas.map(id=>ler(id).then(b=>b?blobParaDataUrl(b).then(d=>[id,d]):null))).then(a=>Object.fromEntries(a.filter(Boolean))).catch(()=>({}));
  };
  const importar=mapa=>Promise.all(Object.entries(mapa||{}).map(([id,d])=>dataUrlParaBlob(d).then(b=>guardar(id,b)))).catch(()=>{});

  return {carregar,campo,enviar,limpar,exportar,importar,resolver};
})();
const coverSrc=v=>Capas.resolver(v);

/* Arrastar, soltar e escolher arquivo no campo Capa */
document.addEventListener('dragover',e=>{const z=e.target.closest&&e.target.closest('[data-coverdrop]');if(z){e.preventDefault();z.classList.add('over')}});
document.addEventListener('dragleave',e=>{const z=e.target.closest&&e.target.closest('[data-coverdrop]');if(z)z.classList.remove('over')});
document.addEventListener('drop',e=>{
  const z=e.target.closest&&e.target.closest('[data-coverdrop]');
  if(!z){if(e.dataTransfer&&e.dataTransfer.files.length)e.preventDefault();return}   // não deixa o navegador abrir a imagem solta fora da área
  e.preventDefault();z.classList.remove('over');Capas.enviar(e.dataTransfer.files[0]);
});
document.addEventListener('click',e=>{const z=e.target.closest('[data-coverdrop]');if(z){const f=z.parentElement.querySelector('[data-coverfile]');f&&f.click()}});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('[data-coverdrop]')){e.preventDefault();e.target.click()}});
document.addEventListener('change',e=>{if(e.target.matches&&e.target.matches('[data-coverfile]')){Capas.enviar(e.target.files[0]);e.target.value=''}});
