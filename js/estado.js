/* ============ ESTADO ============ */
const KEY='carol-sistema-v1';
const uid=()=>Math.random().toString(36).slice(2,10);
const iso=d=>{const x=new Date(d);x.setMinutes(x.getMinutes()-x.getTimezoneOffset());return x.toISOString().slice(0,10)};
const today=()=>iso(new Date());
const addDays=n=>{const x=new Date();x.setDate(x.getDate()+n);return iso(x)};
function seed(){
  return {theme:null,techDone:{},daily:{},manual:{},read:{},plan30:{start:'',done:{}},
   strategy:{dest:'',guide:'',audience:'',desires:'',diffs:'',bio:'Carol Lima\nEstratégia de conteúdo e posicionamento\nCo-fundadora da Agência Essence',handle:'carollima',avatar:'',followers:'',following:'',highlights:'Comece aqui, Método, Resultados, Sobre, Serviços',points:{},pointsNotes:'',top:'',base:''},
   posts:[],ads:[],phases:[],rituals:[],boxes:[],stories:[]};
}
let S;
const SEED=seed();
/* Completa dados antigos ou importados com os campos que faltam */
function completarPadroes(o){
  if(!o||typeof o!=='object'||Array.isArray(o)) o=seed();
  for(const k in SEED) if(o[k]===undefined) o[k]=SEED[k];
  if(!o.plan30.done)o.plan30.done={};
  for(const k in SEED.strategy) if(o.strategy[k]===undefined) o.strategy[k]=SEED.strategy[k];
  return o;
}
try{S=completarPadroes(JSON.parse(localStorage.getItem(KEY)))}catch(e){S=completarPadroes(null)}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}

/* ============ HELPERS ============ */
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tag=v=>v?`<span class="tag" style="background:var(${TONE[v]||'--t1'})">${esc(v)}</span>`:'';
const fmtD=s=>s?new Date(s+'T12:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.',''):'';
const num=v=>+v||0;
const T=id=>TECHS.find(t=>t.id===id);
function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(t._);t._=setTimeout(()=>t.style.display='none',1800)}
function eng(p){const m=p.metrics||{};const r=num(m.reach)||num(m.views);if(!r)return null;return (num(m.likes)+num(m.comments)+num(m.shares)+num(m.saves))/r*100}
const findRef=(c,id)=>(S[c]||[]).find(x=>x.id===id);
const hydrate=()=>document.querySelectorAll('[data-ic]').forEach(e=>{e.outerHTML=ic(e.dataset.ic)});

