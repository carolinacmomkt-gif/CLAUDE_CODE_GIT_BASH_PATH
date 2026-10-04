/* ============ BACKUP: exportar, importar e cópia semanal ============
   O localStorage continua sendo a fonte principal. O backup é um JSON com tudo,
   incluindo as capas enviadas (guardadas em "_capas"). */
const BKP_KEY='carol-sistema-v1-ultimo-backup',BKP_DIAS=7;

function baixarJSON(obj,nome){
  const b=new Blob([JSON.stringify(obj,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=nome;
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
function montarBackup(){return Capas.exportar().then(c=>({...S,_capas:c,_exportadoEm:new Date().toISOString()}))}

function exportarBackup(prefixo='backup-conteudo-'){
  return montarBackup().then(d=>{
    baixarJSON(d,prefixo+today()+'.json');
    try{localStorage.setItem(BKP_KEY,String(Date.now()))}catch(e){}
    toast('Backup exportado');
  });
}

function importarBackup(file){
  return file.text().then(txt=>{
    const d=JSON.parse(txt);
    if(!d||typeof d!=='object'||Array.isArray(d)||!Array.isArray(d.posts))throw new Error('formato');
    if(!window.confirm('Importar este backup vai substituir os dados atuais deste navegador. Continuar?'))return;
    const capas=d._capas;delete d._capas;delete d._exportadoEm;
    return Capas.importar(capas).then(()=>{S=completarPadroes(d);save();Capas.limpar();render();toast('Backup importado')});
  }).catch(()=>toast('Arquivo inválido'));
}

/* Uma vez por semana baixa um backup sozinho. Na primeira visita só começa a contar. */
function backupSemanal(){
  let ult;try{ult=+localStorage.getItem(BKP_KEY)||0}catch(e){return}
  if(!ult){try{localStorage.setItem(BKP_KEY,String(Date.now()))}catch(e){}return}
  if(Date.now()-ult<BKP_DIAS*864e5)return;
  const temDados=S.posts.length||S.ads.length||S.phases.length||S.stories.length||S.rituals.length||S.boxes.length;
  if(!temDados){try{localStorage.setItem(BKP_KEY,String(Date.now()))}catch(e){}return}
  exportarBackup('backup-semanal-conteudo-').then(()=>toast('Backup semanal baixado'));
}
