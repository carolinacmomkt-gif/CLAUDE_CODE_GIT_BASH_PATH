/* ============ ARMAZENAMENTO DE ARQUIVOS (IndexedDB) ============
   Um banco só, duas "gavetas": capas (imagens de capa) e anexos (arquivos dos conteúdos).
   A versão 2 acrescenta a gaveta de anexos sem perder as capas já salvas. */
const IDB=(()=>{
  const NOME='carol-sistema-capas',VERSAO=2,LOJAS=['capas','anexos'];
  let db=null;
  const abrir=()=>new Promise((ok,no)=>{
    if(db)return ok(db);
    if(!window.indexedDB)return no(new Error('sem IndexedDB'));
    const r=indexedDB.open(NOME,VERSAO);
    r.onupgradeneeded=()=>{LOJAS.forEach(l=>{if(!r.result.objectStoreNames.contains(l))r.result.createObjectStore(l)})};
    r.onsuccess=()=>{db=r.result;ok(db)};
    r.onerror=()=>no(r.error);
  });
  const tx=(loja,modo,fn)=>abrir().then(d=>new Promise((ok,no)=>{
    const t=d.transaction(loja,modo),req=fn(t.objectStore(loja));
    t.oncomplete=()=>ok(req&&req.result);t.onerror=()=>no(t.error);t.onabort=()=>no(t.error);
  }));
  return {
    put:(loja,id,blob)=>tx(loja,'readwrite',s=>s.put(blob,id)),
    get:(loja,id)=>tx(loja,'readonly',s=>s.get(id)),
    del:(loja,id)=>tx(loja,'readwrite',s=>s.delete(id)),
    keys:loja=>tx(loja,'readonly',s=>s.getAllKeys()),
  };
})();
const blobParaDataUrl=b=>new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=()=>no(r.error);r.readAsDataURL(b)});
const dataUrlParaBlob=d=>fetch(d).then(r=>r.blob());
