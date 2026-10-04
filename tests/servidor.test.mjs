/* Testes do login e do assistente. Rodar com: npm run test:servidor */
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';

const SENHA = 'senha-de-teste-123';
const AMB = { SITE_PASSWORD: SENHA };
globalThis.Netlify = { env: { get: k => AMB[k] } };

const sessao = await import('../netlify/lib/sessao.js');
const auth = (await import('../netlify/edge-functions/auth.js')).default;
process.env.SITE_PASSWORD = SENHA;   // a função da IA lê process.env
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

/* ---------- Assistente (IA) com um servidor falso no lugar da API ---------- */
let recebido;
const falso = http.createServer((rq, rs) => {
  let b = ''; rq.on('data', d => b += d); rq.on('end', () => {
    recebido = { headers: rq.headers, corpo: JSON.parse(b), url: rq.url };
    rs.writeHead(200, { 'content-type': 'text/event-stream' });
    const ev = (t, d) => rs.write(`event: ${t}\ndata: ${JSON.stringify(d)}\n\n`);
    ev('message_start', { type: 'message_start', message: { id: 'msg_1', type: 'message', role: 'assistant', model: 'm', content: [], stop_reason: null, stop_sequence: null, usage: { input_tokens: 1, output_tokens: 1 } } });
    ev('content_block_start', { type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } });
    for (const t of ['## Revisão\n', '- gancho ', 'fraco']) ev('content_block_delta', { type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: t } });
    ev('content_block_stop', { type: 'content_block_stop', index: 0 });
    ev('message_delta', { type: 'message_delta', delta: { stop_reason: 'end_turn', stop_sequence: null }, usage: { output_tokens: 5 } });
    ev('message_stop', { type: 'message_stop' });
    rs.end();
  });
});
await new Promise(r => falso.listen(0, r));
process.env.ANTHROPIC_BASE_URL = `http://127.0.0.1:${falso.address().port}`;
const ia = (await import('../netlify/functions/ia.mjs')).default;
const cookieOk = async () => `${sessao.COOKIE}=${await sessao.criarToken(SENHA, 600)}`;
const pedido = async (corpo, cookie) => new Request('https://site.test/api/ia', { method: 'POST', headers: { 'content-type': 'application/json', ...(cookie === undefined ? { cookie: await cookieOk() } : cookie ? { cookie } : {}) }, body: JSON.stringify(corpo) });
const BOM = { messages: [{ role: 'user', content: 'Revise' }], metodos: '## IHC\nIdentificação, história, conteúdo.', conteudo: { titulo: 'Meu reel', gancho: 'Oi gente' } };

test('IA: exige sessão', async () => {
  process.env.ANTHROPIC_API_KEY = 'sk-teste';
  assert.equal((await ia(await pedido(BOM, ''))).status, 401);
});
test('IA: sem chave configurada avisa', async () => {
  delete process.env.ANTHROPIC_API_KEY;
  const r = await ia(await pedido(BOM));
  assert.equal(r.status, 503); assert.match((await r.json()).erro, /ANTHROPIC_API_KEY/);
});
test('IA: valida o pedido', async () => {
  process.env.ANTHROPIC_API_KEY = 'sk-teste';
  for (const ruim of [{}, { ...BOM, messages: [] }, { ...BOM, messages: [{ role: 'assistant', content: 'x' }] }, { ...BOM, metodos: 5 }, { ...BOM, messages: [{ role: 'system', content: 'x' }] }])
    assert.equal((await ia(await pedido(ruim))).status, 400);
});
test('IA: responde em fluxo, com métodos em cache e conteúdo no contexto', async () => {
  process.env.ANTHROPIC_API_KEY = 'sk-teste';
  const r = await ia(await pedido(BOM));
  assert.equal(r.status, 200);
  assert.equal(await r.text(), '## Revisão\n- gancho fraco');
  const c = recebido.corpo;
  assert.equal(c.model, 'claude-opus-5-5');
  assert.equal(c.stream, true);
  assert.match(c.system[0].text, /IHC/); assert.deepEqual(c.system[0].cache_control, { type: 'ephemeral' });
  assert.match(c.system[1].text, /Oi gente/);
  assert.equal(recebido.headers['x-api-key'], 'sk-teste');
  assert.deepEqual(c.messages, [{ role: 'user', content: 'Revise' }]);
});

test.after(() => falso.close());
