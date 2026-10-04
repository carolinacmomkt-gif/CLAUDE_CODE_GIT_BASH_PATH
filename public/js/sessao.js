/* ============ SAIR (só aparece quando o site está atrás do login do Netlify) ============
   O login deixa um cookie simples "carol_logado" (sem segredo) só para a página saber disso. */
if(document.cookie.split('; ').includes('carol_logado=1'))$('#sairBtn').hidden=false;
document.addEventListener('click',e=>{
  if(e.target.closest('[data-act="sair"]'))fetch('/__logout',{method:'POST',credentials:'same-origin'}).then(()=>location.reload());
});
