/* Testes do login. Rodar com: npm run test:servidor */
import test from 'node:test';
import assert from 'node:assert/strict';

const SENHA = 'senha-de-teste-123';
const AMB = { SITE_PASSWORD: SENHA };
globalThis.Netlify = { env: { get: k => AMB[k] } };

const sessao = await import('../netlify/lib/sessao.js');
const auth = (await import('../netlify/edge-functions/auth.js')).default;
const env = k => AMB[k];
const ctx = () => { let chamou = false; return { next: async () => { chamou = true; return new Response('conteudo protegido'); }, get chamou() { return chamou; } }; };
const req = (path, init = {}) => new Request('https://site.test' + path, init);
const form = (campos, extra = {}) => req('/__login', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded', ...extra }, body: new URLSearchParams(campos) });

test('token: ida e volta, adulterado e vencido', async () => {
  const t = await sessao.criarToken('segredo', 60);
  assert.equal(await sessao.tokenValido('segredo', t), true);
  assert.equal(await sessao.tokenValido('outro', t), false);
  assert.equal(await sessao.tokenValido('segredo', t.replace(/.$/, c => (c === '0' ? '1' : '0'))), false);
  assert.equal(await sessao.tokenValido('segredo', await sessao.criarToken('segredo', -5)), false);
  assert.equal(await sessao.tokenValido('segredo', 'lixo'), false);
});

test('senhaConfere', async () => {
  assert.equal(await sessao.senhaConfere(SENHA, SENHA), true);
  assert.equal(await sessao.senhaConfere('errada', SENHA), false);
  assert.equal(await sessao.senhaConfere('', SENHA), false);
  assert.equal(await sessao.senhaConfere('x', ''), false);
});

test('sem SITE_PASSWORD o site fica fechado e avisa', async () => {
  delete AMB.SITE_PASSWORD;
  const r = await auth(req('/', { headers: { accept: 'text/html' } }), ctx());
  AMB.SITE_PASSWORD = SENHA;
  assert.equal(r.status, 503);
  assert.match(await r.text(), /SITE_PASSWORD/);
});

test('sem sessão: página vira login e arquivos dão 401', async () => {
  const c = ctx();
  const pagina = await auth(req('/', { headers: { accept: 'text/html' } }), c);
  assert.equal(pagina.status, 401);
  assert.match(await pagina.text(), /type="password"/);
  const img = await auth(req('/assets/exemplos/x.jpg', { headers: { accept: 'image/*' } }), c);
  assert.equal(img.status, 401);
  assert.equal(c.chamou, false);
});

test('senha errada não entra', async () => {
  const r = await auth(form({ senha: 'errada' }), ctx());
  assert.equal(r.status, 401);
  assert.equal(r.headers.get('set-cookie'), null);
  assert.match(await r.text(), /Senha incorreta/);
});

test('senha certa: cookie persistente quando marca "manter acesso"', async () => {
  const r = await auth(form({ senha: SENHA, lembrar: '1' }), ctx());
  assert.equal(r.status, 303);
  const c = r.headers.getSetCookie().join('\n');
  assert.match(c, /carol_logado=1/);
  assert.match(c, /HttpOnly/); assert.match(c, /Secure/); assert.match(c, /SameSite=Lax/);
  assert.match(c, new RegExp('Max-Age=' + 30 * 86400));
});

test('senha certa sem "manter acesso": cookie de sessão', async () => {
  const r = await auth(form({ senha: SENHA }), ctx());
  assert.equal(r.status, 303);
  assert.doesNotMatch(r.headers.getSetCookie().join('\n'), /Max-Age/);
});

test('login vindo de outro site é barrado', async () => {
  const r = await auth(form({ senha: SENHA }, { origin: 'https://malvado.test' }), ctx());
  assert.equal(r.status, 403);
});

test('com sessão válida entrega o conteúdo; sair limpa os cookies', async () => {
  const set = (await auth(form({ senha: SENHA, lembrar: '1' }), ctx())).headers.getSetCookie()[0];
  const cookie = set.split(';')[0];
  const c = ctx();
  const r = await auth(req('/js/main.js', { headers: { cookie } }), c);
  assert.equal(await r.text(), 'conteudo protegido'); assert.equal(c.chamou, true);
  const sair = await auth(req('/__logout', { method: 'POST', headers: { cookie } }), ctx());
  assert.equal(sair.headers.getSetCookie().filter(c => /Max-Age=0/.test(c)).length, 2);
});

test('cookie de outra senha não vale', async () => {
  const falso = `${sessao.COOKIE}=${await sessao.criarToken('outro-segredo', 600)}`;
  const r = await auth(req('/', { headers: { cookie: falso, accept: 'text/html' } }), ctx());
  assert.equal(r.status, 401);
});

