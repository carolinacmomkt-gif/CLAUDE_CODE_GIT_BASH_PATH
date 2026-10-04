/* Sessão por cookie assinado (HMAC-SHA256). Funciona no Deno (edge) e no Node 20+.
   Variáveis de ambiente: SITE_PASSWORD (obrigatória) e AUTH_SECRET (opcional; se faltar, deriva da senha). */
export const COOKIE = 'carol_sessao';
export const COOKIE_AVISO = 'carol_logado';
export const DIAS_LEMBRAR = 30;
export const HORAS_SEM_LEMBRAR = 12;

const enc = new TextEncoder();
const hex = b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
const unhex = h => Uint8Array.from(h.match(/../g) || [], x => parseInt(x, 16));
const chave = seg => crypto.subtle.importKey('raw', enc.encode(seg), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);

export function configuracao(env) {
  const senha = env('SITE_PASSWORD') || '';
  return { senha, segredo: env('AUTH_SECRET') || senha };
}

export async function criarToken(segredo, validadeSeg) {
  const corpo = 'v1.' + (Math.floor(Date.now() / 1000) + validadeSeg);
  const sig = await crypto.subtle.sign('HMAC', await chave(segredo), enc.encode(corpo));
  return corpo + '.' + hex(sig);
}

export async function tokenValido(segredo, token) {
  const p = (token || '').split('.');
  if (p.length !== 3 || p[0] !== 'v1' || !/^\d+$/.test(p[1]) || !/^[0-9a-f]{64}$/.test(p[2])) return false;
  if (!(+p[1] > Date.now() / 1000)) return false;
  return crypto.subtle.verify('HMAC', await chave(segredo), unhex(p[2]), enc.encode(p[0] + '.' + p[1]));
}

/* Comparação em tempo constante, comparando os HMACs das duas senhas */
export async function senhaConfere(informada, esperada) {
  if (!esperada) return false;
  const k = await chave('comparacao-de-senha');
  const [a, b] = await Promise.all([crypto.subtle.sign('HMAC', k, enc.encode(informada || '')), crypto.subtle.sign('HMAC', k, enc.encode(esperada))]);
  const x = new Uint8Array(a), y = new Uint8Array(b);
  let d = 0;
  for (let i = 0; i < x.length; i++) d |= x[i] ^ y[i];
  return d === 0;
}

export function lerCookie(request, nome = COOKIE) {
  const c = request.headers.get('cookie') || '';
  for (const parte of c.split(';')) {
    const i = parte.indexOf('=');
    if (i > 0 && parte.slice(0, i).trim() === nome) return parte.slice(i + 1).trim();
  }
  return '';
}

export async function autorizado(request, env) {
  const { senha, segredo } = configuracao(env);
  if (!senha) return false;
  return tokenValido(segredo, lerCookie(request));
}

/* "Lembrar" = cookie persistente por 30 dias; sem isso, vale só até fechar o navegador (e no máximo 12 h) */
export async function cookieDeLogin(env, lembrar) {
  const { segredo } = configuracao(env);
  const seg = lembrar ? DIAS_LEMBRAR * 86400 : HORAS_SEM_LEMBRAR * 3600;
  const token = await criarToken(segredo, seg);
  const dura = lembrar ? `; Max-Age=${seg}` : '';
  // O segundo cookie não guarda segredo: só deixa a página saber que há login (para mostrar o botão Sair)
  return [`${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax${dura}`, `${COOKIE_AVISO}=1; Path=/; Secure; SameSite=Lax${dura}`];
}
export const cookiesDeSaida = [`${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`, `${COOKIE_AVISO}=; Path=/; Secure; SameSite=Lax; Max-Age=0`];

export const comCookies = (resp, cookies) => { cookies.forEach(c => resp.headers.append('set-cookie', c)); return resp; };

/* Evita login forjado a partir de outro site */
export function origemOk(request) {
  const o = request.headers.get('origin');
  return !o || new URL(o).host === new URL(request.url).host;
}
